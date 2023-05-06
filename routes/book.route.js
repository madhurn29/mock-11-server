const express = require("express");
const { BookModel } = require("../model/book.model");
const { auth } = require("../middleware/auth.middleware");
const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  let queryObj = {};
  const { author, category } = req.query;
  if (author) {
    queryObj.author = author;
  }
  if (category) {
    queryObj.category = category;
  }

  try {
    const books = await BookModel.find(queryObj);
    res.status(200).send({ books });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BookModel.findById({ _id: id });

    res.status(200).send(book);
  } catch (error) {
    res.send({ message: error.message });
  }
});

//!------all routes from here are protected ----------------------------//
bookRouter.use(auth);

bookRouter.post("/", async (req, res) => {
  const bookObj = req.body;

  try {
    let book = await BookModel(bookObj);
    await book.save();
    res.status(200).send({ message: "Book saved successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

bookRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    await BookModel.findByIdAndUpdate({ _id: id }, payload);
    res
      .status(200)
      .send({ message: "Book details has been updated successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    await BookModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .send({ message: "Book details has been deleted successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = { bookRouter };
