const express = require("express");

const apiController = require("../controllers/rangeToolAPI");

// const apiController = require("../controllers/rangeToolAPI");

const Router = express.Router();

// Router.get("/postOrder", apiController.navigate_postOrder);
// Router.post("/postOrder", apiController.postOrder);
Router.get("/getPrice", apiController.displayPrice);
Router.post("/postOrder", apiController.postOrder);

module.exports = Router;
