const express = require("express");
const Router = express.Router();

const usersController = require("../controllers/users");
const { checkToken } = require("../auth/token");

Router.get("/", checkToken, usersController.getUsers);
Router.get("/:id_users", checkToken, usersController.detailUsers);
Router.post("/", usersController.addUsers);
Router.patch("/:id_users", checkToken, usersController.editUsers);
Router.delete("/:id_users", checkToken, usersController.deleteUsers);
Router.post("/login", usersController.loginUsers);
Router.post("/logout", checkToken, usersController.logoutUsers);

module.exports = Router;
