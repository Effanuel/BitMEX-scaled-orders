import { connect, disconnect } from "@giantmachines/redux-websocket";

// import crypto from "crypto";
import * as constants from "./actionTypes";
import { Thunk } from "../models/state";

export const wsTickerChange = (payload: string): WebsocketTickerChange => ({
  type: constants.REDUX_WEBSOCKET_TICKER,
  payload
});

export const wsConnect = (): Thunk => async dispatch => {
  try {
    dispatch(
      connect(
        `wss://www.bitmex.com/realtime?subscribe=instrument:XBTUSD,instrument:ETHUSD`
      )
    );
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

interface WebsocketTickerChange {
  type: constants.REDUX_WEBSOCKET_TICKER;
  payload: any;
}

interface InternalClearMessageLog {
  type: constants.INTERNAL_CLEAR_MESSAGE_LOG;
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
  | WebsocketTickerChange
  | ReduxWebsocketConnect
  | ReduxWebsocketOpen
  | ReduxWebsocketBroken
  | ReduxtWebsocketClosed
  | ReduxWebsocketError
  | ReduxWebsocketSend
  | ReduxWebsocketMessage
  | InternalClearMessageLog;
