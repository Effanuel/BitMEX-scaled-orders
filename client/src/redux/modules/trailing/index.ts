import {createReducer, createAction} from '@reduxjs/toolkit';
import {SUCCESS, REQUEST, FAILURE, callAPI} from 'redux/helpers/actionHelpers';
import {BitMEX_API} from 'redux/helpers/apiHelpers';
import {SIDE, ORD_TYPE, SYMBOLS} from 'util/BitMEX-types';
import {TrailingState, __CLEAR_TRAILING_ORDER, POST_TRAILING_ORDER, PUT_TRAILING_ORDER} from './types';

export const defaultState: TrailingState = {
  trailOrderId: '',
  trailOrderPrice: 0,
  trailOrderStatus: 'Order not placed.',
  trailOrderSide: SIDE.SELL,
  trailLoading: false,
};

export const __clearTrailingOrder = createAction(__CLEAR_TRAILING_ORDER);

export const trailingReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(SUCCESS[POST_TRAILING_ORDER], (state, action) => postTrailingOrderReducer(state, action))
    .addCase(SUCCESS[PUT_TRAILING_ORDER], (state, {payload}) => {
      return {...state, trailLoading: false, trailOrderPrice: payload.price};
    })
    .addCase(FAILURE[POST_TRAILING_ORDER], (state) => {
      return {...state, trailLoading: false, trailOrderStatus: 'Order posting error.'};
    })
    .addCase(FAILURE[PUT_TRAILING_ORDER], (state) => {
      return {...state, trailLoading: false, trailOrderStatus: 'Order ammending error'};
    })
    .addCase(REQUEST[POST_TRAILING_ORDER], (state) => {
      state.trailLoading = true;
    })
    // .addCase(REQUEST[PUT_TRAILING_ORDER], (state) => {
    //   state.loading = true;
    // })
    .addCase(__clearTrailingOrder, () => defaultState),
);

const postTrailingOrderReducer = (state = defaultState, action: Action): TrailingState => {
  console.log('reducer', state, action);
  const {text, orderID, price, success, side} = action.payload;
  console.log(text, success, '---------------------------------');
  const isSuccess = success === 200 && text === 'best_order';

  const response = isSuccess
    ? {trailOrderId: orderID, trailOrderStatus: 'Order placed.', trailOrderPrice: price}
    : {trailrderId: '', trailOrderStatus: 'Order cancelled.'};
  return {...state, ...response, trailLoading: false, trailOrderSide: side};
};

const API = new BitMEX_API();

export interface PostTrailingOrderProps {
  symbol: SYMBOLS;
  orderQty: number;
  price: number;
  side: SIDE;
  ordType: ORD_TYPE;
  text: string;
}

export const postTrailingOrder = (props: PostTrailingOrderProps) =>
  callAPI(POST_TRAILING_ORDER, API.postTrailingOrder, props, {side: props.side});

export const ammendTrailingOrder = (props: {orderID: string; price: number}) =>
  callAPI(PUT_TRAILING_ORDER, API.putTrailingOrder, props, {});
