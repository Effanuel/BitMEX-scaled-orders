import {
  POST_ORDER,
  PUT_ORDER,
  PUT_ORDER_ERROR,
  POST_ORDER_ERROR,
  __CLEAR_BEST_ORDER,
  LOADING,
  BestPriceState,
  BestPriceActionTypes,
} from "./types";

import axios from "axios";
import { createOrder } from "util/index";
import { Thunk } from "../../models/state";

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

export const best_priceReducer = (
  state: BestPriceState = initialState,
  action: BestPriceActionTypes
): BestPriceState => {
  switch (action.type) {
    case POST_ORDER:
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

const postOrderReducer = (state: any, action: any) => {
  // Order details:
  const { text, orderID, price, success } = action.payload;
  // if submitted to order book
  // success: successful response
  // best_order_0: check whether it got cancelled or not
  // one of the reasons why it might have been canceled before
  // being caught by a websocket is "post only" option
  console.log("passed post order payload", action.payload);
  return success === 200 && text === "best_order_0"
    ? {
        ...state,
        loading: false,
        bestOrderID: orderID,
        price: price,
        // for websocket subscription to be made
        status: "Order placed.",
      }
    : {
        ...state,
        loading: false,
        // This is the only thing we need from this reducer's <status> state
        status: "Order cancelled.",
      };
};

// ACTIONS
// =====================================

export const post_bestOrder = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(orderLoading());
    const best_order = createOrder(payload);

    const response = await axios.post("/bitmex/order", best_order);
    const { data, success } = response.data;
    const { text, orderID, price } = JSON.parse(data);

    dispatch(
      postOrderSuccess({ success, text, orderID, price, from: "Best Order" })
    );
    // dispatch(send(authKeyExpires("/realtime", "GET")));
    // dispatch(send({ op: "subscribe", args: ["order"] }));
  } catch (err) {
    console.log(err, "ERR");
    err.message.includes("500")
      ? dispatch(postOrderError("Server is offline."))
      : dispatch(postOrderError(err.response.data.error));
  }
};
// TODO
export const put_bestOrder = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(orderLoading());
    const best_order = createOrder(payload);

    const response = await axios.post("/bitmex/order", best_order);
    const { data, success } = response.data;
    const { text, orderID } = JSON.parse(data);

    dispatch(putOrderSuccess({ success, from: text, orderID }));
    // dispatch(send(authKeyExpires("/realtime", "GET")));
    // dispatch(send({ op: "subscribe", args: ["order"] }));
  } catch (err) {
    console.log(err, "PUTERR");
    // if error, cancel the order
    dispatch(putOrderError());

    ///

    //   if (err.message.includes("500")) {
    //     dispatch(postOrderError("Server is offline."));
    //   } else {
    //     dispatch(postOrderError(err.response.data.error));
    //   }
  }
};

const orderLoading = (): BestPriceActionTypes => ({
  type: LOADING,
});

const orderError = (): BestPriceActionTypes => ({
  type: LOADING,
});

const postOrderSuccess = (payload: any): BestPriceActionTypes => ({
  type: POST_ORDER,
  payload,
});

const putOrderSuccess = (payload: any): BestPriceActionTypes => ({
  type: PUT_ORDER,
  payload,
});

export const __clearBestOrder = (): BestPriceActionTypes => ({
  type: __CLEAR_BEST_ORDER,
});

const putOrderError = (): BestPriceActionTypes => ({
  type: PUT_ORDER_ERROR,
});

const postOrderError = (payload: any): BestPriceActionTypes => ({
  type: POST_ORDER_ERROR,
  payload,
});
