const connection = require("../configs/db");

module.exports = {
  todayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(sub_total) as todayIncome FROM checkout WHERE created_at >= CURRENT_DATE()",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  yesterdayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(sub_total) as yesterdayIncome FROM checkout WHERE created_at BETWEEN CURDATE() - INTERVAL 1 DAY AND CURDATE() - INTERVAL 1 SECOND",
        (err, result_yesterdayIncome) => {
          if (!err) {
            resolve(result_yesterdayIncome);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  currentYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(sub_total) as currentYearIncome FROM checkout WHERE YEAR(created_at) = YEAR(CURDATE())",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  lastYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(sub_total) as lastYearIncome FROM checkout WHERE YEAR(created_at) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  orderthisWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orderthisWeek FROM checkout WHERE YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  orderlastWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orderlastWeek FROM checkout WHERE created_at >= curdate() - INTERVAL DAYOFWEEK(curdate())+5 DAY AND created_at < curdate() - INTERVAL DAYOFWEEK(curdate())-2 DAY",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getIncomeWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DATE(created_at) AS period, SUM(sub_total) AS total FROM checkout WHERE YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1) GROUP BY period",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
