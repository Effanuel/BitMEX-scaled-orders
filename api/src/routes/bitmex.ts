import express from 'express';
import * as bitmexController from '../controllers/bitmexController';

const Router = express.Router();

Router.post('/*', bitmexController.fetch);

export default Router;
