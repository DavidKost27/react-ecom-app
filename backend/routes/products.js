const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const productsData = await Product.find({});
  res.send({ productsData });
});

router.post("/add-new", async (req, res) => {
  const { title, image, description, category, price } = req.body;

  if (!title || !image || !description || !category || !price) {
    res
      .status(400)
      .send({ message: "Please provide all the necessary details" });
  }

  const productExists = await Product.find({ title }).limit(1).lean();
  console.log(productExists);
  if (productExists != 0) {
    res
      .status(400)
      .send("Product with following title is already in the database.");
    return;
  }

  const product = new Product({ title, image, description, category, price });
  const productCreated = await product.save();

  if (productCreated) {
    res.status(201).send("You have successfully added a new product.");
    return;
  }
  res.status(500).send("Product creation failed. please try again later");
});

module.exports = router;
