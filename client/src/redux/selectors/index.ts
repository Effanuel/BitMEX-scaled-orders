/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSelector} from 'reselect';
import {AppState} from '../models/state';
import {SYMBOLS, SIDE} from 'util/BitMEX-types';

export interface CurrentPrice {
  askPrice: number;
  bidPrice: number;
}

export const getShowPreview = ({preview: {showPreview}}: AppState) => showPreview;
export const getOrders = ({preview: {orders}}: AppState) => orders;
const getOrderLoading = ({preview: {loading}}: AppState) => loading;
const getOrderError = ({preview: {error}}: AppState) => error;
export const getBalance = ({preview: {balance}}: AppState) => balance;

export const getWsSymbol = ({websocket: {symbol}}: AppState) => symbol;
export const table_instrument = ({websocket: {instrument}}: AppState) => instrument;
const table_order = ({websocket: {order}}: AppState) => order;
const websocketLoading = ({websocket: {loading}}: AppState) => loading;
const websocketMessage = ({websocket: {message}}: AppState) => message;
const websocketConnected = ({websocket: {connected}}: AppState) => connected;

const getBestOrderStatus = ({best_price: {status}}: AppState) => status;
const getbestOrderID = ({best_price: {bestOrderID}}: AppState) => bestOrderID;
export const getBestOrderSide = ({best_price: {side}}: AppState) => side;

export const bestOrderStatusSelector = createSelector([table_order, getbestOrderID], (open_orders, bestOrderID) => {
  console.log('CALL ORDER STATUS');
  for (const order in open_orders) {
    console.log(open_orders[order]?.orderID, bestOrderID);
    if (open_orders[order]?.orderID === bestOrderID) {
      console.log(open_orders[order].ordStatus, 'STATATATAATUS');
      return open_orders[order].ordStatus;
    }
  }
  return 'Order not placed.';
});

export const bestOrderStatus = createSelector([getBestOrderStatus], (status) => status);

export const websocketBidAskPrices = createSelector([table_instrument, getWsSymbol], (data, symbol):
  | CurrentPrice
  | undefined => {
  for (const i in data) {
    if (data[i].symbol === symbol && data[i].askPrice && data[i].bidPrice) {
      return {
        askPrice: data[i].askPrice,
        bidPrice: data[i].bidPrice,
      };
    }
  }
  return undefined;

  // return 'Loading...';
});

export const websocketCurrentPrice = createSelector([websocketBidAskPrices, getBestOrderSide], (bidAskPrices, side):
  | number
  | undefined => {
  return side === SIDE.SELL ? bidAskPrices?.askPrice : bidAskPrices?.bidPrice;
});

export const ordersAveragePriceSelector = createSelector([getOrders, getShowPreview], (orderObject, previewTable):
  | number
  | void => {
  if (previewTable && orderObject?.orders?.length) {
    const {orders} = orderObject;

    const total_quantity = orders.reduce((total, n) => total + n.orderQty, 0);
    const contract_value = orders.reduce((total, n) => total + n.orderQty / n.price, 0);

    return Math.round((total_quantity / contract_value) * 10_000) / 10_000;
  }
});

export const ordersRiskSelector = createSelector(
  [getOrders, ordersAveragePriceSelector, getShowPreview],
  (orderObject: any = {}, averageEntry, previewTable): number | void => {
    if (previewTable && averageEntry > 0 && averageEntry && orderObject['stop']) {
      let quantity = orderObject.stop.orderQty;
      // 1 contract of ETH is for 0.001 mXBT which is 1e-6 XBT
      if (orderObject.stop['symbol'] === SYMBOLS.ETHUSD) quantity *= 1e-6 * averageEntry ** 2;
      // 1 contract of XRPUSD is for 0.0002 XBT which is 2e-4 XBT
      if (orderObject.stop['symbol'] === SYMBOLS.XRPUSD) quantity *= 2e-4 * averageEntry ** 2;
      const entryValue = quantity / averageEntry;
      const exitValue = quantity / orderObject.stop['stopPx']; // || 1
      return Math.abs(+(entryValue - exitValue).toFixed(5));
    }
  },
);

export const balanceSelector = createSelector([getBalance], (balance): number | void => {
  if (balance) {
    return Math.round((balance / 1e8) * 10000) / 10000;
  }
});

export const ordersRiskPercSelector = createSelector(
  [balanceSelector, ordersRiskSelector],
  (balance: any, risk: any) => {
    if (balance !== 0) return +((risk / balance) * 100).toFixed(2);
    return 0;
  },
);
