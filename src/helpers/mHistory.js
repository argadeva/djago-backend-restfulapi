module.exports = {
  response: (
    res,
    todayIncome,
    yesterdayIncome,
    currentYearIncome,
    lastYearIncome,
    orderthisWeek,
    orderlastWeek,
    message,
    status_code
  ) => {
    let resultPrint = {};
    resultPrint.status = message;
    resultPrint.status_code = status_code;
    let report = {
      todayIncome:
        todayIncome[0].todayIncome !== null ? todayIncome[0].todayIncome : 0,
      yesterdayIncome:
        yesterdayIncome[0].yesterdayIncome !== null
          ? yesterdayIncome[0].yesterdayIncome
          : 0,
      orderthisWeek: orderthisWeek[0].orderthisWeek,
      orderlastWeek: orderlastWeek[0].orderlastWeek,
      currentYearIncome:
        currentYearIncome[0].currentYearIncome !== null
          ? currentYearIncome[0].currentYearIncome
          : 0,
      lastYearIncome:
        lastYearIncome[0].lastYearIncome !== null
          ? lastYearIncome[0].lastYearIncome
          : 0
    };
    resultPrint.history = report;
    return res.status(resultPrint.status_code).json(resultPrint);
  }
};
