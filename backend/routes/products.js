const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// return list of products
router.get("/", async (req, res) => {
  const productsData = await Product.find({});
  res.send({ productsData });
});
//

// post request for new products
router.post("/add-new", async (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;

  if (!title || !image || !description || !category || !price) {
    res
      .status(400)
      .send({ message: "Please provide all the necessary details" });
  }

  const productExists = await Product.findOne({ title: title });

  if (productExists) {
    res
      .status(400)
      .send("Product with following title is already in the database.");
  } else {
    const product = new Product({ title, image, description, category, price });

    product.save((err, doc) => {
      if (err) {
        res.status(500).send("Product creation failed. please try again later");
      }

      res.status(201).send("You have successfully added a new product.");
    });
  }
});
//

module.exports = router;
