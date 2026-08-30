const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format errors to match the uniform structure
    const formattedErrors = errors.array().map((err) => err.msg);
    return next(new ErrorResponse("Validation Error", 400, formattedErrors));
  }
  next();
};

module.exports = validate;
