const express = require("express");
const { isAuth } = require("../middleware/auth.middleware.js");

const {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
} = require("../controllers/cart.Controller.js");

const cartRouter = express.Router();

const { addToCartValidation, updateCartValidation } = require("../validations/cart.validation.js");
const validate = require("../middleware/validate.middleware.js");

cartRouter.get("/", isAuth, getCart);
cartRouter.post("/", isAuth, addToCartValidation, validate, addToCart);
cartRouter.put("/:id", isAuth, updateCartValidation, validate, updateCart);
cartRouter.delete("/:id", isAuth, removeCartItem);

module.exports = cartRouter;
