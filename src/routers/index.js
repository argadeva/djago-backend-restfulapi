const express = require("express");
const users = require("./users");
const categories = require("./categories");
const products = require("./products");
const stocks = require("./stocks");
const checkout = require("./checkout");
const history = require("./history");

const Router = express.Router();

Router.use("/users", users);
Router.use("/categories", categories);
Router.use("/products", products);
Router.use("/stocks", stocks);
Router.use("/checkout", checkout);
Router.use("/history", history);

module.exports = Router;
