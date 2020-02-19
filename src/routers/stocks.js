const express = require("express");
const Router = express.Router();

const stocksController = require("../controllers/stocks");
const { checkToken } = require("../auth/token");

Router.get("/", checkToken, stocksController.getStocks);
Router.post("/", checkToken, stocksController.addStocks);
Router.patch("/:id_stocks", checkToken, stocksController.editStocks);
Router.delete("/:id_stocks", checkToken, stocksController.deleteStocks);

module.exports = Router;
