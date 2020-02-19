const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, "file-" + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  }
});
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
