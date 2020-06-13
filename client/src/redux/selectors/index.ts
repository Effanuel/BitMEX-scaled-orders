/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';
import { AppState } from '../models/state';
import { SYMBOLS } from 'util/BitMEX-types';
// PREVIEW ACTIONS
export const getShowPreview = (state: AppState) => state.preview.showPreview;
export const getOrders = (state: AppState) => state.preview.orders;
const getOrderLoading = (state: AppState) => state.preview.loading;
const getOrderError = (state: AppState) => state.preview.error;
export const getBalance = (state: AppState) => state.preview.balance;
// const getMessage = (state: AppState) => state.preview.message; // this is object
// WEBSOCKET ACTIONS
export const getWsSymbol = (state: AppState) => state.websocket.symbol;
export const table_instrument = (state: AppState) => state.websocket.instrument;
const table_order = (state: AppState) => state.websocket.order;
const websocketLoading = (state: AppState) => state.websocket.loading;
const websocketMessage = (state: AppState) => state.websocket.message;
const websocketConnected = (state: AppState) => state.websocket.connected;
// BEST_PRICE ACTIONS
const getBestOrderStatus = (state: AppState) => state.best_price.status;
const getbestOrderID = (state: AppState) => state.best_price.bestOrderID;

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

//==============================================
// For later versions :)
// export const websocketOrder = createSelector([table_order], orders => {
//   if (orders[0]) {
//     return orders[0].orderID;
//   }
// });

export interface CurrentPrice {
  askPrice: number;
  bidPrice: number;
}

/**
 * Calculates ask price of the selected ticker
 * @param {object} data
 * @param {string} symbol
 * @returns {number} ask price
 */
export const websocketCurrentPrice = createSelector([table_instrument, getWsSymbol], (data, symbol):
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

/**
 * Calculates averae price of scaled orders
 * @param {array} orderList list of orders
 * @param {boolean} previewTable is preview table open
 * @returns {number} average price
 */
export const ordersAveragePriceSelector = createSelector([getOrders, getShowPreview], (orderObject, previewTable):
  | number
  | void => {
  if (previewTable && orderObject?.orders?.length) {
    // We push stop-loss order in /utils distribution functions
    // so we want to exclude it here.
    const { orders } = orderObject;

    const total_quantity = orders.reduce((total, n) => total + n.orderQty, 0);
    const contract_value = orders.reduce((total, n) => total + n.orderQty / n.price, 0);

    // Divide by 10,000 so that ordersRiskSelector calculated risk more accurately
    return Math.round((total_quantity / contract_value) * 10_000) / 10_000;
  }
});

/**
 * Calculates risk in XBT
 * @param {object} orderList list of orders
 * @param {number} averageEntry average entry of scaled orders
 * @param {boolean} previewTable is preview table open
 * @returns {number} risk in XBT if stop-loss was hit
 */
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

/**
 * Reformats fetched balance
 * @param {number} balance fetched balance in satoshis??
 * @returns {number} reformated balance in XBT
 */
export const balanceSelector = createSelector([getBalance], (balance): number | void => {
  if (balance) {
    return Math.round((balance / 1e8) * 10000) / 10000;
  }
});

/**
 * Calculates risk in percentages
 * @param {number} balance balance of the account
 * @param {number} risk risk in XBT if stop-loss was hit
 * @returns {number} risk in percentages
 */
export const ordersRiskPercSelector = createSelector(
  [balanceSelector, ordersRiskSelector],
  (balance: any, risk: any) => {
    if (balance !== 0) return +((risk / balance) * 100).toFixed(2);
    return 0;
  },
);
