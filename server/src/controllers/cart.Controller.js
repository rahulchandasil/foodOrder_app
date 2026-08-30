const asyncHandler = require("../utils/asyncHandler.js");
const cartService = require("../services/cart.service.js");

const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const result = await cartService.getCartByUserId(userId);
  res.status(200).json(result);
});

const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { foodId, quantity } = req.body;
  const cart = await cartService.addItemToCart(userId, foodId, quantity);

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    cart,
  });
});

const updateCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
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
  const userId = req.user._id;
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