require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("./uploads"));

const router = require("./src/routers/index.js");
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`\n App Listen port ${port}`);
});
