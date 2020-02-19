const historyModel = require("../models/history");
const miscHelper = require("../helpers/mHistory");
const message = require("../helpers/message");

module.exports = {
  getHistory: (req, res) => {
    historyModel.todayIncome().then(todayIncome => {
      historyModel.yesterdayIncome().then(yesterdayIncome => {
        historyModel.currentYearIncome().then(currentYearIncome => {
          historyModel.lastYearIncome().then(lastYearIncome => {
            historyModel.orderthisWeek().then(orderthisWeek => {
              historyModel.orderlastWeek().then(orderlastWeek => {
                miscHelper.response(
                  res,
                  todayIncome,
                  yesterdayIncome,
                  currentYearIncome,
                  lastYearIncome,
                  orderthisWeek,
                  orderlastWeek,
                  "Success",
                  200
                );
              });
            });
          });
        });
      });
    });
  },
  getIncomeWeek: (req, res) => {
    historyModel
      .getIncomeWeek()
      .then(result => {
        message.response(res, result, "Success", 200);
      })
      .catch(err => console.log(err));
  }
};
