const connection = require("../configs/db");

module.exports = {
  getProducts: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.*, categories.name as categories FROM products INNER JOIN categories ON products.category_id = categories.id WHERE deleted = 0 ORDER BY id ASC",
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
  onStockProducts: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.*, categories.name as categories FROM products INNER JOIN categories ON products.category_id = categories.id WHERE deleted = 0 AND stock > 0 ORDER BY id ASC",
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
  detailProducts: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.*, categories.name as categories FROM products INNER JOIN categories ON products.category_id = categories.id WHERE deleted = 0 AND products.id = ?",
        id_product,
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
  addProducts: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO products SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editProducts: (id_product, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.image FROM products WHERE products.id = ?",
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result[0].image);
            connection.query(
              "UPDATE products SET ?, stock = stock, update_at = NOW() WHERE id = ?",
              [data, id_product],
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
    });
  },
  deleteProducts: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET deleted = 1 WHERE id = ?",
        id_product,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  searchProducts: search => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.*, categories.name as categories FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.name LIKE ? AND deleted = 0",
        "%" + search + "%",
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
  sortProducts: sort => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM products WHERE deleted = 0 ORDER BY ${sort} ASC`,
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
  countProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT (*) as rom FROM products WHERE deleted = 0",
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
  paginationProduct: (sort, startIndex, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT products.*, categories.name as categories FROM products INNER JOIN categories ON products.category_id = categories.id WHERE deleted = 0 ORDER BY products.${sort} ASC LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(startIndex)],
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
