import express from 'express';
import * as apiController from '../controllers/rangeToolAPI';

const Router = express.Router();

//Router.post('/getPrice', apiController.displayPrice);
Router.post('/bulkOrders', apiController.post_bulkOrders);
Router.post('/order', apiController.post_order);
Router.post('/getBalance', apiController.getBalance);
Router.post('/getOrders', apiController.getOrders);

// Router.get('/getInstruments', apiController.getInstruments);
export default Router;
