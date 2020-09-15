import {withPayloadType, createThunk} from 'redux/helpers/actionHelpers';
import {createAction, createReducer} from '@reduxjs/toolkit';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';
import {CrossState, CREATE_CROSS_ORDER, CLEAR_CROSS_ORDER, CROSS_POST_MARKET_ORDER, ORDER_CROSSED_ONCE} from './types';
import {MarketOrderProps} from 'util/index';

export const defaultState: CrossState = {
  crossOrderSymbol: SYMBOLS.XBTUSD,
  crossOrderSide: SIDE.SELL,
  crossOrderPrice: 0,
  crossOrderQuantity: 0,
  hasPriceCrossedOnce: false,
};

type CreateCrossOrderPayload = {symbol: SYMBOLS; price: number; orderQty: number; side: SIDE};
export const createCrossOrder = createAction(CREATE_CROSS_ORDER, withPayloadType<CreateCrossOrderPayload>());

export const clearCrossOrder = createAction(CLEAR_CROSS_ORDER);

export const orderCrossedOnce = createAction(ORDER_CROSSED_ONCE);

export const postMarketOrder = createThunk<MarketOrderProps>(CROSS_POST_MARKET_ORDER, 'postMarketOrder');

// cross over buy
// cross under sell

export const crossReducer = createReducer<CrossState>(defaultState, (builder) =>
  builder
    .addCase(postMarketOrder.fulfilled, () => defaultState)
    .addCase(postMarketOrder.rejected, () => defaultState)
    .addCase(createCrossOrder, (state, {payload}: any) => {
      return {
        ...state,
        crossOrderSymbol: payload.symbol,
        crossOrderSide: payload.side,
        crossOrderPrice: payload.price,
        crossOrderQuantity: payload.orderQty,
      };
    })
    .addCase(clearCrossOrder, () => defaultState)
    .addCase(orderCrossedOnce, (state) => {
      state.hasPriceCrossedOnce = true;
    }),
);
