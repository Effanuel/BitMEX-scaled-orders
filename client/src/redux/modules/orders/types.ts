import {Order} from 'redux/api/bitmex/types';

export const CANCEL_ORDER = 'orders/CANCEL_ORDER';
export const CANCEL_PROFIT_ORDER = 'orders/CANCEL_PROFIT_ORDER';
export const CANCEL_ALL_ORDERS = 'orders/CANCEL_ALL_ORDERS';
export const CANCEL_ALL_PROFIT_ORDERS = 'orders/CANCEL_ALL_PROFIT_ORDERS';
export const GET_OPEN_ORDERS = 'orders/GET_OPEN_ORDERS';
export const GET_TRADE_HISTORY = 'orders/GET_TRADE_HISTORY';
export const ADD_PROFIT_ORDER = 'orders/ADD_PROFIT_ORDER';
export const REMOVE_PROFIT_ORDER = 'orders/REMOVE_PROFIT_ORDER';

export const ACTIONS_orders = [
  CANCEL_ORDER,
  CANCEL_PROFIT_ORDER,
  CANCEL_ALL_ORDERS,
  CANCEL_ALL_PROFIT_ORDERS,
  GET_OPEN_ORDERS,
  GET_TRADE_HISTORY,
  ADD_PROFIT_ORDER,
  REMOVE_PROFIT_ORDER,
] as const;

export interface OrdersState {
  openOrders: Order[];
  profitOrders: Order[];
  profitOrdersInAction: Order[];
  ordersError: string;
  ordersLoading: boolean;
}
