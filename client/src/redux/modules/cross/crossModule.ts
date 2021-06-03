import {createReducer} from '@reduxjs/toolkit';
import {createAction, createThunkV2} from 'redux/helpers/actionHelpers';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {CrossState, CREATE_CROSS_ORDER, CLEAR_CROSS_ORDER, CROSS_POST_MARKET_ORDER, ORDER_CROSSED_ONCE} from './types';

export const defaultState: CrossState = {
  crossOrderSymbol: SYMBOL.XBTUSD,
  crossOrderSide: SIDE.SELL,
  crossOrderPrice: 0,
  crossOrderQuantity: 0,
  hasPriceCrossedOnce: false,
};

type CreateCrossOrderPayload = {symbol: SYMBOL; price: number; orderQty: number; side: SIDE};
export const createCrossOrder = createAction<CreateCrossOrderPayload>(CREATE_CROSS_ORDER);
export const clearCrossOrder = createAction(CLEAR_CROSS_ORDER);
export const orderCrossedOnce = createAction(ORDER_CROSSED_ONCE);

export const postMarketCrossOrder = createThunkV2({
  actionName: CROSS_POST_MARKET_ORDER,
  apiMethod: 'marketOrder',
  adaptPayload: (_, getState) => {
    const {crossOrderSymbol, crossOrderQuantity, crossOrderSide} = getState().cross;
    return {symbol: crossOrderSymbol, orderQty: crossOrderQuantity, side: crossOrderSide};
  },
  parseResponse: (data) => data,
});

export const crossReducer = createReducer<CrossState>(defaultState, (builder) =>
  builder
    .addCase(postMarketCrossOrder.fulfilled, () => defaultState)
    .addCase(postMarketCrossOrder.rejected, () => defaultState)
    .addCase(createCrossOrder, (state, {payload}) => {
      state.crossOrderSymbol = payload.symbol;
      state.crossOrderSide = payload.side;
      state.crossOrderPrice = payload.price;
      state.crossOrderQuantity = payload.orderQty;
    })
    .addCase(clearCrossOrder, () => defaultState)
    .addCase(orderCrossedOnce, (state) => {
      state.hasPriceCrossedOnce = true;
    }),
);
