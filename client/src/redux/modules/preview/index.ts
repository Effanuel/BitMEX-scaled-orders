import {
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_LOADING,
  SHOW_PREVIEW,
  SWITCH_PREVIEW,
  BALANCE_SUCCESS,
  PreviewActionTypes,
  PreviewState,
} from "./types";

import axios from "axios";
import { order, orderBulk, marketOrder } from "util/index";
import { Thunk } from "../../models/state";

const initialState = {
  orders: [],
  balance: 0,
  error: "",
  showPreview: false,
  loading: false,
};
// Reducer
export const previewReducer = (
  state: PreviewState = initialState,
  action: PreviewActionTypes
): PreviewState => {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        showPreview: false,
        error: "",
        orders: [],
        loading: false,
      };
    case BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload,
      };
    case ORDER_ERROR:
      return {
        ...state,
        showPreview: false,
        orders: [],
        error: action.payload,
        loading: false,
      };
    case SHOW_PREVIEW:
      return {
        ...state,
        orders: action.payload,
        showPreview: true,
        error: "",
      };
    case SWITCH_PREVIEW:
      return {
        ...state,
        showPreview: !state.showPreview,
        error: "",
      };
    default:
      return state;
  }
};

// Actions
// ==============================

/**
 * [Order bulk] action creator
 * @param {Object} payload order details
 * @returns {Object} success response(dispatch action)
 */
export const scaledOrders = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(postOrderLoading());
    let orders = orderBulk(payload);

    if (payload.stop && payload.stop !== "") {
      orders.orders.push(orders.stop);
    }
    console.log("order");

    const response = await axios.post("/bitmex/bulkOrders", orders);
    const { success } = response.data;
    console.log("SCALED ORDERS>>>", response);
    //success, text, orderID, price
    dispatch(postOrderSuccess({ success, from: "Scaled_orders" }));
  } catch (err) {
    err.message.includes("500")
      ? dispatch(postOrderError("Server is offline."))
      : dispatch(postOrderError(err.response.data.error));
  }
};

/**
 * [Get Balance] action creator
 * @returns {Object} success response(dispatch action)
 */
export const getBalance = (): Thunk => async (dispatch) => {
  try {
    const response = await axios.post("/bitmex/getBalance");
    const { data } = response.data;
    const { walletBalance } = JSON.parse(data);
    dispatch(getBalanceSuccess(walletBalance));
  } catch (err) {
    err.message.includes("500")
      ? dispatch(postOrderError("Server is offline."))
      : dispatch(postOrderError(err.response.data.error));
  }
};

export const marketOrder = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(postOrderLoading());
    const order = marketOrder(payload);

    const response = await axios.post("/bitmex/order", order);
    const { data, success } = response.data;
    const { text } = JSON.parse(data);

    dispatch(postOrderSuccess({ success, text, from: "MarketOrder" }));
  } catch (err) {
    console.log(err, err.message, "MARKET ERROR");
    err.message.includes("500")
      ? dispatch(postOrderError("Server is offline."))
      : dispatch(postOrderError(err.response.data.error));
  }
};

/**
 * SUCCESS [Current price of symbol] action creator
 * @param {number} currentPrice of a symbol
 * @returns {Object} SUCCESS action to reducer
 */
export const previewOrders = (payload: any): PreviewActionTypes => {
  const orders = orderBulk(payload);
  return {
    type: SHOW_PREVIEW,
    payload: orders,
  };
};

export const getBalanceSuccess = (payload: number): PreviewActionTypes => ({
  type: BALANCE_SUCCESS,
  payload,
});

const postOrderLoading = (): PreviewActionTypes => ({
  type: ORDER_LOADING,
});

const postOrderSuccess = (payload: any): PreviewActionTypes => ({
  type: ORDER_SUCCESS,
  payload,
});

const postOrderError = (payload: any): PreviewActionTypes => ({
  type: ORDER_ERROR,
  payload: payload || "error",
});

export const previewClose = (): PreviewActionTypes => ({
  type: SWITCH_PREVIEW,
});
