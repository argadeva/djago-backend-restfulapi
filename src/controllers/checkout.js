const checkoutModel = require("../models/checkout");
const productsModel = require("../models/products");
const miscHelper = require("../helpers/message");
const miscHelper2 = require("../helpers/mdOrder");

module.exports = {
  getCheckout: (req, res) => {
    checkoutModel
      .getCheckout()
      .then(result => {
        miscHelper.response(res, result, "Success", 200);
      })
      .catch(err => console.log(err));
  },
  getCheckoutbyId: (req, res) => {
    token = req.headers["x-access-token"];
    id_users = token.substr(0, token.indexOf("#"));
    checkoutModel
      .getCheckoutbyId(id_users)
      .then(result => {
        miscHelper.response(res, result, "Success", 200);
      })
      .catch(err => console.log(err));
  },
  getCheckoutDetail: (req, res) => {
    const id_checkout = req.params.id_checkout;
    checkoutModel
      .getCheckoutDetail(id_checkout)
      .then(result => {
        checkoutModel
          .getProductList(result[0].id)
          .then(result2 => {
            miscHelper2.response(res, result, result2, "Success", 200);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  addCheckout: (req, res) => {
    token = req.headers["x-access-token"];
    id_users = token.substr(0, token.indexOf("#"));
    const { order_number } = req.body;
    const data = { order_number, user_id: id_users };
    checkoutModel
      .addCheckout(data)
      .then(result => {
        miscHelper.response(res, result, "Order Add Successfully!", 200);
      })
      .catch(err => console.log(err));
  },
  addCart: (req, res) => {
    const { order_id, product_id, qty } = req.body;
    const id_product = product_id;
    token = req.headers["x-access-token"];
    id_users = token.substr(0, token.indexOf("#"));
    if (qty > 0) {
      checkoutModel
        .getAddDetail(order_id)
        .then(resultx => {
          if (resultx[0].user_id !== Number(id_users)) {
            miscHelper.response(
              res,
              "",
              "Your account not authorized for this cart!",
              401
            );
          } else {
            productsModel
              .detailProducts(id_product)
              .then(result => {
                if (result[0].stock - qty >= 0) {
                  const data = {
                    order_id,
                    product_id,
                    price: result[0].price,
                    qty,
                    total: result[0].price * qty
                  };
                  checkoutModel
                    .addCart(data)
                    .then(result2 => {
                      miscHelper.response(res, result2, "Success", 200);
                    })
                    .catch(err => console.log(err));
                } else {
                  miscHelper.response(
                    res,
                    "",
                    `Product stock not available! Only left ${result[0].stock} Pcs`,
                    401
                  );
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    } else {
      miscHelper.response(res, "", "Qty must be greater than 0!", 400);
    }
  }
};
