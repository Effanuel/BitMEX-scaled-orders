import {
  BestPriceState,
  BestPriceActionTypes,
  PostOrder,
  POST_ORDER,
  PUT_ORDER,
  PUT_ORDER_ERROR,
  POST_ORDER_ERROR,
  __CLEAR_BEST_ORDER,
  LOADING,
} from "./types";

import axios from "axios";
import { createOrder } from "util/index";
import { Thunk } from "../../models/state";
import { ActionCreator, Reducer } from "redux";

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

export const best_priceReducer: Reducer<
  BestPriceState,
  BestPriceActionTypes
> = (state: BestPriceState = initialState, action): BestPriceState => {
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

const postOrderReducer: Reducer<BestPriceState, PostOrder> = (
  state: BestPriceState = initialState,
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

type Actions = ActionCreator<BestPriceActionTypes>;

const orderLoading: Actions = () => ({
  type: LOADING,
});

const orderError: Actions = () => ({
  type: LOADING,
});

const postOrderSuccess: Actions = (payload: any) => ({
  type: POST_ORDER,
  payload,
});

const putOrderSuccess: Actions = (payload: any) => ({
  type: PUT_ORDER,
  payload,
});

export const __clearBestOrder: Actions = () => ({
  type: __CLEAR_BEST_ORDER,
});

const putOrderError: Actions = () => ({
  type: PUT_ORDER_ERROR,
});

export const postOrderError: Actions = (payload: any) => ({
  type: POST_ORDER_ERROR,
  payload,
});
