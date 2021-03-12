import _ from 'lodash';
import {createReducer} from '@reduxjs/toolkit';
import {Order} from 'redux/api/bitmex/types';
import {createThunk} from 'redux/helpers/actionHelpers';
import * as types from './types';

export const cancelOrder = createThunk(types.CANCEL_ORDER, 'orderCancel');
export const cancelAllOrders = createThunk<any, any>(types.CANCEL_ALL_ORDERS, 'orderCancelAll');
export const cancelAllProfitOrders = createThunk(types.CANCEL_ALL_PROFIT_ORDERS, 'orderCancel');
export const getOpenOrders = createThunk<any, any>(types.GET_OPEN_ORDERS, 'getOpenOrders');
export const addProfitTarget = createThunk(types.ADD_PROFIT_ORDER, 'profitTargetOrder', 'orderID');
export const cancelProfitOrder = createThunk(types.REMOVE_PROFIT_ORDER, 'orderCancel', 'orderID');

export const defaultState: types.OrdersState = {
  openOrders: [],
  profitOrders: [],
  profitOrdersInAction: [],
  ordersError: '',
  ordersLoading: false,
};

export const ordersReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(getOpenOrders.pending, (state) => {
      state.ordersLoading = true;
    })
    .addCase(getOpenOrders.fulfilled, (state, {payload}) => {
      const [profitOrders, openOrders] = _.partition(payload.data as Order[], ({text}) => text.includes('profit'));
      const [profitOrdersInAction, openProfitOrders] = _.partition(profitOrders, ({text}) =>
        text.includes('stop price reached\nprofit-target'),
      );

      state.openOrders = openOrders;
      state.profitOrders = openProfitOrders;
      state.profitOrdersInAction = profitOrdersInAction;
      state.ordersLoading = false;
      state.ordersError = '';
    })
    .addCase(getOpenOrders.rejected, (state, {payload}) => {
      state.openOrders = [];
      state.profitOrders = [];
      state.profitOrdersInAction = [];
      state.ordersLoading = false;
      state.ordersError = payload ?? '';
    })
    .addCase(cancelOrder.fulfilled, (state, {payload}) => {
      const orderIDs: string[] = Array.isArray(payload.data.orderID) ? payload.data.orderID : [payload.data.orderID];

      state.openOrders = state.openOrders.filter(({orderID}) => !orderIDs.includes(orderID));
      state.profitOrders = state.profitOrders.filter(({orderID}) => !orderIDs.includes(orderID));
      state.ordersError = '';
    })
    .addCase(cancelOrder.rejected, (state, {payload, meta}) => {
      if (payload === 'Order doesn`t exist')
        // @TODO string might be wrong
        state.openOrders = state.openOrders.filter(({orderID}) => orderID !== meta.arg.orderID);
      state.ordersError = payload ?? '';
    })
    .addCase(cancelAllOrders.fulfilled, () => defaultState)
    .addCase(cancelAllProfitOrders.fulfilled, (state) => {
      state.profitOrders = [];
    })
    .addCase(addProfitTarget.fulfilled, (state, {payload}) => {
      state.profitOrders = [...state.profitOrders, payload.data];
    })
    .addCase(cancelProfitOrder.fulfilled, (state, {payload}) => {
      state.profitOrders = state.profitOrders.filter(({orderID}) => orderID !== payload.data.orderID);
    }),
);
