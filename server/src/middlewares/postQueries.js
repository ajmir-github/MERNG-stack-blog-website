// search "title", "description"
// category
// keywords
// sort { createdAt: -1 }

module.exports = (searchFields, defaultLimit, sort) => (req, res, next) => {
  const { search, limit, offset, category, keywords } = req.query;
  let query = {};
  let queries = [];

  // Search multiply default fields
  if (search)
    searchFields.forEach((key) => {
      queries.push({
        [key]: {
          $regex: search,
          $options: "ig",
        },
      });
    });

  // filter the category
  if (category) query = { category };

  // filter the keywords
  if (keywords)
    keywords.split(",").forEach((keyword) => {
      queries.push({
        ["keywords"]: { $elemMatch: { $eq: keyword.trim() } },
      });
    });

  // APPEND
  req.databaseQuery = {
    ...req.databaseQuery,
    limit: +limit || defaultLimit,
    skip: +offset || 0,
    sort,
    query: {
      ...query,
      $or: queries,
    },
  };
  next();
};
