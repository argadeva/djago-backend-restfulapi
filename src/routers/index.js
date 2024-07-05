const express = require("express");
const users = require("./users");
const categories = require("./categories");
const products = require("./products");
const stocks = require("./stocks");
const checkout = require("./checkout");
const history = require("./history");
const { response } = require("../helpers/message");

const Router = express.Router();

Router.use("/users", users);
Router.use("/categories", categories);
Router.use("/products", products);
Router.use("/stocks", stocks);
Router.use("/checkout", checkout);
Router.use("/history", history);
Router.use("/health-check", (req, res) => {
  response(res, [], "API is running", 200);
});

module.exports = Router;
