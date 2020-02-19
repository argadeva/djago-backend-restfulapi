const express = require("express");
const Router = express.Router();

const checkoutController = require("../controllers/checkout");
const { checkToken } = require("../auth/token");

Router.get("/", checkToken, checkoutController.getCheckout);
Router.get("/cart", checkToken, checkoutController.getCheckoutbyId);
Router.get("/:id_checkout", checkToken, checkoutController.getCheckoutDetail);
Router.post("/", checkToken, checkoutController.addCheckout);
Router.post("/cart", checkToken, checkoutController.addCart);

module.exports = Router;
