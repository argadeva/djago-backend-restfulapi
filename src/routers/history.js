const express = require("express");
const Router = express.Router();

const historyController = require("../controllers/history");
const { checkToken } = require("../auth/token");

Router.get("/", checkToken, historyController.getHistory);
Router.get("/incomeweek", checkToken, historyController.getIncomeWeek);

module.exports = Router;
