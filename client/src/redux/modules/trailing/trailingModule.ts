import {createReducer, createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {withPayloadType, createThunk, ThunkApiConfig, formatErrorMessage} from 'redux/helpers/actionHelpers';
import {SIDE, ORD_TYPE, SYMBOLS} from 'util/BitMEX-types';
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
  trailOrderSymbol: SYMBOLS.XBTUSD,
  trailLoading: false,
};

export const __clearTrailingOrder = createAction(__CLEAR_TRAILING_ORDER);

export const changeTrailingOrderSymbol = createAction(CHANGE_TRAILING_ORDER_SYMBOL, withPayloadType<SYMBOLS>());

// @TODO: move to createThunk
export const postTrailingOrder = createAsyncThunk<any, PostTrailingOrderProps, ThunkApiConfig>(
  POST_TRAILING_ORDER,
  async (payload, {rejectWithValue, extra: API}) => {
    try {
      //@ts-ignore
      const response = await API['postTrailingOrder'](payload);
      return {...response, side: payload.side};
    } catch (err) {
      return rejectWithValue(formatErrorMessage(err));
    }
  },
);

type AmmendTrailingOrderProps = {orderID: string; price: number};
export const ammendTrailingOrder = createThunk<AmmendTrailingOrderProps, {price: number}>(
  PUT_TRAILING_ORDER,
  'putTrailingOrder',
);

export const cancelTrailingOrder = createThunk<{orderID: string}>(DELETE_TRAILING_ORDER, 'deleteTrailingOrder');

const postTrailingOrderReducer = (state = defaultState, action: Action): TrailingState => {
  const {text, orderID, price, success, side} = action.payload;
  const isSuccess = success === 200 && text === 'best_order';

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
      return {...state, trailLoading: false, trailOrderPrice: payload.price};
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

export interface PostTrailingOrderProps {
  symbol: SYMBOLS;
  orderQty: number;
  price: number;
  side: SIDE;
  ordType: ORD_TYPE;
  text: string;
}
