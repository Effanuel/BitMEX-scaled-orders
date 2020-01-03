import { createSelector } from "reselect";
import { AppState } from "../models/state";

const getShowPreview = (state: AppState) => state.preview.showPreview;
const getError = (state: AppState) => state.preview.error;
const getOrders = (state: AppState) => state.preview.orders;

const getWsSymbol = (state: AppState) => state.websocket.symbol;
const table_instrument = (state: AppState) => state.websocket.instrument;
const websocketLoading = (state: AppState) => state.websocket.loading;
const websocketMessage = (state: AppState) => state.websocket.message;
const websocketConnected = (state: AppState) => state.websocket.connected;

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

export const errorSelector = createSelector([getError], error => {
  console.log(error);
  return error;
});

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
  (orderList: [], previewTable): number | void => {
    if (previewTable) {
      const total_quantity = orderList.reduce(
        (total: number, n: any): number => total + n.orderQty,
        0
      );
      const contract_value = orderList.reduce(
        (total: number, n: any): number => total + n.orderQty / n.price,
        0
      );
      return Math.round((total_quantity / contract_value) * 2) / 2;
    }
  }
);

export const ordersSelector = createSelector([getOrders], orders => orders);

export const websocketLoadingSelector = createSelector(
  [websocketLoading],
  loading => loading
);

export const websocketConnectedSelector = createSelector(
  [websocketConnected],
  connected => connected
);
