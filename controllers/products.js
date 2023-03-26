// model
const Product = require("../models/products");

// all products
const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

// search Products
const searchProducts = async (req, res) => {
  // const { name } = req.query;
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHit: products.length });
};

// single product
const getProduct = async (req, res) => {
  res.status(200).json({ msg: `get product ${req.params.slug}` });
};

// create product
const createProduct = async (req, res) => {
  res.status(201).json({ msg: "create product" });
};

// update product
const updateProduct = async (req, res) => {
  res.status(200).json({ msg: `update product ${req.params.slug}` });
};

// delete product
const deleteProduct = async (req, res) => {
  res.status(200).json({ msg: `delete product ${req.params.slug}` });
};

module.exports = {
  getAllProduct,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
