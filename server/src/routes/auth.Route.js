const express = require("express");
const {register,login} = require("../controllers/auth.Controller.js");

const authRouter = express.Router();

const { registerValidation, loginValidation } = require("../validations/auth.validation.js");
const validate = require("../middleware/validate.middleware.js");

authRouter.post("/register", registerValidation, validate, register);
authRouter.post("/login", loginValidation, validate, login);

module.exports = authRouter;