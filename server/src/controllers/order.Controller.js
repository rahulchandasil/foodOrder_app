const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");


const placeOrder = async (req, res) => {
  try {
    const { userId, address, mobile } = req.body;

    // Validation
    if (!userId || !address || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

  
    const cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalPrice += item.foodId.price * item.quantity;
    });


    const order = await Order.create({
      userId,
      items: cart.items,
      address,
      mobile,
      totalPrice,
    });

    
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    const orders = await Order.find({ userId })
      .populate("items.foodId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};