const express = require("express");
const {addFood,getAllFoods,getFoodById} = require("../controllers/food.Controller.js");

const foodRouter = express.Router();
const { addFoodValidation } = require("../validations/food.validation.js");
const validate = require("../middleware/validate.middleware.js");

foodRouter.post("/", addFoodValidation, validate, addFood);
foodRouter.get("/", getAllFoods);
foodRouter.get("/:id", getFoodById);

module.exports = foodRouter;