import {REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {Step} from 'influnt/dist/types';
import {MockedStore} from './mockStore';

export function openWebsocket(): Step<MockedStore> {
  return ({extraArgs}) => {
    extraArgs.dispatch({type: REDUX_WEBSOCKET_OPEN});
  };
}

export function sendWebsocketMessage<D>(data: D): Step<MockedStore> {
  return ({extraArgs}) => {
    const message = JSON.stringify(data);
    extraArgs.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message}});
  };
}
