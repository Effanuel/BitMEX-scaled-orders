const request = require('request');
const crypto = require('crypto');
const ccxt = require('ccxt');
const testnet = true;

const exchangeId = 'bitmex',
  exchangeClass = ccxt[exchangeId],
  exchange = new exchangeClass({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
    timeout: 30000,
    enableRateLimit: false
  });
if (testnet) {
  exchange.urls['api'] = exchange.urls['test'];
}

function calculateGMT() {
  function formatTime(time) {
    return ('0' + time).slice(-2);
  }
  var d = new Date();

  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  var today = new Date(utc + 3600000 * '0');
  var year = today.getFullYear();
  var month = formatTime(today.getMonth() + 1);
  var day = formatTime(today.getDate());
  var date = year + '-' + month + '-' + day;

  var hour = formatTime(today.getHours());
  var minute = formatTime(today.getMinutes());
  var second = formatTime(today.getSeconds());
  var time = hour + ':' + minute + ':' + second;

  return date + 'T' + time + 'Z';
}

function putResponse(data, path, method) {
  //path_leverage = '/api/v1/position/leverage', //POST /position/leverage
  let expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
  let postBody = JSON.stringify(data);
  let signature = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(method + path + expires + postBody)
    .digest('hex');

  let headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': process.env.API_KEY,
    'api-signature': signature
  };
  //console.log(`https://${true ? "testnet" : "www"}.bitmex.com${path}`);
  return {
    headers: headers,
    url: `https://${
      process.env.TESTNET == 'true' ? 'testnet' : 'www'
    }.bitmex.com${path}`,
    method: method,
    body: postBody
  };
}

function getCurrentPrice(symbol) {
  let send = {
    symbol: symbol,
    endTime: calculateGMT(),
    reverse: true,
    count: 1
  };
  return putResponse(send, '/api/v1/trade', 'GET');
}

function orderBulk(orders) {
  return putResponse(orders, '/api/v1/order/bulk', 'POST');
}

exports.displayPrice = async (req, res, next) => {
  try {
    const response = await exchange.fetchOrderBook('BTC/USD', 1, {
      // this parameter is exchange-specific, all extra params have unique names per exchange
      group: 1 // 1 = orders are grouped by price, 0 = orders are separate
    });
    return res.send({ currentPrice: response.asks[0][0] });
  } catch (error) {
    if (JSON.parse(response).error) {
      return res.send({ errorMessage: JSON.parse(body).error.message });
    }
  }

  // let requestOptions = getCurrentPrice(Object.keys(req.body)[0]);
  // request(requestOptions, function(error, response, body) {
  //   if (error) {
  //     return res.send({ errorMessage: error });
  //   }

  //   if (JSON.parse(body).error) {
  //     return res.send({ errorMessage: JSON.parse(body).error.message });
  //   }
  //   return res.send({ currentPrice: JSON.parse(body)[0].price });
  //   // res.status(204).send(); //if there is no render, res.status is needed
  // });
  // return;
};

exports.postOrder = (req, res, next) => {
  // console.log(req.body, "API post order");
  //  performance.mark('Beginning sanity check') //initial mark for the current URL
  let requestOptions = orderBulk(req.body);
  request(requestOptions, (error, response, body) => {
    if (error) {
      return res.send({ errorMessage: error });
    }
    if (JSON.parse(body).error) {
      return res.send({ errorMessage: JSON.parse(body).error.message });
    }
    return res.send({ success: response.statusCode });
  });
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
