import {Request, Response} from 'express';
import {_curl_bitmex} from '../util/auth';
import {logger} from '../util/logger';

export const post_bulkOrders = async (req: Request, res: Response) => {
  try {
    const response = await _curl_bitmex('order/bulk', 'POST', req.body);
    logger.info('Successful POST request (post_bulkOrders)');

    return res.send({success: res.statusCode, data: response});
  } catch (error) {
    return res.status(400).send({error: error});
  }
};

export const getBalance = async (_req: Request, res: Response) => {
  try {
    const response = await _curl_bitmex('user/margin', 'GET');
    logger.info('Successful GET request (getBalance)');

    return res.send({data: response});
  } catch (error) {
    return res.status(400).send({error: error});
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const response = await _curl_bitmex('order', 'GET', {
      filter: {open: true},
    });
    logger.info('Successful GET request (getOrders)');

    return res.send({data: response});
  } catch (error) {
    return res.status(400).send({error: error});
  }
};

export const post_order = async (req: Request, res: Response) => {
  try {
    const {order, method} = req.body;

    const response = await _curl_bitmex('order', method, order);
    logger.info(`Successful ${method} request (post_order)`);

    return res.send({success: res.statusCode, data: response});
  } catch (error) {
    return res.status(400).send({error: error});
  }
};
