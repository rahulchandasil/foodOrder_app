const asyncHandler = require("../utils/asyncHandler.js");
const cartService = require("../services/cart.service.js");
const ErrorResponse = require("../utils/ErrorResponse.js");

const getUserId = (req) => {
  return req.user?._id || req.user?.id;
};

const getCart = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return next(new ErrorResponse("Not authorized, user ID not found", 401));
  }
  const result = await cartService.getCartByUserId(userId);
  res.status(200).json(result);
});

const addToCart = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return next(new ErrorResponse("Not authorized, user ID not found", 401));
  }
  const { foodId, quantity } = req.body;
  const cart = await cartService.addItemToCart(userId, foodId, quantity);

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    cart,
  });
});

const updateCart = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return next(new ErrorResponse("Not authorized, user ID not found", 401));
  }
  const itemId = req.params.id;
  const { quantity } = req.body;
  
  const cart = await cartService.updateCartItemQuantity(userId, itemId, quantity);

  res.status(200).json({
    success: true,
    message: "Cart updated",
    cart,
  });
});

const removeCartItem = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return next(new ErrorResponse("Not authorized, user ID not found", 401));
  }
  const itemId = req.params.id;

  const cart = await cartService.removeItemFromCart(userId, itemId);

  res.status(200).json({
    success: true,
    message: "Item removed",
    cart,
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
};