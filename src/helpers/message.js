module.exports = {
  response: (res, result, message, status_code) => {
    let resultPrint = {};
    resultPrint.status = message;
    resultPrint.status_code = status_code;
    resultPrint.result = result;
    return res.status(resultPrint.status_code).json(resultPrint);
  }
};
