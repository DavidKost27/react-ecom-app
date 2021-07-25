const express = require("express");
const router = express.Router();
const User = require("../models/User");

// return list of users
router.get("/", async (req, res) => {
  const userData = await User.find({});
  res.send({ userData });
});
//

// create user
router.post("/sign-up", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res
      .status(400)
      .send({ message: "Please provide all the necessary details" });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).send("User with following email is already registered.");
  } else {
    const user = new User({ email, password });

    user.save((err, doc) => {
      if (err) {
        res
          .status(500)
          .send("User registration failed. please try again later");
      }

      res.status(201).send("You have successfully registered.");
    });
  }
});
//

// edit user

//

// delete user

//

module.exports = router;
