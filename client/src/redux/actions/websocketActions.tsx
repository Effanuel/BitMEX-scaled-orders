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

export const wsLoading = (payload: any): WsLoading => {
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
