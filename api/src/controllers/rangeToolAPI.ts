// const request = require('request');
// const crypto = require('crypto');
// import * as ccxt from "ccxt";
import { Request, Response } from "express";
import { _curl_bitmex } from "../util/auth";

// const exchangeId = "bitmex",
//   exchangeClass = ccxt[exchangeId],
//   exchange = new exchangeClass({
//     apiKey: process.env.API_KEY,
//     secret: process.env.API_SECRET,
//     timeout: 30000,
//     enableRateLimit: process.env.ENABLE_RATE_LIMIT == "true"
//   });
// if (process.env.TESTNET == "true") {
//   exchange.urls["api"] = exchange.urls["test"];
// }

// const errorHandling = (e: any, res: any) => {
//   const errorMessage = JSON.parse(e.message.slice(7)).error.message;

//   if (e instanceof ccxt.NetworkError) {
//     return res.status(500).json({ errorMessage });
//   } else if (e instanceof ccxt.ExchangeError) {
//     return res.status(500).json({ errorMessage });
//   } else if (e instanceof ccxt.RequestTimeout) {
//     //validation error *
//     return res.status(500).json({ errorMessage });
//   } else {
//     return res.status(500).json({ errorMessage: "ERROR" });
//   }
// };

/**
 * Bulk order POST request to the exchange API
 */
export const postOrder = async (req: Request, res: Response, next: any) => {
  try {
    // const response = await exchange.privatePostOrderBulk(req.body);
    const response = await _curl_bitmex("order/bulk", req.body, "POST");
    console.log("POST", response);
    return res.send({ success: res.statusCode });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};
// exports.getInstruments = async (req, res, next) => {
// try {
//   // const response = await Promise.all([
//   //   exchange.fetchTicker('BTC/USD'),
//   //   exchange.fetchTicker('ETH/USD')
//   // ]);
//   const response2 = await exchange.fetchTicker('BTC/USD');

//   const instrumentsArray = [response2].map(obj => {
//     return obj.info.symbol;
//   });
//   return res.send({ instruments: instrumentsArray });
// } catch (e) {
//   if (e instanceof ccxt.NetworkError) {
//     console.log(
//       exchange.id,
//       'fetchTicker failed due to a network error:',
//       e.message
//     );
//   } else if (e instanceof ccxt.ExchangeError) {
//     console.log(
//       exchange.id,
//       'fetchTicker failed due to exchange error:',
//       e.message
//     );
//   } else {
//     console.log(exchange.id, 'fetchTicker failed with:', e.message);
//   }
//   // if (JSON.parse(response).error) {
//   //   return res.send({ errorMessage: JSON.parse(body).error.message });
//   // }
// }

//   const requestOptions = putResponse({}, '/api/v1/instrument/active', 'GET');
//   request(requestOptions, (error, response, body) => {
//     if (error) {
//       return res.send({ errorMessage: error });
//     }
//     if (JSON.parse(body).error) {
//       return res.send({ errorMessage: JSON.parse(body).error.message });
//     }
//     const instrumentsArray = JSON.parse(body).map(obj => {
//       return obj.symbol;
//     });
//     // console.log(JSON.parse(body), "body");
//     return res.send({ instruments: instrumentsArray });
//   });
// };
// API_KEY = "GAhaeLn6Hmw__7vuNOThm3AE"
// API_SECRET = "dNJMIUA2v0mb-fggdMWNJrocCYHtpmcIXWHi2uQ_qrBQorDv"
// path='order/bulk', postdict={'orders': orders}, verb='POST'

// function orderBulk(orders) {
//   return putResponse(orders, '/api/v1/order/bulk', 'POST');
// }
