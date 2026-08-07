const express = require("express");
const {addFood,getAllFoods,getFoodById} = require("../controllers/food.Controller.js");

const foodRouter = express.Router();

foodRouter.post("/", addFood);
foodRouter.get("/", getAllFoods);
foodRouter.get("/", getAllFoods);

module.exports = foodRouter;