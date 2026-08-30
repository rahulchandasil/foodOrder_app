const asyncHandler = require("../utils/asyncHandler.js");
const orderService = require("../services/order.service.js");
const ErrorResponse = require("../utils/ErrorResponse.js");

const getUserId = (req) => {
  return req.user?._id || req.user?.id;
};

const placeOrder = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return next(new ErrorResponse("Not authorized, user ID not found", 401));
  }
  const { address, mobile } = req.body;

  const order = await orderService.placeOrder(userId, address, mobile);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

const getOrders = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return next(new ErrorResponse("Not authorized, user ID not found", 401));
  }

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