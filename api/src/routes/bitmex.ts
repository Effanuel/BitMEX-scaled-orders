import express from "express";
import * as apiController from "../controllers/rangeToolAPI";

const Router = express.Router();

//Router.post('/getPrice', apiController.displayPrice);
Router.post("/postOrder", apiController.postOrder);
Router.post("/getBalance", apiController.getBalance);
// Router.get('/getInstruments', apiController.getInstruments);
export default Router;
