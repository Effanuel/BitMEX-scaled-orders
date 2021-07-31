import {REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {Inspector, Step} from 'influnt/dist/types';
import {MockedStore} from './mockStore';
import {withStore} from './drivers';
import {AppState} from 'redux/modules/state';

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

export function storeActions(): Inspector<string[], Parameters<typeof withStore>[number]> {
  return ({extraArgs}) => extraArgs.getActions().map(({type}) => type);
}

export function getState<K extends keyof AppState>(
  moduleKey: K,
  key?: keyof AppState[K],
): Inspector<any, Parameters<typeof withStore>[number]> {
  return ({extraArgs}) => {
    const module = extraArgs.getState()[moduleKey];
    return key ? module[key] : module;
  };
}

export function classNameOf(testID: string): Inspector<string | undefined> {
  return ({locateAll}) => locateAll(testID).className;
}
