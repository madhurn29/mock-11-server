const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const app = express();
require("dotenv").config();
app.use(express.json());
var cors = require("cors");
const { bookRouter } = require("./routes/book.route");
const { orderRouter } = require("./routes/order.route");
app.use(cors());

app.use("/user", userRouter);
app.use("/books", bookRouter);
app.use("/orders", orderRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to momgoDB");
  } catch (error) {
    console.log({ error });
  }

  console.log("listening on port " + process.env.PORT);
});
