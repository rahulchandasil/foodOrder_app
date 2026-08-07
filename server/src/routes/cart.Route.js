const express = require("express");

const {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
} = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/", getCart);

cartRouter.post("/", addToCart);

cartRouter.put("/:id", updateCart);

cartRouter.delete("/:id", removeCartItem);

module.exports = cartRouter;