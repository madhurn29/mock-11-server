const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

userRouter.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      // Store hash in your password DB.
      const userObj = { name, email, password: hash, isAdmin };

      const user = await UserModel(userObj);
      await user.save();
      res.status(201).send({ message: "User has been created successfully" });
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  try {
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        // result == true
        if (result) {
          let token = jwt.sign(
            {
              userId: user._id,
              name: user.name,
              isAdmin: user.isAdmin,
              email: user.email,
            },
            "mock-11"
          );
          res
            .status(201)
            .send({ message: "User has been logged in successfully", token });
        } else {
          res.status(400).send({ message: "Incorrect password" });
        }
      });
    } else {
      res.status(400).send({ message: "Please Resgister first" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { userRouter };
