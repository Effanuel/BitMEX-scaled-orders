import axios from 'axios';
import {createScaledOrders, ScaledOrdersProps, ScaledOrders} from 'util/index';

import {SUCCESS, FAILURE, REQUEST} from 'redux/helpers/actionHelpers';
import {SHOW_PREVIEW, SWITCH_PREVIEW, PreviewState, PREVIEW_POST_ORDER, GET_BALANCE} from './types';
import {Thunk} from '../../models/state';

const defaultState = {
  orders: {orders: [], stop: {}},
  balance: 0,
  showPreview: false,
  loading: false,
  error: '',
};

export const previewReducer = (state = defaultState, {type, payload}: Action): PreviewState => {
  switch (type) {
    case SUCCESS[PREVIEW_POST_ORDER]:
      return {
        ...state,
        orders: defaultState.orders,
        showPreview: false,
        loading: false,
        error: '',
      };
    case SUCCESS[GET_BALANCE]:
      return {
        ...state,
        balance: payload,
      };
    case FAILURE[GET_BALANCE]:
    case FAILURE[PREVIEW_POST_ORDER]:
      return {
        ...state,
        orders: defaultState.orders,
        showPreview: false,
        loading: false,
        error: payload,
      };
    case REQUEST[PREVIEW_POST_ORDER]:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SHOW_PREVIEW:
      return {
        ...state,
        orders: payload,
        showPreview: true,
        error: '',
      };
    case SWITCH_PREVIEW:
      return {
        ...state,
        showPreview: !state.showPreview,
        error: '',
      };
    default:
      return state;
  }
};

// Actions
// ==============================

export const scaledOrders = (payload: ScaledOrders): Thunk => async (dispatch) => {
  try {
    dispatch({type: REQUEST[PREVIEW_POST_ORDER]});

    const response = await axios.post('/bitmex/bulkOrders', payload);
    const {success} = response.data;

    dispatch({type: SUCCESS[PREVIEW_POST_ORDER], payload: {success, text: 'text', from: 'Scaled_orders'}});
  } catch (err) {
    const payload = err.message.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
    dispatch({type: FAILURE[PREVIEW_POST_ORDER], payload});
  }
};

export const getBalance = (): Thunk => async (dispatch) => {
  try {
    const response = await axios.post('/bitmex/getBalance');
    const {data} = response.data;
    const {walletBalance} = JSON.parse(data);

    dispatch({type: SUCCESS[GET_BALANCE], payload: walletBalance});
  } catch (err) {
    const payload = err.message.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
    dispatch({type: FAILURE[GET_BALANCE], payload});
  }
};

export const marketOrder = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch({type: REQUEST[PREVIEW_POST_ORDER]});

    const response = await axios.post('/bitmex/order', {payload, method: 'POST'});
    const {data, success} = response.data;
    const {text} = JSON.parse(data);

    dispatch({type: SUCCESS[PREVIEW_POST_ORDER], payload: {success, text, from: 'MarketOrder'}});
  } catch (err) {
    const payload = err.message.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
    dispatch({type: FAILURE[PREVIEW_POST_ORDER], payload});
  }
};

export const previewOrders = (payload: ScaledOrdersProps): Action => previewShow(createScaledOrders(payload));

export const previewToggle = (): Action => ({
  type: SWITCH_PREVIEW,
});

const previewShow = (payload: ScaledOrders): Action => ({
  type: SHOW_PREVIEW,
  payload,
});
