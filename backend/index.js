const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const path = require("path");
const dotenv = require("dotenv");

// express app
const app = express();
app.use(express.json());

// used in production to serve client files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// DataBase URI
const dbURI = "mongodb://localhost:27017/ecom";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

// Middleware
app.get("/", (req, res) => {
  res.send("Health check");
});

app.use("/users", usersRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
