const express = require("express");
const { order } = require("../middleware/order.middleware");
const { auth } = require("../middleware/auth.middleware");
const { OrderModel } = require("../model/order.model");

const orderRouter = express.Router();

orderRouter.post("/", order, async (req, res) => {
  const payload = req.body;
  try {
    let book = await OrderModel(payload);
    await book.save();
    res.status(200).send({ message: "Order placed successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

orderRouter.get("/", auth, async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { orderRouter };
