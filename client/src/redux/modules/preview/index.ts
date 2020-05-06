import {
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_LOADING,
  SHOW_PREVIEW,
  SWITCH_PREVIEW,
  BALANCE_SUCCESS,
  PreviewActions,
  PreviewState,
} from "./types";
import { ActionCreator, Reducer } from "redux";

import axios from "axios";
import { createOrder, orderBulk, createMarketOrder } from "util/index";
import { Thunk } from "../../models/state";

const initialState = {
  orders: {},
  balance: 0,
  error: "",
  showPreview: false,
  loading: false,
};
// Reducer
export const previewReducer: Reducer<PreviewState, PreviewActions> = (
  state = initialState,
  action
) => {
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
      orders.orders.push(orders.stop as any);
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

// const createMarketOrder_ = () => {
//   const createMarketOrderConfig = {
//     init: () => postOrderLoading,
//     onLoad: async (payload: any) => {
//       const order = createMarketOrder(payload);
//       const response = await axios.post("/bitmex/order", {
//         order,
//         method: "POST",
//       });
//       const { data: responseData } = response.data; //success
//       const parsedData = JSON.parse(responseData); //text
//       return { responseData, parsedData };
//     },
//     onSuccess: (responseData: any, parsedData: any) => {
//       const { success } = responseData;
//       const { text } = parsedData;
//       postOrderSuccess({ success, text, from: "MarketOrder" });
//     },
//     onError: (err: any) => {
//       console.log(err, err.message, "MARKET ERROR");
//       return err.message.includes("500")
//         ? postOrderError("Server is offline.")
//         : postOrderError(err.response.data.error);
//     },
//   };
//   dispatchThunkActions(createMarketOrderConfig);
// };

// const dispatchThunkActions = (config: any): Thunk => async (dispatch) => {
//   try {
//     dispatch(config.init());
//     const { responseData, parsedData } = config.onLoad();
//     dispatch(config.onSuccess(responseData, parsedData));
//   } catch (e) {
//     dispatch(config.onError(e));
//   }
// };

export const marketOrder = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(postOrderLoading());
    const order = createMarketOrder(payload);

    const response = await axios.post("/bitmex/order", {
      order,
      method: "POST",
    });
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

type Actions = PreviewActions;

export const previewOrders = (payload: any): Actions => {
  const orders = orderBulk(payload);
  return {
    type: SHOW_PREVIEW,
    payload: orders,
  };
};

export const getBalanceSuccess = (payload: number): Actions => ({
  type: BALANCE_SUCCESS,
  payload,
});

const postOrderLoading = (): Actions => ({
  type: ORDER_LOADING,
});

export const postOrderSuccess = (payload: any): Actions => ({
  type: ORDER_SUCCESS,
  payload,
});

export const postOrderError = (payload: any): Actions => ({
  type: ORDER_ERROR,
  payload: payload || "error",
});

export const previewClose = (): Actions => ({
  type: SWITCH_PREVIEW,
});
