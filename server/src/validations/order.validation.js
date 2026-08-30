const { body } = require("express-validator");

const placeOrderValidation = [
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  body("mobile")
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Please enter a valid 10-digit mobile number"),
];

module.exports = {
  placeOrderValidation,
};
