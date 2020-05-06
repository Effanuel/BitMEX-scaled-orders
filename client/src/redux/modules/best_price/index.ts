import {
  BestPriceState,
  BestPriceActions,
  PostOrder,
  POST_ORDER,
  PUT_ORDER,
  PUT_ORDER_ERROR,
  POST_ORDER_ERROR,
  __CLEAR_BEST_ORDER,
  LOADING,
} from "./types";

import axios from "axios";
import { createOrder, amendOrder } from "util/index";
import { Thunk } from "../../models/state";
import { Reducer } from "redux";

const initialState = {
  bestOrderID: "",
  price: 0,
  limit: 50,
  // status of the submission of the order
  // since websocket doesn't handle that
  status: "Order not placed.",
  //
  loading: false,
};

export const best_priceReducer: Reducer<BestPriceState, BestPriceActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case POST_ORDER: //todo rename to post order success
      return postOrderReducer(state, action);
    case PUT_ORDER:
      return { ...state, loading: false, price: action.payload.price };
    case __CLEAR_BEST_ORDER:
      //un subscribe
      return initialState;
    case POST_ORDER_ERROR:
      //cancel order
      return { ...state, status: "Order ammending error." };
    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

const postOrderReducer: Reducer<BestPriceState, PostOrder> = (
  state = initialState,
  action
) => {
  // Order details:
  const { text, orderID, price, success } = action.payload;

  const isSuccess = success === 200 && text === "best_order_0";
  const response = isSuccess
    ? { bestOrderID: orderID, price, status: "Order placed." }
    : { bestOrderID: "", status: "Order cancelled." };
  return { ...state, ...response, loading: false };
};
// ACTIONS
// =====================================

export const createBestOrder = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(orderLoading());
    const order = createOrder(payload);

    const response = await axios.post("/bitmex/order", {
      order,
      method: "POST",
    });
    const { data, success } = response.data;
    const { text, orderID, price } = JSON.parse(data);

    dispatch(
      postOrderSuccess({ success, text, orderID, price, from: "Best Order" })
    );
  } catch (err) {
    console.log(err, "ERR");
    err.message.includes("500")
      ? dispatch(postOrderError("Server is offline."))
      : dispatch(postOrderError(err.response.data.error));
  }
};
// TODO
export const amendBestOrder = (price: number): Thunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(orderLoading());
    const { bestOrderID } = getState().best_price;
    const best_order = amendOrder({ orderID: bestOrderID, price });

    const response = await axios.post("/bitmex/order", {
      order: best_order,
      method: "PUT",
    });
    const { data, success } = response.data;
    const { text, orderID } = JSON.parse(data);

    dispatch(putOrderSuccess({ orderID }));
  } catch (err) {
    console.log(err, "PUTERR");
    // if error, cancel the order
    dispatch(putOrderError("a"));

    ///

    //   if (err.message.includes("500")) {
    //     dispatch(postOrderError("Server is offline."));
    //   } else {
    //     dispatch(postOrderError(err.response.data.error));
    //   }
  }
};

type Actions = BestPriceActions;

export const orderLoading = (): Actions => ({
  type: LOADING,
});

const orderError = (): Actions => ({
  type: LOADING,
});

export const postOrderSuccess = (payload: any): Actions => ({
  type: POST_ORDER,
  payload,
});

const putOrderSuccess = (payload: any): Actions => ({
  type: PUT_ORDER,
  payload,
});

export const __clearBestOrder = (): Actions => ({
  type: __CLEAR_BEST_ORDER,
});

const putOrderError = (payload: any): Actions => ({
  type: PUT_ORDER_ERROR,
  payload,
});

export const postOrderError = (payload: any): Actions => ({
  type: POST_ORDER_ERROR,
  payload,
});
