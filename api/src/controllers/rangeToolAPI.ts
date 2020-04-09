import { Request, Response } from "express";
import { _curl_bitmex } from "../util/auth";
import { logger } from "../util/logger";

/**
 * Bulk order POST request to the exchange API
 */
export const post_bulkOrders = async (req: Request, res: Response) => {
  try {
    const response = await _curl_bitmex("order/bulk", "POST", req.body);
    logger.info("Successful POST request (post_bulkOrders)");
    return res.send({ success: res.statusCode });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};

/**
 * Balance GET request to the exchange API
 */
export const getBalance = async (req: Request, res: Response) => {
  try {
    const response = await _curl_bitmex("user/margin", "GET");
    logger.info("Successful GET request (getBalance)");
    return res.send({ data: response });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};

/**
 * Balance GET request to the exchange API
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const response = await _curl_bitmex("order", "GET", {
      //only open orders
      filter: { open: true }
    });
    logger.info("Successful GET request (getOrders)");
    return res.send({ data: response });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};

/**
 * POST request to the exchange API
 */
export const post_order = async (req: Request, res: Response, next: any) => {
  try {
    console.log("ORDER POST");
    const response = await _curl_bitmex("order", "POST", req.body);
    logger.info("Successful POST request (post_order)");
    return res.send({ success: res.statusCode, data: response });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};
