// Utils
const OperatorsList = [
  "::",
  ":like:",
  ":ne:",
  ":gt:",
  ":gte:",
  ":lt:",
  ":lte:",
  ":in:",
  ":not-in:",
  ":has:",
  ":has!:",
];
function createRegExp(key, value) {
  return {
    [key]: {
      $regex: value,
      $options: "ig",
    },
  };
}

// SEARCH ?search=value
// SEARCH ?search=fieldName::value

module.exports.searchQueryParser =
  (defaultSearchFields) => (req, res, next) => {
    // Note: make sure to index these default search field to better preformence
    const { search } = req.query;
    if (!search) return next();
    const query = {};
    const searchValues = search.split("::");
    // if complex query with custom field
    if (searchValues > 1) {
      const [searchField, value] = searchValues;
      query = createRegExp(searchField, value);
    } else {
      // if simple with default fields
      query["$or"] = defaultSearchFields.map((searchField) =>
        createRegExp(searchField, search)
      );
    }
    // APPEND
    req.databaseQuery = {
      ...req.databaseQuery,
      query,
    };
    next();
  };

// FILTER
// -------------- With strings
// ?filter=name::ajmir  - stricty direct
// ?filter=name:like:ajmir - regExp
// ?filter=name:in:ali, mohamda, esmta  - stricty direct
// -------------- With numbers
// ?filter=qty::1  -  equal
// ?filter=price:gt:200 - $gte greater than
// ?filter=name:lt:500 - $lte less than
// ?filter=price:gte:200 - $gte greater than or equal
// ?filter=name:lte:500 - $lte less than or equal
// ?filter=type:in:1, 2, 3 - $in  in the list
// ?filter=qty:ne:1  - $ne not equal
// ?filter=type:nin:1, 2, 3 - $in not in the list

// -------------- With arrays
// ?filter=keywords:has:Edu
// ?filter=keywords:has!:Edu, plus

// -------------- With Multi params (only with and)
// ?filter=type:eq:1:and:price:gt:1000
// ?filter=type:eq:1:and:price:gt:1000:and:price:lte:2000

module.exports.filterQueryParser = () => (req, res, next) => {
  const { filter } = req.query;
  if (!filter) return next();
  // util vars and funcs
  let query = {};
  const singleInject = (key, value) => {
    query[key] = value;
  };
  const multiInject = (key, value) => {
    if (query[key]) {
      query[key] = { ...query[key], ...value };
    } else {
      query[key] = value;
    }
  };
  // split the statements and proccess them
  for (const statement of filter.split(":and:")) {
    // if empty
    if (!statement) continue;
    for (const operator of OperatorsList) {
      // if operator found
      if (statement.indexOf(operator) !== -1) {
        // split the statement to get key-value pairs
        const [key, value] = statement.split(operator);
        // skip invalid entries
        if (!key || !value) continue;
        switch (operator) {
          case "::":
            singleInject(key, value);
            break;
          case ":like:":
            singleInject(key, {
              $regex: value,
              $options: "ig",
            });
            break;
          case ":ne:":
            singleInject(key, { $ne: value });
            break;
          case ":gt:":
            multiInject(key, { $gt: value });
            break;
          case ":gte:":
            multiInject(key, { $gte: value });
            break;
          case ":lt:":
            multiInject(key, { $lt: value });
            break;
          case ":lte:":
            multiInject(key, { $lte: value });
            break;
          case ":in:":
            singleInject(key, {
              $in: value.split(",").map((str) => str.trim()),
            });
            break;
          case ":in-not:":
            singleInject(key, {
              $nin: value.split(",").map((str) => str.trim()),
            });
            break;

          case ":has:":
            singleInject(
              "$or",
              value.split(",").map((str) => ({
                [key]: { $elemMatch: { $eq: str.trim() } },
              }))
            );

            break;
          case ":has!:":
            singleInject(key, {
              $all: value.split(",").map((str) => str.trim()),
            });
            break;

          default:
            singleInject(key, value);
            break;
        }
        // END
      }
    }
  }
  // APPEND
  req.databaseQuery = {
    ...req.databaseQuery,
    query,
  };
  next();
};

// ?sort=dof
// ?sort=dof::asc
// ?sort=dof::asc:and:createdAt::desc
module.exports.sortQueryParser = (defaultSort) => (req, res, next) => {
  const { sort } = req.query;
  if (!sort) {
    // APPEND
    if (defaultSort)
      req.databaseQuery = {
        ...req.databaseQuery,
        sort: defaultSort,
      };
    // break into the next
    return next();
  }
  // custom
  let cSort = {};
  for (const statement of sort.split(":and:")) {
    const [key, value] = statement.split("::");
    if (value) {
      // complex
      switch (value) {
        case "asc":
          cSort[key] = 1;
          break;
        case "desc":
          cSort[key] = -1;
          break;
        default:
          cSort[key] = 1;
          break;
      }
    } else {
      // simple
      cSort[key] = 1;
    }
  }
  // APPEND
  req.databaseQuery = {
    ...req.databaseQuery,
    sort: cSort,
  };
  next();
};

// ?offset=8
// ?limit=16 & offset=16
module.exports.pageQueryParser =
  (defaultLimit = 8, defaultOffset = 0) =>
  (req, res, next) => {
    // cutom
    const limit = +req.query.limit || defaultLimit;
    const skip = +req.query.offset || defaultOffset;
    // APPEND
    req.databaseQuery = {
      ...req.databaseQuery,
      limit,
      skip,
    };
    next();
  };
