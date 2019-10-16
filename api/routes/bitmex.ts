import express from "express";
import { postOrder } from "../controllers/rangeToolAPI";

const Router = express.Router();

//Router.post('/getPrice', apiController.displayPrice);
Router.post("/postOrder", postOrder);
// Router.get('/getInstruments', apiController.getInstruments);
export { Router };
