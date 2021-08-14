import {REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {ForgedResponse, Inspector, Step} from 'influnt/dist/types';
import {AppState} from 'redux/modules/state';
import {BasicAPIType} from 'redux/api/api';
import {InfluntExtraArgs} from './influnt';

export function openWebsocket(): Step<InfluntExtraArgs> {
  return ({extraArgs}) => {
    extraArgs.store.dispatch({type: REDUX_WEBSOCKET_OPEN});
  };
}

export function sendWebsocketMessage<D>(data: D): Step<InfluntExtraArgs> {
  return ({extraArgs}) => {
    const message = JSON.stringify(data);
    extraArgs.store.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message}});
  };
}

export function storeActions(): Inspector<string[], InfluntExtraArgs> {
  return ({extraArgs}) => extraArgs.store.getActions().map(({type}) => type);
}

export function history(): Inspector<any, InfluntExtraArgs> {
  return ({extraArgs}) => extraArgs.history?.location.pathname;
}

export function getState<K extends keyof AppState>(
  moduleKey: K,
  key?: keyof AppState[K],
): Inspector<any, InfluntExtraArgs> {
  return ({extraArgs}) => {
    const module = extraArgs.store.getState()[moduleKey];
    return key ? module[key] : module;
  };
}

export function classNameOf(testID: string): Inspector<string | undefined> {
  return ({locateAll}) => locateAll(testID).className;
}

function createDeferredPromise<T>(): [Promise<T>, (value: T) => void] {
  let resolver: (value: T) => void = () => {};
  return [new Promise<T>((resolve) => void (resolver = resolve)), resolver];
}

export function respondBasic<P extends Parameters<BasicAPIType[K]>, K extends keyof BasicAPIType>(
  responseId: K,
  params: Parameters<BasicAPIType[K]> extends void[] ? [undefined] : P,
) {
  return {
    with<R extends RawType<ReturnType<BasicAPIType[K]>>>(response: R): ForgedResponse<P, R> {
      const [promise, resolve] = createDeferredPromise<R>();
      return {
        id: responseId,
        _signature: Symbol(responseId),
        response,
        promise,
        resolve: () => resolve(response),
        //@ts-expect-error
        params,
      };
    },
  };
}
