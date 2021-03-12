import {createReducer, createAction} from '@reduxjs/toolkit';
import {withPayloadType, createThunk} from 'redux/helpers/actionHelpers';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {
  TrailingState,
  __CLEAR_TRAILING_ORDER,
  POST_TRAILING_ORDER,
  PUT_TRAILING_ORDER,
  DELETE_TRAILING_ORDER,
  CHANGE_TRAILING_ORDER_SYMBOL,
} from './types';

export const defaultState: TrailingState = {
  trailOrderId: '',
  trailOrderPrice: 0,
  trailOrderStatus: 'Order not placed.',
  trailOrderSide: SIDE.SELL,
  trailOrderSymbol: SYMBOL.XBTUSD,
  trailLoading: false,
};

export const __clearTrailingOrder = createAction(__CLEAR_TRAILING_ORDER);

export const changeTrailingOrderSymbol = createAction(CHANGE_TRAILING_ORDER_SYMBOL, withPayloadType<SYMBOL>());

export const postTrailingOrder = createThunk(POST_TRAILING_ORDER, 'limitOrder', 'side');

export const ammendTrailingOrder = createThunk(PUT_TRAILING_ORDER, 'orderAmend');

export const cancelTrailingOrder = createThunk<any, any>(
  DELETE_TRAILING_ORDER,
  'orderCancel',
  undefined,
  ({getState}) => ({orderID: getState().trailing.trailOrderId}),
);

const postTrailingOrderReducer = (state = defaultState, action: Action): TrailingState => {
  const {text, orderID, price} = action.payload.data;
  const {statusCode, side} = action.payload;

  const isSuccess = statusCode === 200 && text === 'best_order';

  const response = isSuccess
    ? {trailOrderId: orderID, trailOrderStatus: 'Order placed.', trailOrderPrice: price}
    : {trailrderId: '', trailOrderStatus: 'Order cancelled.'};

  return {...state, ...response, trailLoading: false, trailOrderSide: side};
};

export const trailingReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(postTrailingOrder.fulfilled, postTrailingOrderReducer)
    .addCase(postTrailingOrder.rejected, (state) => {
      return {...state, trailLoading: false, trailOrderStatus: 'Order posting error.'};
    })
    .addCase(postTrailingOrder.pending, (state) => {
      state.trailLoading = true;
    })
    .addCase(ammendTrailingOrder.fulfilled, (state, {payload}) => {
      return {...state, trailLoading: false, trailOrderPrice: payload.data.price};
    })
    .addCase(ammendTrailingOrder.rejected, (state) => {
      return {...state, trailLoading: false, trailOrderStatus: 'Order ammending error'};
    })
    .addCase(cancelTrailingOrder.fulfilled, () => defaultState)
    .addCase(cancelTrailingOrder.rejected, () => defaultState)
    .addCase(__clearTrailingOrder, () => defaultState)
    .addCase(changeTrailingOrderSymbol, (state, {payload}) => {
      state.trailOrderSymbol = payload;
    }),
);
