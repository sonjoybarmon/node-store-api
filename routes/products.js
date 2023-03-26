const express = require("express");
const {
  getAllProduct,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getAllProduct).post(createProduct);
router.route("/search").get(searchProducts);
router
  .route("/:slug")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
