const express = require("express");
const Router = express.Router();
const uploadMiddleware = require("../configs/cloudinary");

const upload = uploadMiddleware("pos-app/products");

const productsController = require("../controllers/products");
const { checkToken } = require("../auth/token");

Router.get("/", checkToken, productsController.getProducts);
Router.get("/onstock", checkToken, productsController.onStockProducts);
Router.get("/:id_product", checkToken, productsController.detailProducts);
Router.post(
  "/",
  upload.single("image"),
  checkToken,
  productsController.addProducts
);
Router.patch(
  "/:id_product",
  upload.single("image"),
  checkToken,
  productsController.editProducts
);
Router.delete("/:id_product", checkToken, productsController.deleteProducts);
Router.get("/search/:search", checkToken, productsController.searchProducts);
Router.get("/sort/:sort", checkToken, productsController.sortProducts);
Router.get(
  "/pagination/:page/:sort",
  checkToken,
  productsController.pageProducts
);

module.exports = Router;
