import * as constants from "./actionTypes";

import axios from "axios";
import { orderBulk } from "../../util";

import { Thunk } from "../models/state";

/**
 * [Order bulk] action creator
 * @param {Object} payload order details
 * @returns {Object} success response(dispatch action)
 */
export const postOrder = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(postOrderLoading());
    let orders = orderBulk(payload);
    orders.orders.push(orders.stop);

    const response = await axios.post("/bitmex/postOrder", orders);
    dispatch(postOrderSuccess(response));
  } catch (err) {
    dispatch(postOrderError(err.response.data.error));
  }
};

const postOrderLoading = (): PostOrderLoading => ({
  type: constants.POST_ORDER_LOADING
});

/**
 * SUCCESS [Order bulk] action creator
 * @param {number} succcess response of a request
 * @returns {Object} SUCCESS action to reducer
 */
export const postOrderSuccess = (payload: any): PostOrderSuccess => ({
  type: constants.POST_ORDER_SUCCESS,
  payload: payload.success
});

export const postOrderError = (payload: any): PostOrderError => ({
  type: constants.POST_ORDER_ERROR,
  payload
});

/**
 * SUCCESS [Current price of symbol] action creator
 * @param {number} currentPrice of a symbol
 * @returns {Object} SUCCESS action to reducer
 */
export const previewOrders = (payload: any): PreviewOrdersSuccess => {
  const orders = orderBulk(payload);
  return {
    type: constants.PREVIEW_ORDERS_SUCCESS,
    payload: orders
  };
};

export const previewClose = (): PreviewOrdersClose => ({
  type: constants.PREVIEW_ORDERS_CLOSE
});

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
  payload: string;
}
export interface PreviewOrdersSuccess {
  type: constants.PREVIEW_ORDERS_SUCCESS;
  payload: any; //{ orders: object[] };
}

export interface PreviewOrdersClose {
  type: constants.PREVIEW_ORDERS_CLOSE;
}

export type PostOrder =
  | PostOrderLoading
  | PostOrderSuccess
  | PostOrderError
  | PreviewOrdersSuccess
  | PreviewOrdersClose;
