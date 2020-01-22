import { createSelector } from "reselect";
import { AppState } from "../models/state";
// PREVIEW ACTIONS
const getShowPreview = (state: AppState) => state.preview.showPreview;
const getOrders = (state: AppState) => state.preview.orders;
const getOrderLoading = (state: AppState) => state.preview.loading;
// WEBSOCKET ACTIONS
const getWsSymbol = (state: AppState) => state.websocket.symbol;
const table_instrument = (state: AppState) => state.websocket.instrument;
const table_order = (state: AppState) => state.websocket.order;
const websocketLoading = (state: AppState) => state.websocket.loading;
const websocketMessage = (state: AppState) => state.websocket.message;
const websocketConnected = (state: AppState) => state.websocket.connected;

export const orderLoadingSelector = createSelector(
  [getOrderLoading],
  loading => loading
);

export const websocketOrder = createSelector([table_order], orders => {
  if (orders[0]) {
    return orders[0].orderID;
  }
});

export const showPreviewSelector = createSelector(
  [getShowPreview],
  showPreview => showPreview
);
export const wsLoadingSelector = createSelector(
  [websocketLoading],
  loading => loading
);
export const messageSelector = createSelector(
  [websocketMessage],
  message => message
);

export const websocketCurrentPrice = createSelector(
  [table_instrument, getWsSymbol],
  (data, symbol) => {
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].symbol === symbol && data[i].askPrice) {
        return `$${data[i].askPrice}`;
      }
    }
    return "Loading...";
  }
);

export const ordersAveragePriceSelector = createSelector(
  [getOrders, getShowPreview],
  (orderList = [], previewTable): number | void => {
    if (previewTable) {
      // We push stop-loss order in /utils distribution functions
      // so we want to exclude it here.

      //
      const total_quantity = orderList.orders.reduce(
        (total: number, n: any): number => total + n.orderQty,
        0
      );
      const contract_value = orderList.orders.reduce(
        (total: number, n: any): number => total + n.orderQty / n.price,
        0
      );
      return Math.round((total_quantity / contract_value) * 2) / 2;
    }
  }
);

export const ordersSelector = createSelector([getOrders], orders => orders);

export const ordersRiskSelector = createSelector(
  [getOrders, ordersAveragePriceSelector, getShowPreview],
  (orderList = {}, averageEntry, previewTable): number | void => {
    if (previewTable && averageEntry > 0 && averageEntry && orderList["stop"]) {
      let quantity = orderList.stop.orderQty;
      // 1 contract of ETH is for 0.01 mXBT which is 1e-6 XBT
      if (orderList.stop["symbol"] === "ETHUSD")
        quantity *= 1e-6 * averageEntry ** 2;
      const entryValue = quantity / averageEntry;
      const exitValue = quantity / orderList.stop["stopPx"] || 1;
      return Math.abs(parseFloat((entryValue - exitValue).toFixed(5)));
    }
  }
);

export const websocketLoadingSelector = createSelector(
  [websocketLoading],
  loading => loading
);

export const websocketConnectedSelector = createSelector(
  [websocketConnected],
  connected => connected
);
