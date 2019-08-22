const express = require('express');

const apiController = require('../controllers/rangeToolAPI');

// const apiController = require("../controllers/rangeToolAPI");

const Router = express.Router();

// Router.get("/postOrder", apiController.navigate_postOrder);
// Router.post("/postOrder", apiController.postOrder);
Router.post('/getPrice', apiController.displayPrice);
Router.post('/postOrder', apiController.postOrder);
// Router.get('/getInstruments', apiController.getInstruments);

module.exports = Router;
