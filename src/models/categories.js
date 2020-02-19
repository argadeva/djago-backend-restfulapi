const connection = require("../configs/db");

module.exports = {
  getCategories: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM categories", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  detailCategories: id_categories => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM categories WHERE id = ?",
        id_categories,
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
  addCategories: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO categories SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editCategories: (id_categories, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE categories SET ? WHERE id = ?",
        [data, id_categories],
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
  deleteCategories: id_categories => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM categories WHERE id = ?",
        id_categories,
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
