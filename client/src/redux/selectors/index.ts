import { createSelector } from 'reselect';

import { AppState } from '../models/state';

const getShowPreview = (state: AppState) => state.preview.showPreview;
const getError = (state: AppState) => state.preview.error;
const getOrders = (state: AppState) => state.preview.orders;

const websocketData = (state: AppState) => state.websocket.data;
const websocketLoading = (state: AppState) => state.websocket.loading;
const websocketConnected = (state: AppState) => state.websocket.connected;

export const showPreviewSelector = createSelector(
  [getShowPreview],
  showPreview => showPreview
);

export const errorSelector = createSelector(
  [getError],
  error => error
);

export const websocketDataSelector = createSelector(
  [websocketData],
  data => {
    return data.action === 'insert'
      ? `$${data.data[0].askPrice}`
      : 'Loading...';
  }
);

export const ordersAveragePriceSelector = createSelector(
  [getOrders, getShowPreview],
  (orderList, previewTable): number | void => {
    if (previewTable) {
      const total_quantity = orderList.reduce(
        (total: any, n: any): number => total + n.orderQty,
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

export const ordersSelector = createSelector(
  [getOrders],
  orders => orders
);

export const websocketLoadingSelector = createSelector(
  [websocketLoading],
  loading => loading
);

export const websocketConnectedSelector = createSelector(
  [websocketConnected],
  connected => connected
);
