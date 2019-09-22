import { createSelector } from 'reselect';

const getShowPreview = state => state.preview.showPreview;
const getError = state => state.preview.error;
const websocketData = state => state.websocket.data;
const getOrders = state => state.preview.orders;

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
    return data.action === 'insert' ? `$${data.data[0].askPrice}` : '';
  }
);

export const ordersAveragePriceSelector = createSelector(
  [getOrders, getShowPreview],
  (orderList, previewTable) => {
    if (previewTable) {
      const total_quantity = orderList.reduce(
        (total, n) => total + n.orderQty,
        0
      );
      const contract_value = orderList.reduce(
        (total, n) => total + n.orderQty / n.price,
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
