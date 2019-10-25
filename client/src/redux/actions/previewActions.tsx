import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import * as constants from './actionTypes';

import axios from 'axios';
import { orderBulk } from '../../util';

// ACTION INTERFACES
export interface PostOrderLoading {
  type: constants.POST_ORDER_LOADING;
}
export interface PostOrderSuccess {
  type: constants.POST_ORDER_SUCCESS;
  payload: any;
}
export interface PostOrderError {
  type: constants.POST_ORDER_ERROR;
  payload: any;
}
export interface PreviewOrdersSuccess {
  type: constants.PREVIEW_ORDERS_SUCCESS;
  payload: any;
}

export type PostOrder =
  | PostOrderLoading
  | PostOrderSuccess
  | PostOrderError
  | PreviewOrdersSuccess;

/**
 * [Order bulk] action creator
 * @param {Object} pay order details
 * @returns {Object} success response(dispatch action)
 */
export const postOrder = (
  pay: any
): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    // console.log(payload, "post order payload 112");
    dispatch(postOrderLoading());
    const payload = orderBulk(pay);
    const response = await axios.post('/bitmex/postOrder', payload);
    dispatch(postOrderSuccess(response.data));
  } catch (err) {
    dispatch(postOrderError(err.response.data));
  }
};

function postOrderLoading(): PostOrderLoading {
  return {
    type: constants.POST_ORDER_LOADING
  };
}

/**
 * SUCCESS [Order bulk] action creator
 * @param {number} succcess response of a request
 * @returns {Object} SUCCESS action to reducer
 */
export function postOrderSuccess(payload: any): PostOrderSuccess {
  return {
    type: constants.POST_ORDER_SUCCESS,
    payload: payload.success
  };
}

export function postOrderError(payload: any): PostOrderError {
  return {
    type: constants.POST_ORDER_ERROR,
    payload: payload.errorMessage
  };
}

/**
 * SUCCESS [Current price of symbol] action creator
 * @param {number} currentPrice of a symbol
 * @returns {Object} SUCCESS action to reducer
 */
export function previewOrders(pay: any): PreviewOrdersSuccess {
  const payload = orderBulk(pay);
  return {
    type: constants.PREVIEW_ORDERS_SUCCESS,
    payload
  };
}
