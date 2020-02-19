const express = require("express");
const Router = express.Router();

const categoriesController = require("../controllers/categories");
const { checkToken } = require("../auth/token");

Router.get("/", checkToken, categoriesController.getCategories);
Router.get(
  "/:id_categories",
  checkToken,
  categoriesController.detailCategories
);
Router.post("/", checkToken, categoriesController.addCategories);
Router.patch(
  "/:id_categories",
  checkToken,
  categoriesController.editCategories
);
Router.delete(
  "/:id_categories",
  checkToken,
  categoriesController.deleteCategories
);

module.exports = Router;
