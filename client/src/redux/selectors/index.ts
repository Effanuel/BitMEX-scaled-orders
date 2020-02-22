import { createSelector } from "reselect";
import { AppState } from "../models/state";
// PREVIEW ACTIONS
const getShowPreview = (state: AppState) => state.preview.showPreview;
const getOrders = (state: AppState) => state.preview.orders;
const getOrderLoading = (state: AppState) => state.preview.loading;
const getOrderError = (state: AppState) => state.preview.error;
const getBalance = (state: AppState) => state.preview.balance;
const getMessage = (state: AppState) => state.preview.message;
// WEBSOCKET ACTIONS
const getWsSymbol = (state: AppState) => state.websocket.symbol;
const table_instrument = (state: AppState) => state.websocket.instrument;
// const table_order = (state: AppState) => state.websocket.order;
const websocketLoading = (state: AppState) => state.websocket.loading;
const websocketMessage = (state: AppState) => state.websocket.message;
const websocketConnected = (state: AppState) => state.websocket.connected;
//==============================================
// For later versions :)
// export const websocketOrder = createSelector([table_order], orders => {
//   if (orders[0]) {
//     return orders[0].orderID;
//   }
// });

/**
 * Calculates ask price of the selected ticker
 * @param {object} data
 * @param {string} symbol
 * @returns {number} ask price
 */
export const websocketCurrentPrice = createSelector(
  [table_instrument, getWsSymbol],
  (data, symbol): any => {
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].symbol === symbol && data[i].askPrice) {
        return `$${data[i].askPrice}`;
      }
    }
    return "Loading...";
  }
);

/**
 * Calculates averae price of scaled orders
 * @param {array} orderList list of orders
 * @param {boolean} previewTable is preview table open
 * @returns {number} average price
 */
export const ordersAveragePriceSelector = createSelector(
  [getOrders, getShowPreview],
  (orderList = [], previewTable): number | void => {
    if (previewTable && orderList) {
      // We push stop-loss order in /utils distribution functions
      // so we want to exclude it here.

      const total_quantity = orderList.orders.reduce(
        (total: number, n: any): number => total + n.orderQty,
        0
      );
      const contract_value = orderList.orders.reduce(
        (total: number, n: any): number => total + n.orderQty / n.price,
        0
      );
      // Divide by 10,000 so that ordersRiskSelector calculated risk more accurately
      return Math.round((total_quantity / contract_value) * 10000) / 10000;
    }
  }
);

/**
 * Calculates risk in XBT
 * @param {object} orderList list of orders
 * @param {number} averageEntry average entry of scaled orders
 * @param {boolean} previewTable is preview table open
 * @returns {number} risk in XBT if stop-loss was hit
 */
export const ordersRiskSelector = createSelector(
  [getOrders, ordersAveragePriceSelector, getShowPreview],
  (orderList = {}, averageEntry, previewTable): number | void => {
    if (previewTable && averageEntry > 0 && averageEntry && orderList["stop"]) {
      let quantity = orderList.stop.orderQty;
      // 1 contract of ETH is for 0.001 mXBT which is 1e-6 XBT
      if (orderList.stop["symbol"] === "ETHUSD")
        quantity *= 1e-6 * averageEntry ** 2;
      // 1 contract of XRPUSD is for 0.0002 XBT which is 2e-4 XBT
      if (orderList.stop["symbol"] === "XRPUSD")
        quantity *= 2e-4 * averageEntry ** 2;
      const entryValue = quantity / averageEntry;
      const exitValue = quantity / orderList.stop["stopPx"] || 1;
      return Math.abs(+(entryValue - exitValue).toFixed(5));
    }
  }
);

/**
 * Reformats fetched balance
 * @param {number} balance fetched balance in satoshis??
 * @returns {number} reformated balance in XBT
 */
export const balanceSelector = createSelector([getBalance], (balance):
  | number
  | void => {
  if (balance) {
    return +(balance / 1e8).toFixed(4);
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
  }
);

//================================
// SIMPLE EXPORTED SELECTORS
//================================

//WEBSOCKET SELECTORS
export const websocketLoadingSelector = createSelector(
  [websocketLoading],
  loading => loading
);
export const websocketConnectedSelector = createSelector(
  [websocketConnected],
  connected => connected
);
export const wsLoadingSelector = createSelector(
  [websocketLoading],
  loading => loading
);
export const messageSelector = createSelector(
  [websocketMessage],
  message => message
);

// PREVIEW SELECTORS
export const ordersSelector = createSelector([getOrders], orders => orders);

export const orderErrorSelector = createSelector(
  [getOrderError],
  error => error
);
export const orderLoadingSelector = createSelector(
  [getOrderLoading],
  loading => loading
);
export const showPreviewSelector = createSelector(
  [getShowPreview],
  showPreview => showPreview
);

export const previewMessageSelector = createSelector(
  [getMessage],
  message => message
);
