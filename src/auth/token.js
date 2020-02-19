const { verify } = require("jsonwebtoken");
const usersModel = require("../models/users");

module.exports = {
  checkToken: (req, res, next) => {
    token = req.headers["x-access-token"];
    if (token === "" || token === undefined) {
      res.json({
        status: "Accesss denided! unautorized user!",
        status_code: 403
      });
    } else {
      id_users = token.substr(0, token.indexOf("#"));
      tokens = token.split("#")[1];
      if (tokens) {
        verify(tokens, process.env.PRIVATE_KEY, (err, decoded) => {
          if (err) {
            res.json({
              status: "Invalid Token!",
              status_code: 403
            });
          } else {
            usersModel
              .getUsersDetail(id_users)
              .then(result => {
                if (result[0].token === token) {
                  next();
                } else {
                  res.json({
                    status: "Invalid Token!",
                    status_code: 403
                  });
                }
              })
              .catch(err => console.log(err));
          }
        });
      } else {
        res.json({
          status: "Accesss denided! unautorized user!",
          status_code: 403
        });
      }
    }
  }
};
