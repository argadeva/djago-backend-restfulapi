const usersModel = require("../models/users");
const miscHelper = require("../helpers/message");
const { genSaltSync, hashSync, compareSync } = require("bcrypt-nodejs");
const { sign } = require("jsonwebtoken");

module.exports = {
  getUsers: (req, res) => {
    usersModel
      .getUsers()
      .then(result => {
        miscHelper.response(res, result, "Success", 200);
      })
      .catch(err => console.log(err));
  },
  detailUsers: (req, res) => {
    const id_users = req.params.id_users;
    usersModel
      .getUsersDetail(id_users)
      .then(result => {
        if (result.length <= 0) {
          miscHelper.response(res, "", "User not found!", 404);
        } else {
          miscHelper.response(res, result, "Success", 200);
        }
      })
      .catch(err => console.log(err));
  },
  addUsers: (req, res) => {
    const { name, email, password } = req.body;
    const body = {
      name,
      email,
      password
    };
    const salt = genSaltSync(10);
    if (body.name === "" || body.name === undefined) {
      miscHelper.response(res, "", "Please input name!", 400);
    } else if (body.email === "" || body.email === undefined) {
      miscHelper.response(res, "", "Please input email!", 400);
    } else if (body.password === "" || body.password === undefined) {
      miscHelper.response(res, "", "Please input password!", 400);
    } else {
      body.password = hashSync(body.password, salt);
      usersModel
        .checkUserEmail(body.email)
        .then(result => {
          if (result.length !== 0) {
            miscHelper.response(
              res,
              "",
              "Email registered, please change email!",
              400
            );
          } else {
            usersModel
              .addUsers(body)
              .then(result => {
                miscHelper.response(
                  res,
                  result,
                  "User created successfully!",
                  201
                );
              })
              .catch(err => {
                miscHelper.response(res, result, "User created error!", 400);
              });
          }
        })
        .catch(err => console.log(err));
    }
  },
  editUsers: (req, res) => {
    const id_users = req.params.id_users;
    const { name, email, password } = req.body;
    const body = {
      name,
      email,
      password
    };
    const salt = genSaltSync(10);
    if (body.name === "" || body.name === undefined) {
      miscHelper.response(res, "", "Please input name!", 400);
    } else if (body.email === "" || body.email === undefined) {
      miscHelper.response(res, "", "Please input email!", 400);
    } else if (body.password === "" || body.password === undefined) {
      miscHelper.response(res, "", "Please input password!", 400);
    } else {
      body.password = hashSync(body.password, salt);
      usersModel
        .checkUserEmail(body.email)
        .then(result => {
          if (result.length !== 0) {
            usersModel.getUsersDetail(id_users).then(results => {
              if (results[0].email !== body.email) {
                miscHelper.response(
                  res,
                  "",
                  "Email registered, please change email!",
                  400
                );
              } else {
                usersModel
                  .editUsers(id_users, body)
                  .then(result => {
                    miscHelper.response(
                      res,
                      result,
                      "User edited successfully!",
                      201
                    );
                  })
                  .catch(err => {
                    miscHelper.response(res, "", "User edited error!", 400);
                  });
              }
            });
          } else {
            usersModel
              .editUsers(id_users, body)
              .then(result => {
                miscHelper.response(
                  res,
                  result,
                  "User edited successfully!",
                  201
                );
              })
              .catch(err => {
                miscHelper.response(res, "", "User edited error!", 400);
              });
          }
        })
        .catch(err => console.log(err));
    }
  },
  deleteUsers: (req, res) => {
    const id_users = req.params.id_users;
    usersModel
      .getUsersDetail(id_users)
      .then(result => {
        if (result.length <= 0) {
          miscHelper.response(res, "", "User not found!", 404);
        } else {
          usersModel
            .deleteUsers(id_users)
            .then(results =>
              miscHelper.response(
                res,
                results,
                "User deleted successfully!",
                200
              )
            )
            .catch(err =>
              miscHelper.response(res, "", "User deleted error!", 400)
            );
        }
      })
      .catch(err => console.log(err));
  },
  loginUsers: (req, res) => {
    const body = req.body;
    usersModel
      .loginUser(body.email)
      .then(result => {
        const results = compareSync(body.password, result.password);
        const id = result.id;
        if (results) {
          result.password = undefined;
          const jsontoken = sign({ results: result }, process.env.PRIVATE_KEY, {
            expiresIn: "7d"
          });
          usersModel.tokenUser(id, id + "#" + jsontoken);
          return res.json({
            success: 1,
            message: "Login successfully",
            token: id + "#" + jsontoken
          });
        } else {
          miscHelper.response(res, "", "Invalid email or password!", 401);
        }
      })
      .catch(err =>
        miscHelper.response(res, "", "Invalid email or password!", 401)
      );
  },
  logoutUsers: (req, res) => {
    const { token } = req.body;
    const body = { token };
    id_users = body.token.substr(0, body.token.indexOf("#"));
    usersModel
      .logoutUser(id_users)
      .then(result => {
        miscHelper.response(res, result, "User logout successfully!", 200);
      })
      .catch(err => miscHelper.response(res, "", "User deleted error!", 400));
  }
};
