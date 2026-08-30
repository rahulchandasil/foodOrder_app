const express = require("express");
const cors = require("cors");

const app = express();

const authRouter = require("./src/routes/auth.Route.js");
const foodRouter = require("./src/routes/food.Route.js");
const cartRouter = require("./src/routes/cart.Route.js");
const orderRouter = require("./src/routes/order.Route.js");
const errorHandler = require("./src/middleware/error.middleware.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:5173",
  "https://client-food-order.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, this is FoodCart API");
});

app.use("/api/auth", authRouter);
app.use("/api/foods", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.use(errorHandler);

module.exports = app;