const stocksModel = require("../models/stocks"),
  miscHelper = require("../helpers/message");

module.exports = {
  getStocks: (req, res) => {
    stocksModel
      .getStocks()
      .then(result => {
        miscHelper.response(res, result, "Success", 200);
      })
      .catch(err => console.log(err));
  },
  addStocks: (req, res) => {
    const { product_id, qty, description, type } = req.body;
    const data = { product_id, qty, description, type };
    if (data.qty > 0) {
      stocksModel
        .detailStocks(product_id)
        .then(results => {
          sProduct = results[0].stock;
          if (data.type === "out") {
            if (data.qty <= sProduct) {
              stocksModel
                .addStocks(data)
                .then(result => {
                  miscHelper.response(
                    res,
                    result,
                    `Add Stock ${data.type} Successfully!`,
                    200
                  );
                })
                .catch(err => console.log(err));
            } else {
              miscHelper.response(
                res,
                "",
                `Product ID ${product_id}, Stock only left ${sProduct} Pcs`,
                400
              );
            }
          } else {
            stocksModel
              .addStocks(data)
              .then(result => {
                miscHelper.response(
                  res,
                  result,
                  `Add Stock ${data.type} Successfully!`,
                  200
                );
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    } else {
      miscHelper.response(res, "", "Qty must be greater than 0!", 400);
    }
  },
  editStocks: (req, res) => {
    const id_stocks = req.params.id_stocks;
    const { product_id, qty, description, type } = req.body;
    const data = { product_id, qty, description, type };
    if (data.qty > 0) {
      stocksModel
        .editStocks(id_stocks, data)
        .then(result => {
          miscHelper.response(
            res,
            result,
            `Edit Stock ${data.type} Successfully!`,
            200
          );
        })
        .catch(err => console.log(err));
    } else {
      miscHelper.response(res, "", "Qty must be greater than 0!", 400);
    }
  },
  deleteStocks: (req, res) => {
    const id_stocks = req.params.id_stocks;
    stocksModel
      .deleteStocks(id_stocks)
      .then(result => {
        if (result.length !== 0) {
          miscHelper.response(res, result, "Delete Stock Successfully!", 200);
        } else {
          miscHelper.response(res, "", "Stock ID not found!", 400);
        }
      })
      .catch(err => console.log(err));
  }
};
