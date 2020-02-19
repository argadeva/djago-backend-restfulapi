const connection = require("../configs/db");

module.exports = {
  getCheckout: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT checkout.*, users.name, DATE_FORMAT(created_at, '%d %M %Y') as newdate FROM checkout INNER JOIN users ON checkout.user_id = users.id GROUP BY id ORDER BY created_at DESC",
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
  getCheckoutbyId: id_users => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT checkout.*, users.name FROM checkout INNER JOIN users ON checkout.user_id = users.id WHERE user_id = ?",
        id_users,
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
  getCheckoutDetail: id_checkout => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT checkout.*, users.name FROM checkout INNER JOIN users ON checkout.user_id = users.id WHERE checkout.id = ?",
        id_checkout,
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
  getAddDetail: id_checkout => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM checkout WHERE id = ?",
        id_checkout,
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
  getProductList: id_checkout => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT checkout_detail.*, products.name FROM checkout_detail INNER JOIN products ON checkout_detail.product_id = products.id WHERE order_id = ?",
        id_checkout,
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
  addCheckout: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO checkout SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addCart: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO checkout_detail SET ?",
        data,
        (err, result) => {
          if (!err) {
            resolve(result);
            connection.query(
              "UPDATE products SET stock = stock - ? WHERE id = ?",
              [data.qty, data.product_id],
              (err, result) => {
                if (!err) {
                  resolve(result);
                  connection.query(
                    "UPDATE checkout SET sub_total = sub_total + ?, ppn = (sub_total*10)/100, total = sub_total+((sub_total*10)/100) WHERE id = ?",
                    [data.total, data.order_id],
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
            reject(new Error(err));
          }
        }
      );
    });
  }
};
