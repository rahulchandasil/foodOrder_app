const Food = require("../models/food.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ErrorResponse = require("../utils/ErrorResponse.js");

const addFood = asyncHandler(async (req, res, next) => {
  const { name, description, price, category, image } = req.body;

  const food = await Food.create({
    name,
    description,
    price,
    category,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Food added successfully",
    food,
  });
});

const getAllFoods = asyncHandler(async (req, res, next) => {
  const foods = await Food.find();

  res.status(200).json({
    success: true,
    count: foods.length,
    foods,
  });
});

const getFoodById = asyncHandler(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return next(new ErrorResponse("Food not found", 404));
  }

  res.status(200).json({
    success: true,
    food,
  });
});

module.exports = {
  addFood,
  getAllFoods,
  getFoodById,
};