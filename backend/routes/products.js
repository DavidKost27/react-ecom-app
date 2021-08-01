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
  if (productExists.length !== 0) {
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

router.put("/:id", async (req, res) => {
  const productId = req.params.id;

  if (productId) {
    let params = ({ title, image, description, category, price } = req.body);

    for (let prop in params) if (!params[prop]) delete params[prop]; //Goes through the params and deletes them if they have a falsy value.

    const productEdit = await Product.findOneAndUpdate(
      { _id: productId },
      params,
      { returnNewDocument: true }
    );
    res.status(200).send("Changes were saved.");
    return;
  }
  res.status(500).send("Product creation failed. please try again later");
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const productExists = await Product.find({ _id: productId }).limit(1).lean();
  if (productExists.length == 0) {
    res
      .status(400)
      .send("A product with the following ID dosen't exist in DB.");
    return;
  }
  if (productId) {
    const productDelete = await Product.findOneAndDelete({ _id: productId });
    res
      .status(200)
      .send("The product was successfully deleted from the databse.");
    return;
  }
  res.status(500).send("Product creation failed. please try again later");
});

module.exports = router;
