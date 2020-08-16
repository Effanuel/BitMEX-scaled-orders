/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSelector} from 'reselect';
import {SYMBOLS, SIDE} from '../../util/BitMEX-types';
import {AppState} from 'redux/store';

interface SymbolPrices {
  symbol: SYMBOLS;
  askPrice: number;
  bidPrice: number;
}

export interface CurrentPrice {
  askPrice: number;
  bidPrice: number;
}

export const getShowPreview = ({preview: {showPreview}}: AppState) => showPreview;
export const getOrders = ({preview: {orders}}: AppState) => orders;
const getOrderLoading = ({preview: {previewLoading: loading}}: AppState) => loading;
const getOrderError = ({preview: {error}}: AppState) => error;
export const getBalance = ({preview: {balance}}: AppState) => balance;

export const getWsSymbol = ({websocket: {symbol}}: AppState) => symbol;
export const table_instrument = ({websocket: {instrument}}: AppState) => instrument;
const table_order = ({websocket: {order}}: AppState) => order;
const websocketLoading = ({websocket: {wsLoading: loading}}: AppState) => loading;
const websocketMessage = ({websocket: {message}}: AppState) => message;
const websocketConnected = ({websocket: {connected}}: AppState) => connected;

const getTrailingOrderStatus = ({trailing: {trailOrderStatus}}: AppState) => trailOrderStatus;
export const getTrailingOrderId = ({trailing: {trailOrderId}}: AppState) => trailOrderId;
export const getTrailingOrderSide = ({trailing: {trailOrderSide: side}}: AppState) => side;

export const trailingOrderStatusSelector = createSelector(
  [table_order, getTrailingOrderId],
  (open_orders, trailingOrderId) => {
    console.log('CALL ORDER STATUS', open_orders);

    for (let i = 0; i < open_orders.length; i++) {
      if (open_orders[i].orderID === trailingOrderId) {
        console.log(open_orders[i].ordStatus, 'STATATATAATUS');
        return open_orders[i].ordStatus;
      }
    }
    return 'Order not placed.';
  },
);

export const trailingOrderStatus = createSelector([getTrailingOrderStatus], (status) => status);

export const websocketBidAskPrices = createSelector([table_instrument, getWsSymbol], (data, symbol):
  | CurrentPrice
  | undefined => {
  // console.log(data, 'INCD BID  AASK PRICES DATA');
  for (const dataRow of data) {
    if (dataRow.symbol === symbol && dataRow.askPrice && dataRow.bidPrice) {
      return {
        askPrice: dataRow.askPrice,
        bidPrice: dataRow.bidPrice,
      };
    }
  }
  return undefined;

  // return 'Loading...';
});

export const allWebsocketBidAskPrices = createSelector([table_instrument], (data): SymbolPrices[] | undefined => {
  return data.map(({symbol, askPrice, bidPrice}) => ({symbol: symbol as SYMBOLS, askPrice, bidPrice}));
});

export const websocketCurrentPrice = createSelector(
  [websocketBidAskPrices, getTrailingOrderSide],
  (bidAskPrices, side): number | undefined => {
    return side === SIDE.SELL ? bidAskPrices?.askPrice : bidAskPrices?.bidPrice;
  },
);

export const ordersAverageEntrySelector = createSelector([getOrders, getShowPreview], (orderObject, previewTable):
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
  [getOrders, ordersAverageEntrySelector, getShowPreview],
  (orderObject: any = {}, averageEntry, previewTable): number | undefined => {
    if (previewTable && averageEntry > 0 && averageEntry && orderObject.stop) {
      let {orderQty} = orderObject.stop;
      // 1 contract of ETH is for 0.001 mXBT which is 1e-6 XBT
      if (orderObject.stop.symbol === SYMBOLS.ETHUSD) orderQty *= 1e-6 * averageEntry ** 2;
      // 1 contract of XRPUSD is for 0.0002 XBT which is 2e-4 XBT
      if (orderObject.stop.symbol === SYMBOLS.XRPUSD) orderQty *= 2e-4 * averageEntry ** 2;
      const entryValue = orderQty / averageEntry;
      const exitValue = orderQty / orderObject.stop.stopPx; // || 1
      return Math.abs(+(entryValue - exitValue).toFixed(5));
    }
    return undefined;
  },
);

export const balanceSelector = createSelector([getBalance], (balance): number | null => {
  return balance ? Math.round((balance / 1e8) * 10000) / 10000 : null;
});

export const ordersRiskPercSelector = createSelector(
  [balanceSelector, ordersRiskSelector],
  (balance: number | null, risk: number | undefined): number => {
    return balance !== 0 && balance !== null && risk !== undefined ? +((risk / balance) * 100).toFixed(2) : 0;
  },
);
