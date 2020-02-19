const connection = require("../configs/db");

module.exports = {
  getStocks: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT stocks.*, products.name as product_name FROM stocks INNER JOIN products ON stocks.product_id = products.id",
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
  detailStocks: product_id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE id = ?",
        product_id,
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
  addStocks: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO stocks SET ?", data, (err, result) => {
        if (!err) {
          if (data.type === "in") {
            var types = "+";
          } else if (data.type === "out") {
            var types = "-";
          } else {
            reject(new Error(err));
          }
          connection.query(
            "UPDATE products SET stock = stock " + types + " ? WHERE id = ?",
            [data.qty, data.product_id],
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            }
          );
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editStocks: (id_stocks, data) => {
    return new Promise((resolve, reject) => {
      if (data.type === "in") {
        connection.query(
          "UPDATE products SET stock = (stock - (SELECT qty FROM stocks WHERE id = ?)) + ? WHERE id = ?",
          [id_stocks, data.qty, data.product_id],
          (err, result) => {
            if (!err) {
              connection.query(
                "UPDATE stocks SET ? WHERE id = ?",
                [data, id_stocks],
                (err, result) => {
                  if (!err) {
                    resolve(result);
                  } else {
                    reject(new Error(err));
                  }
                }
              );
            } else {
              reject(new Error(err));
            }
          }
        );
      } else if (data.type === "out") {
        connection.query(
          "UPDATE products SET stock = (stock + (SELECT qty FROM stocks WHERE id = ?)) - ? WHERE id = ?",
          [id_stocks, data.qty, data.product_id],
          (err, result) => {
            if (!err) {
              connection.query(
                "UPDATE stocks SET ? WHERE id = ?",
                [data, id_stocks],
                (err, result) => {
                  if (!err) {
                    resolve(result);
                  } else {
                    reject(new Error(err));
                  }
                }
              );
            } else {
              reject(new Error(err));
            }
          }
        );
      }
    });
  },
  deleteStocks: id_stocks => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM stocks WHERE id = ?",
        id_stocks,
        (err, result) => {
          if (!err) {
            if (result[0].type === "in") {
              connection.query(
                "UPDATE products SET stock = stock - ? WHERE id = ?",
                [result[0].qty, result[0].product_id],
                (err, result) => {
                  if (!err) {
                    resolve(result);
                    connection.query(
                      "DELETE FROM stocks WHERE id = ?",
                      id_stocks,
                      (err, result) => {
                        if (!err) {
                          resolve(result);
                        } else {
                          reject(new Error(err));
                        }
                      }
                    );
                  } else {
                    reject(new Error(err));
                  }
                }
              );
            } else {
              if (result[0].type === "out") {
                connection.query(
                  "UPDATE products SET stock = stock + ? WHERE id = ?",
                  [result[0].qty, result[0].product_id],
                  (err, result) => {
                    if (!err) {
                      resolve(result);
                      connection.query(
                        "DELETE FROM stocks WHERE id = ?",
                        id_stocks,
                        (err, result) => {
                          if (!err) {
                            resolve(result);
                          } else {
                            reject(new Error(err));
                          }
                        }
                      );
                    } else {
                      reject(new Error(err));
                    }
                  }
                );
              }
            }
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
