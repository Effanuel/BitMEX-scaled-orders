import { REDUX_WEBSOCKET_LOADING } from './actionTypes';

import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { connect, disconnect, send } from '@giantmachines/redux-websocket';

import * as constants from './actionTypes';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface WsLoading {
  type: constants.REDUX_WEBSOCKET_LOADING;
  payload: any;
}

export type Websocket = WsLoading;

export interface InternalClearMessageLog {
  type: constants.INTERNAL_CLEAR_MESSAGE_LOG;
}
export interface ReduxWebsocketLoading {
  type: constants.REDUX_WEBSOCKET_LOADING;
  payload: any;
}
export interface ReduxWebsocketConnect {
  type: constants.REDUX_WEBSOCKET_CONNECT;
  payload: any;
}
export interface ReduxWebsocketOpen {
  type: constants.REDUX_WEBSOCKET_OPEN;
  payload: any;
}
export interface ReduxWebsocketBroken {
  type: constants.REDUX_WEBSOCKET_BROKEN;
  payload: any;
}
export interface ReduxtWebsocketClosed {
  type: constants.REDUX_WEBSOCKET_CLOSED;
  payload: any;
}
export interface ReduxWebsocketError {
  type: constants.REDUX_WEBSOCKET_ERROR;
  payload: any;
}
export interface ReduxWebsocketSend {
  type: constants.REDUX_WEBSOCKET_SEND;
  payload: any;
}

export interface ReduxWebsocketMessage {
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
  | ReduxWebsocketMessage;

export const wsLoading = (payload?: any): WsLoading => {
  return {
    type: REDUX_WEBSOCKET_LOADING,
    payload
  };
};

export const wsPriceSubscribe = (
  payload: any
): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    dispatch(send({ op: 'subscribe', args: [`quote:${payload || 'XBTUSD'}`] }));
  } catch (err) {
    console.log(err.response.data, 'error previewpriceWS redux');
  }
};

export const wsHandleSubscribeChange = (
  payload: any
): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    const { A, B } = payload;
    dispatch(send({ op: 'unsubscribe', args: [`quote:${A}`] }));
    await sleep(1000);
    dispatch(send({ op: 'subscribe', args: [`quote:${B}`] }));
  } catch (err) {
    console.log(err.response.data, 'error previewpriceWS redux');
  }
};

export const wsConnect = (
  payload: any
): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    dispatch(connect('wss://www.bitmex.com/realtime'));
  } catch (err) {
    console.log(err.response.data, 'error previewpriceWS redux');
  }
};

export const wsDisconnect = (
  payload: any
): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    dispatch(disconnect());
  } catch (err) {
    console.log(err.response.data, 'error previewpriceWS redux');
  }
};
