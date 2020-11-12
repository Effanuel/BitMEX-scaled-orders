import {ComponentType} from 'react';
import {REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {AppDriver} from './app-driver';

export function openWebsocket<C extends ComponentType<any>>() {
  return (driver: AppDriver<C>) => {
    driver.store.dispatch({type: REDUX_WEBSOCKET_OPEN});
  };
}

export function sendWebsocketMessage<C extends ComponentType<any>, D>(data: D) {
  return (driver: AppDriver<C>) => {
    const message = JSON.stringify(data);
    driver.store.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message}});
  };
}
