const { body } = require("express-validator");

const addFoodValidation = [
  body("name").notEmpty().withMessage("Food name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Pizza", "Burger", "Biryani", "Chinese", "Drinks", "Desserts"])
    .withMessage("Invalid category"),
  body("image").notEmpty().withMessage("Image URL is required"),
];

module.exports = {
  addFoodValidation,
};
