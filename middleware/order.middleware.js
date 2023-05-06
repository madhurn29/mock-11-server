var jwt = require("jsonwebtoken");
const { OrderModel } = require("../model/order.model");

async function order(req, res, next) {
  const token = req.headers.authorization;
  
  let bookInfo = req.body;
  req.body = {};
  req.body.books = bookInfo;
  
  console.log(req.body);
  try {
    var decoded = jwt.verify(token, "mock-11");
    console.log(decoded);
    if (decoded) {
      req.body.user = { name: decoded.name, email: decoded.email };
      console.log(req.body);
      next();
    } else {
      res
        .status(400)
        .send({ message: "You are not authorized to do this action" });
    }
  } catch (err) {
    // err
    res
      .status(400)
      .send({ message: "You are not authorized to do this action" });
  }
}

module.exports = { order };
