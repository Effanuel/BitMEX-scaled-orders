import {createAction, createReducer} from '@reduxjs/toolkit';
import {withPayloadType, createThunk} from 'redux/helpers/actionHelpers';
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
export const createCrossOrder = createAction(CREATE_CROSS_ORDER, withPayloadType<CreateCrossOrderPayload>());
export const clearCrossOrder = createAction(CLEAR_CROSS_ORDER);
export const orderCrossedOnce = createAction(ORDER_CROSSED_ONCE);
export const postMarketCrossOrder = createThunk(CROSS_POST_MARKET_ORDER, 'marketOrder', undefined, ({getState}) => {
  const {crossOrderSymbol, crossOrderQuantity, crossOrderSide} = getState().cross;
  return {symbol: crossOrderSymbol, orderQty: crossOrderQuantity, side: crossOrderSide};
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
      console.log('REDUCER crossed once price');
      state.hasPriceCrossedOnce = true;
    }),
);
