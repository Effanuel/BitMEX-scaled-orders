import {withPayloadType, ThunkApiConfig} from 'redux/helpers/actionHelpers';
import {AsyncThunk, createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';
import {CrossState, CREATE_CROSS_ORDER, CLEAR_CROSS_ORDER, CROSS_POST_MARKET_ORDER, ORDER_CROSSED_ONCE} from './types';

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

export const postMarketOrder: AsyncThunk<any, any, ThunkApiConfig> = createAsyncThunk(
  CROSS_POST_MARKET_ORDER,
  async (_payload, {rejectWithValue, extra: API, getState}) => {
    try {
      const apiMethod = 'postMarketOrder';
      const {crossOrderSymbol, crossOrderQuantity, crossOrderSide} = getState().cross;
      const payload = {symbol: crossOrderSymbol, orderQty: crossOrderQuantity, side: crossOrderSide};

      return await API[apiMethod](payload);
    } catch (err) {
      const payload: string = err.message?.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
      return rejectWithValue(payload);
    }
  },
);

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
