const categoriesModel = require("../models/categories");
const miscHelper = require("../helpers/message");

module.exports = {
  getCategories: (req, res) => {
    categoriesModel
      .getCategories()
      .then(result => {
        miscHelper.response(res, result, "Success", 200);
      })
      .catch(err => console.log(err));
  },
  detailCategories: (req, res) => {
    const id_categories = req.params.id_categories;
    categoriesModel
      .detailCategories(id_categories)
      .then(result => {
        if (result.length !== 0) {
          miscHelper.response(res, result, "Success", 200);
        } else {
          miscHelper.response(res, "", "Categories ID not found!", 400);
        }
      })
      .catch(err => console.log(err));
  },
  addCategories: (req, res) => {
    const { name } = req.body;
    const data = { name };
    categoriesModel
      .addCategories(data)
      .then(result => {
        miscHelper.response(
          res,
          result,
          "Categories created successfully!",
          200
        );
      })
      .catch(err => console.log(err));
  },
  editCategories: (req, res) => {
    const id_categories = req.params.id_categories;
    const { name } = req.body;
    const data = { name };
    categoriesModel
      .detailCategories(id_categories)
      .then(result => {
        if (result.length !== 0) {
          categoriesModel
            .editCategories(id_categories, data)
            .then(results => {
              miscHelper.response(
                res,
                results,
                "Categories edited successfully!",
                200
              );
            })
            .catch(err => console.log(err));
        } else {
          miscHelper.response(res, "", "Categories ID not found!", 400);
        }
      })
      .catch(err => console.log(err));
  },
  deleteCategories: (req, res) => {
    const id_categories = req.params.id_categories;
    categoriesModel
      .detailCategories(id_categories)
      .then(result => {
        if (result.length !== 0) {
          categoriesModel
            .deleteCategories(id_categories)
            .then(results => {
              miscHelper.response(
                res,
                results,
                "Categories deleted successfully!",
                200
              );
            })
            .catch(err => console.log(err));
        } else {
          miscHelper.response(res, "", "Categories ID not found!", 400);
        }
      })
      .catch(err => console.log(err));
  }
};
