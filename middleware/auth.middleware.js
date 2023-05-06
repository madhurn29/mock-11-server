var jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;
  try {
    var decoded = jwt.verify(token, "mock-11");
    if (decoded.isAdmin) {
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

module.exports = { auth };
