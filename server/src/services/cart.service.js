const Cart = require("../models/cart.model.js");
const Food = require("../models/food.model.js");
const ErrorResponse = require("../utils/ErrorResponse.js");

const getCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("items.foodId");
  if (!cart) {
    return { success: true, items: [] };
  }
  return { success: true, cart };
};

const addItemToCart = async (userId, foodId, quantity) => {
  // Check if food exists
  const food = await Food.findById(foodId);
  if (!food) {
    throw new ErrorResponse("Food not found", 404);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ foodId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.foodId && item.foodId.toString() === foodId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity });
    }

    await cart.save();
  }
  return await cart.populate("items.foodId");
};

const updateCartItemQuantity = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({
    userId,
    "items._id": itemId,
  });

  if (!cart) {
    throw new ErrorResponse("Cart item not found or unauthorized", 404);
  }

  const item = cart.items.id(itemId);
  item.quantity = quantity;

  await cart.save();
  return await cart.populate("items.foodId");
};

const removeItemFromCart = async (userId, itemId) => {
  const cart = await Cart.findOne({
    userId,
    "items._id": itemId,
  });

  if (!cart) {
    throw new ErrorResponse("Item not found or unauthorized", 404);
  }

  cart.items.pull(itemId);
  await cart.save();
  return await cart.populate("items.foodId");
};

module.exports = {
  getCartByUserId,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
};
