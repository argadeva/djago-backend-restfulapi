module.exports = {
  response: (res, result, result2, message, status_code) => {
    let resultPrint = {};
    resultPrint.status = message;
    resultPrint.status_code = status_code;
    resultPrint.id = result[0].id;
    resultPrint.order_number = result[0].order_number;
    resultPrint.sub_total = result[0].sub_total;
    resultPrint.ppn = (result[0].sub_total * 10) / 100;
    resultPrint.total = resultPrint.sub_total + resultPrint.ppn;
    resultPrint.created_at = result[0].created_at;
    resultPrint.user_id = result[0].user_id;
    resultPrint.name = result[0].name;
    resultPrint.products = result2;
    return res.status(resultPrint.status_code).json(resultPrint);
  }
};
