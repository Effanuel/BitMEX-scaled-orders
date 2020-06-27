/* eslint-disable */
import {BestPriceState, __CLEAR_BEST_ORDER, BEST_POST_ORDER, BEST_PUT_ORDER} from './types';

import axios from 'axios';
import {amendOrder, Order} from 'util/index';
import {Thunk} from '../../models/state';
import {SIDE} from 'util/BitMEX-types';
import {SUCCESS, REQUEST, FAILURE} from 'redux/helpers/actionHelpers';

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

// ACTIONS
// =====================================

export const createBestOrder = (payload: Order): Thunk => async (dispatch) => {
  try {
    dispatch({type: REQUEST[BEST_POST_ORDER]});

    const response = await axios.post('/bitmex/order', {payload, method: 'POST'});
    const {data, success} = response.data;
    const {text, orderID, price} = JSON.parse(data);

    const params = {success, text, orderID, price, side: payload.side, from: 'Best Order'};
    dispatch({type: SUCCESS[BEST_POST_ORDER], payload: params});
  } catch (err) {
    const payload = err.message.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
    dispatch({type: FAILURE[BEST_POST_ORDER], payload});
  }
};

// TODO
export const amendBestOrder = (price: number): Thunk => async (dispatch, getState) => {
  try {
    dispatch({type: REQUEST[BEST_PUT_ORDER]});

    const {bestOrderID} = getState().best_price;
    const order = amendOrder({orderID: bestOrderID, price});

    const response = await axios.post('/bitmex/order', {order, method: 'PUT'});
    const {data, success} = response.data;
    const {text, orderID} = JSON.parse(data);

    dispatch({type: SUCCESS[BEST_PUT_ORDER], payload: orderID});
  } catch (err) {
    console.log(err, 'PUT::ERR');
    dispatch({type: FAILURE[BEST_PUT_ORDER], payload: {error: 'Error default...'}});
  }
};

export const __clearBestOrder = (): Action => ({
  type: __CLEAR_BEST_ORDER,
});
