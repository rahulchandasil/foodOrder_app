const asyncHandler = require("../utils/asyncHandler.js");
const orderService = require("../services/order.service.js");

const placeOrder = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { address, mobile } = req.body;

  const order = await orderService.placeOrder(userId, address, mobile);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

const getOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const orders = await orderService.getUserOrders(userId);

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

module.exports = {
  placeOrder,
  getOrders,
};