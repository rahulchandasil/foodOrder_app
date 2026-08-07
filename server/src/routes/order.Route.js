const express = require("express");

const {
  placeOrder,
  getOrders,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/", placeOrder);

orderRouter.get("/", getOrders);

module.exports = orderRouter;