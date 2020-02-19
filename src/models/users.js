const connection = require("../configs/db");

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getUsersDetail: id_users => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE id = ?",
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
  addUsers: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  checkUserEmail: email => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT users.email FROM users WHERE email = ?",
        email,
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
  editUsers: (id_users, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id = ?",
        [data, id_users],
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
  deleteUsers: id_users => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM users WHERE id = ?",
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
  loginUser: email => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result[0]);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  tokenUser: (id, jsontoken) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET token = ? WHERE id = ?",
        [jsontoken, id],
        (err, result) => {
          if (!err) {
            resolve(result[0]);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  logoutUser: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET token = null WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result[0]);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
