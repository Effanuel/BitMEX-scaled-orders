import { REDUX_WEBSOCKET_LOADING } from "./actionTypes";

import { connect, disconnect, send } from "@giantmachines/redux-websocket";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const wsLoading = payload => {
  return {
    type: REDUX_WEBSOCKET_LOADING,
    payload
  };
};

export const wsPriceSubscribe = payload => async dispatch => {
  try {
    dispatch(send({ op: "subscribe", args: [`quote:${payload || "XBTUSD"}`] }));
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

export const wsHandleSubscribeChange = ({ A, B }) => async dispatch => {
  try {
    dispatch(send({ op: "unsubscribe", args: [`quote:${A}`] }));
    await sleep(1000);
    dispatch(send({ op: "subscribe", args: [`quote:${B}`] }));
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

export const wsConnect = payload => async dispatch => {
  try {
    dispatch(connect("wss://www.bitmex.com/realtime"));
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

export const wsDisconnect = payload => async dispatch => {
  try {
    dispatch(disconnect());
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};
