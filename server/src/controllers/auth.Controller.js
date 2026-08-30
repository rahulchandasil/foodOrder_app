const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler.js");
const ErrorResponse = require("../utils/ErrorResponse.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const cleanEmail = email ? email.trim().toLowerCase() : "";
  const userExists = await User.findOne({ email: cleanEmail });

  if (userExists) {
    return next(new ErrorResponse("User already exists with this email", 400));
  }

  const user = await User.create({
    name: name ? name.trim() : "",
    email: cleanEmail,
    password,
  });

  const safeUser = user.toObject();
  delete safeUser.password;

  res.status(201).json({
    success: true,
    message: "Registration successful",
    user: safeUser,
    token: generateToken(user._id),
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const cleanEmail = email ? email.trim().toLowerCase() : "";
  const user = await User.findOne({ email: cleanEmail }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorResponse("Invalid email or password", 401));
  }

  const token = generateToken(user._id);
  const safeUser = user.toObject();
  delete safeUser.password;

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: safeUser,
  });
});

module.exports = {
  register,
  login,
};