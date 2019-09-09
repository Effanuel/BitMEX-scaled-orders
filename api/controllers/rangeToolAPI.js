// const request = require('request');
// const crypto = require('crypto');
const ccxt = require("ccxt");

const exchangeId = "bitmex",
  exchangeClass = ccxt[exchangeId],
  exchange = new exchangeClass({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
    timeout: 30000,
    enableRateLimit: process.env.ENABLE_RATE_LIMIT == "true"
  });
if (process.env.TESTNET == "true") {
  exchange.urls["api"] = exchange.urls["test"];
}

const errorHandling = (e, res) => {
  const errorMessage = JSON.parse(e.message.slice(7)).error.message;

  if (e instanceof ccxt.NetworkError) {
    return res.status(500).json({ errorMessage });
  } else if (e instanceof ccxt.ExchangeError) {
    return res.status(500).json({ errorMessage });
  } else if (e instanceof ccxt.ValidationError) {
    return res.status(500).json({ errorMessage });
  } else {
    return res.status(500).json({ errorMessage: "ERROR" });
  }
};

/**
 * Bulk order POST request to the exchange API
 */
exports.postOrder = async (req, res, next) => {
  try {
    const response = await exchange.privatePostOrderBulk(req.body);
    return res.send({ success: res.statusCode });
  } catch (error) {
    errorHandling(error, res);
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

// function putResponse(data, path, method) {
//   //path_leverage = '/api/v1/position/leverage', //POST /position/leverage
//   let expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
//   let postBody = JSON.stringify(data);
//   let signature = crypto
//     .createHmac('sha256', process.env.API_SECRET)
//     .update(method + path + expires + postBody)
//     .digest('hex');

//   let headers = {
//     'content-type': 'application/json',
//     Accept: 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//     'api-expires': expires,
//     'api-key': process.env.API_KEY,
//     'api-signature': signature
//   };
//   //console.log(`https://${true ? "testnet" : "www"}.bitmex.com${path}`);
//   return {
//     headers: headers,
//     url: `https://${
//       process.env.TESTNET == 'true' ? 'testnet' : 'www'
//     }.bitmex.com${path}`,
//     method: method,
//     body: postBody
//   };
// }

// function orderBulk(orders) {
//   return putResponse(orders, '/api/v1/order/bulk', 'POST');
// }
