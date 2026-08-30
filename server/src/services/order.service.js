const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");
const Food = require("../models/food.model.js");
const ErrorResponse = require("../utils/ErrorResponse.js");

const placeOrder = async (userId, address, mobile) => {
  const cart = await Cart.findOne({ userId }).populate("items.foodId");

  if (!cart || cart.items.length === 0) {
    throw new ErrorResponse("Cart is empty", 400);
  }

  let totalPrice = 0;

  // Validate food items exist and calculate price from DB (not frontend)
  for (const item of cart.items) {
    if (!item.foodId) {
      throw new ErrorResponse("One or more food items in your cart no longer exist", 400);
    }
    // item.foodId is populated so we have the price
    totalPrice += item.foodId.price * item.quantity;
  }

  const order = await Order.create({
    userId,
    items: cart.items.map(item => ({
      foodId: item.foodId._id,
      quantity: item.quantity
    })),
    address,
    mobile,
    totalPrice,
  });

  // Clear cart after successful order
  cart.items = [];
  await cart.save();

  return order;
};

const getUserOrders = async (userId) => {
  return await Order.find({ userId })
    .populate("items.foodId")
    .sort({ createdAt: -1 });
};

module.exports = {
  placeOrder,
  getUserOrders,
};
