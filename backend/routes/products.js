const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// return list of products (get request)
router.get("/", async (req, res) => {
  const productsData = await Product.find({});
  res.send({ productsData });
});
//

// add a new product to the DB (post request)
router.post("/add-new", async (req, res) => {
  const { title, image, description, category, price } = req.body;

  if (!title || !image || !description || !category || !price) {
    res
      .status(400)
      .send({ message: "Please provide all the necessary details" });
  }

  // const productExists = await Product.findOne({ title: title });

  const productExists = await Product.find({ title }).limit(1).lean();

  if (productExists.length > 0) {
    res
      .status(400)
      .send("Product with following title is already in the database.");
  } else {
    const product = new Product({ title, image, description, category, price });

    const a = await product.save();
    console.log(a);

    if (a) {
      res.status(201).send("You have successfully added a new product.");
    } else {
      res.status(500).send("Product creation failed. please try again later");
    }
  }
});
//

module.exports = router;
