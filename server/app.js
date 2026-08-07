const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./src/routes/auth.Route.js");
const foodRouter = require("./src/routes/food.Route.js");
const cartRouter = require("./src/routes/cart.Route.js")
const orderRouter = require("./src/routes/order.Route.js")
app.use(express.json());
const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:5173",
  "https://food-order-app-omega-kohl.vercel.app/",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("hello this is foodCart");
});
app.use("/api/auth", authRouter);
app.use("/api/foods", foodRouter);
app.use("/api/cart",cartRouter);
app.use("/api/orders",orderRouter);

module.exports = app;
