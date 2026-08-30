const express = require("express");
const { isAuth } = require("../middleware/auth.middleware.js");

const {
  placeOrder,
  getOrders,
} = require("../controllers/order.Controller.js");

const orderRouter = express.Router();
const { placeOrderValidation } = require("../validations/order.validation.js");
const validate = require("../middleware/validate.middleware.js");

orderRouter.post("/", isAuth, placeOrderValidation, validate, placeOrder);

orderRouter.get("/", isAuth, getOrders);

module.exports = orderRouter;
