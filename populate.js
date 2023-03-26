require("dotenv").config();

// db
const connectDB = require("./db/connect");

// model
const Product = require("./models/products");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
