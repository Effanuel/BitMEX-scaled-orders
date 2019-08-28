import axios from 'axios';
import {
  // POST_ORDER, //IGNORING LOADERS FOR NOW
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  // PREVIEW_PRICE, //IGNORING LOADERS FOR NOW
  PREVIEW_PRICE_SUCCESS,
  // PREVIEW_ORDERS, //IGNORING LOADERS FOR NOW
  PREVIEW_ORDERS_SUCCESS
} from './actionTypes';
import { orderBulk } from '../../util';

export const postOrder = pay => async dispatch => {
  try {
    // console.log(payload, "post order payload 112");
    const payload = orderBulk(pay);
    const response = await axios.post('/bitmex/postOrder', payload);
    dispatch(postOrderSuccess(response.data));
  } catch (err) {
    dispatch(postOrderError(err.response.data));
  }
};

export const postOrderSuccess = ({ success }) => {
  return {
    type: POST_ORDER_SUCCESS,
    payload: success
  };
};

export const postOrderError = ({ errorMessage }) => {
  return {
    type: POST_ORDER_ERROR,
    payload: errorMessage
  };
};

export const previewPrice = payload => async dispatch => {
  try {
    // console.log(payload, "POAYLOAD PRICE");
    const response = await axios.post('/bitmex/getPrice', payload);
    dispatch(previewPriceSuccess(response.data));
  } catch (err) {
    console.log(err.response.data, 'error previewprice redux');
  }
};

export const previewPriceSuccess = ({ currentPrice }) => {
  return {
    type: PREVIEW_PRICE_SUCCESS,
    payload: currentPrice
  };
};

export const previewOrders = pay => {
  const payload = orderBulk(pay);
  return {
    type: PREVIEW_ORDERS_SUCCESS,
    payload
  };
};
