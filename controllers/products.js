// model
const Product = require("../models/products");

// all products
const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

// search Products
const searchProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

// single product
const getProduct = async (req, res) => {
  // single product find by slug
  try {
    const { id } = req.params;
    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
      return res.status(404).json({ msg: "product not found" });
    }
    res.status(200).json({ singleProduct });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// create product
const createProduct = async (req, res) => {
  try {
    const newProduct = await new Product(req.body);
    await newProduct.save();
    res.status(201).json({ newProduct });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = await Product.findOneAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newProduct) {
      return res.status(404).json({ msg: "product not found" });
    }

    await newProduct.save();

    res.status(200).json({ newProduct });
  } catch (error) {}
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = await Product.findOneAndDelete(id);

  if (!newProduct) {
    return res.status(404).json({ msg: "product not found" });
  }

  res.status(200).json({ msg: "product deleted" });
};

module.exports = {
  getAllProduct,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
