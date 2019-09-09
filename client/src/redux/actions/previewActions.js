import axios from "axios";
import {
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_LOADING,
  // PREVIEW_PRICE, //IGNORING LOADERS FOR NOW
  // PREVIEW_ORDERS, //IGNORING LOADERS FOR NOW
  PREVIEW_ORDERS_SUCCESS
} from "./actionTypes";
import { orderBulk } from "../../util";
/**
 * [Order bulk] action creator
 * @param {Object} pay order details
 * @returns {Object} success response(dispatch action)
 */
export const postOrder = pay => async dispatch => {
  try {
    // console.log(payload, "post order payload 112");
    dispatch(postOrderLoading());
    const payload = orderBulk(pay);
    const response = await axios.post("/bitmex/postOrder", payload);
    dispatch(postOrderSuccess(response.data));
  } catch (err) {
    dispatch(postOrderError(err.response.data));
  }
};

const postOrderLoading = payload => {
  return {
    type: POST_ORDER_LOADING,
    payload
  };
};

/**
 * SUCCESS [Order bulk] action creator
 * @param {number} succcess response of a request
 * @returns {Object} SUCCESS action to reducer
 */
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

/**
 * SUCCESS [Current price of symbol] action creator
 * @param {number} currentPrice of a symbol
 * @returns {Object} SUCCESS action to reducer
 */
export const previewOrders = pay => {
  const payload = orderBulk(pay);
  return {
    type: PREVIEW_ORDERS_SUCCESS,
    payload
  };
};
