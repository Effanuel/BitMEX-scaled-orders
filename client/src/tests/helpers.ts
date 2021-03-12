import {REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {Wrench} from 'tests/wrench/Wrench';

export function openWebsocket() {
  return (driver: Wrench<{}>) => {
    //@ts-ignore
    driver.context.internalContext.store.dispatch({type: REDUX_WEBSOCKET_OPEN});
  };
}

export function sendWebsocketMessage<D>(data: D) {
  return (driver: Wrench<{}>) => {
    const message = JSON.stringify(data);
    //@ts-ignore
    driver.context.internalContext.store.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message}});
  };
}
