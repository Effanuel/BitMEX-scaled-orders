/* eslint-disable */
import {BestPriceState, __CLEAR_BEST_ORDER, BEST_POST_ORDER, BEST_PUT_ORDER} from './types';

import {amendOrder, createOrder} from 'util/index';
import {Thunk} from '../../models/state';
import {SIDE, ORD_TYPE, SYMBOLS} from 'util/BitMEX-types';
import {SUCCESS, REQUEST, FAILURE, callAPI} from 'redux/helpers/actionHelpers';

const defaultState: BestPriceState = {
  bestOrderID: '',
  price: 0,
  limit: 50,
  status: 'Order not placed.',
  side: SIDE.SELL,
  loading: false,
};

export const best_priceReducer = (state = defaultState, action: any): BestPriceState => {
  switch (action.type) {
    case SUCCESS[BEST_POST_ORDER]:
      return postOrderReducer(state, action);
    case SUCCESS[BEST_PUT_ORDER]:
      return {...state, loading: false, price: action.payload.price};
    case __CLEAR_BEST_ORDER:
      //un subscribe
      return defaultState;
    case FAILURE[BEST_POST_ORDER]:
    case FAILURE[BEST_PUT_ORDER]:
      //cancel order
      return {...state, status: 'Order ammending error.'};
    case REQUEST[BEST_PUT_ORDER]:
    case REQUEST[BEST_POST_ORDER]:
      return {...state, loading: true};
    default:
      return state;
  }
};

const postOrderReducer = (state = defaultState, action: Action): BestPriceState => {
  const {text, orderID, price, success, side} = action.payload;
  const isSuccess = success === 200 && text === 'best_order_0';

  const response = isSuccess
    ? {bestOrderID: orderID, price, status: 'Order placed.'}
    : {bestOrderID: '', status: 'Order cancelled.'};
  return {...state, ...response, loading: false, side};
};

interface CreateBestOrderPayload {
  symbol: SYMBOLS;
  orderQty: number;
  price: number;
  side: SIDE;
  ordType: ORD_TYPE;
  text_prefix: string;
}

export const createBestOrder = (props: CreateBestOrderPayload): Thunk => {
  const order = createOrder(props);
  const moreData = {side: order.side, from: 'Best Order'};
  const payload = {order, method: 'POST'};
  return callAPI(BEST_POST_ORDER, payload, '/bitmex/order', ['orderID', 'price'], moreData);
};

export const amendBestOrder = (price: number, bestOrderID: string): Thunk => {
  const order = amendOrder({orderID: bestOrderID, price});
  const payload = {order, method: 'PUT'};
  return callAPI(BEST_PUT_ORDER, payload, '/bitmex/order', ['price']);
};

// TODO
// export const amendBestOrder = (price: number): Thunk => async (dispatch, getState) => {
//   try {
//     dispatch({type: REQUEST[BEST_PUT_ORDER]});

//     const {bestOrderID} = getState().best_price;
//     const order = amendOrder({orderID: bestOrderID, price});

//     const response = await axios.post('/bitmex/order', {order, method: 'PUT'});
//     const {data, success} = response.data;
//     const {text, orderID} = JSON.parse(data);

//     dispatch({type: SUCCESS[BEST_PUT_ORDER], payload: orderID});
//   } catch (err) {
//     console.log(err, 'PUT::ERR');
//     dispatch({type: FAILURE[BEST_PUT_ORDER], payload: {error: 'Error default...'}});
//   }
// };

export const __clearBestOrder = (): Action => ({
  type: __CLEAR_BEST_ORDER,
});
