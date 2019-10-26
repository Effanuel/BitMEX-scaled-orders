import { REDUX_WEBSOCKET_LOADING } from "./actionTypes";


import { connect, disconnect, send } from "@giantmachines/redux-websocket";

import * as constants from "./actionTypes";
import { Thunk } from "../models/state";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const wsLoading = (payload?: object): WsLoading => {
  return {
    type: REDUX_WEBSOCKET_LOADING,
    payload
  };
};

export const wsPriceSubscribe = (payload: string): Thunk => async dispatch => {
  try {
    dispatch(send({ op: "subscribe", args: [`quote:${payload || "XBTUSD"}`] }));
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

export const wsHandleSubscribeChange = (payload: {
  A: string;
  B: string;
}): Thunk => async dispatch => {
  try {
    const { A, B } = payload;
    dispatch(send({ op: "unsubscribe", args: [`quote:${A}`] }));
    await sleep(1000);
    dispatch(send({ op: "subscribe", args: [`quote:${B}`] }));
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

export const wsConnect = (): Thunk => async dispatch => {
  try {
    dispatch(connect("wss://www.bitmex.com/realtime"));
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

export const wsDisconnect = (): Thunk => async dispatch => {
  try {
    dispatch(disconnect());
  } catch (err) {
    console.log(err.response.data, "error previewpriceWS redux");
  }
};

interface WsLoading {
  type: constants.REDUX_WEBSOCKET_LOADING;
  payload: any;
}

interface InternalClearMessageLog {
  type: constants.INTERNAL_CLEAR_MESSAGE_LOG;
  payload: any;
}
interface ReduxWebsocketLoading {
  type: constants.REDUX_WEBSOCKET_LOADING;
  payload: any;
}
interface ReduxWebsocketConnect {
  type: constants.REDUX_WEBSOCKET_CONNECT;
  payload: any;
}
interface ReduxWebsocketOpen {
  type: constants.REDUX_WEBSOCKET_OPEN;
  payload: any;
}
interface ReduxWebsocketBroken {
  type: constants.REDUX_WEBSOCKET_BROKEN;
  payload: any;
}
interface ReduxtWebsocketClosed {
  type: constants.REDUX_WEBSOCKET_CLOSED;
  payload: any;
}
interface ReduxWebsocketError {
  type: constants.REDUX_WEBSOCKET_ERROR;
  payload: any;
}
interface ReduxWebsocketSend {
  type: constants.REDUX_WEBSOCKET_SEND;
  payload: any;
}

interface ReduxWebsocketMessage {
  type: constants.REDUX_WEBSOCKET_MESSAGE;
  payload: any;
}

export type ReduxWebsocket =
  | ReduxWebsocketLoading
  | ReduxWebsocketConnect
  | ReduxWebsocketOpen
  | ReduxWebsocketBroken
  | ReduxtWebsocketClosed
  | ReduxWebsocketError
  | ReduxWebsocketSend
  | ReduxWebsocketMessage
  | InternalClearMessageLog;
