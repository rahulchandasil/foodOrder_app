const { body } = require("express-validator");

const addToCartValidation = [
  body("foodId").isMongoId().withMessage("Valid food ID is required"),
  body("quantity")
    .isInt({ min: 1, max: 50 })
    .withMessage("Quantity must be an integer between 1 and 50"),
];

const updateCartValidation = [
  body("quantity")
    .isInt({ min: 1, max: 50 })
    .withMessage("Quantity must be an integer between 1 and 50"),
];

module.exports = {
  addToCartValidation,
  updateCartValidation,
};
