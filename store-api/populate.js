const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/products");
const jsonProducts = require("./products.json");

const app = express();
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

const start = async () => {
  try {
    await mongoose.connect(mongoUri).then(console.log("Connected to DB"));
    app.listen(port, console.log(`Server listening on localhost ${port}...`));
    await Product.deleteMany();
    await Product.create(jsonProducts).then(console.log("Products added"));
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
