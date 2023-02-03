const statusCodes = require("./statusCodes");
exports.handleError = (res, error) => {
  const { status, ...rest } = error;

  // if mongoose validation error
  if (rest.errors)
    return res.status(statusCodes.BAD_REQUEST).send({
      message: "Validition Error: Please provide the required entries!",
      ...rest,
    });

  if (rest.code === 11000)
    // validition of unique field
    return res.status(statusCodes.BAD_REQUEST).send({
      message: "Validition Error: Please provide a unique entry!",
    });

  if (rest.code === 31254)
    // Projections syntax error
    return res.status(statusCodes.BAD_REQUEST).send({
      message: "Sytax Error: Please provide a valid select param!",
    });

  // track the error
  if (process.env.NODE_ENV === "development") {
    if (!status) {
      console.log(rest);
    }
  }
  // else
  res
    .status(status || statusCodes.SERVER_ERROR)
    .send({ message: "The server has failed!", ...rest });
};
