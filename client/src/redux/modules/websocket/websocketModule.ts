import {
  WebsocketResponse,
  WebsocketState,
  RESPONSE_ACTIONS,
  FETCH_ORDERS,
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
  REDUX_WEBSOCKET_ERROR,
  Tables,
  TableData,
} from './types';
import {connect, disconnect, send} from '@giantmachines/redux-websocket';
import {Thunk} from '../state';
import {Reducer} from 'redux';
import {authKeyExpires} from 'utils/auth';
import {SUBSCRIPTION_TOPICS, SYMBOL} from 'redux/api/bitmex/types';
import {websocketBaseUrl, instrumentTopics} from './constants';
import {Instrument, Order} from '../../api/bitmex/types';

export const defaultState: WebsocketState = {
  __keys: {},
  instrument: [],
  order: [],
  connected: false,
  wsLoading: false,
  message: 'Websocket is offline.',
  error: '',
};

export const websocketReducer: Reducer<WebsocketState, any> = (state = defaultState, action): WebsocketState => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {...state, order: {...state.order, ...action.payload}};
    case REDUX_WEBSOCKET_CONNECT:
      return {...state, wsLoading: true, message: 'Connecting...'};
    case REDUX_WEBSOCKET_OPEN:
      return {...state, wsLoading: false, message: 'Websocket opened.', connected: true};
    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {...state, ...defaultState, message: 'Websocket closed.'};
    case REDUX_WEBSOCKET_ERROR:
      return {...state, ...defaultState, message: 'Error. Too many reloads?'};
    case REDUX_WEBSOCKET_MESSAGE:
      return reduxWeboscketMessage(state, action);
    case REDUX_WEBSOCKET_SEND:
    default:
      return state;
  }
};

const reduxWeboscketMessage: Reducer<WebsocketState, any> = (state = defaultState, action): WebsocketState => {
  const response: WebsocketResponse = JSON.parse(action.payload.message);
  const {table, data, action: ws_action, subscribe, status} = response;

  if (subscribe) {
    const message = response['success'] ? 'Successful subscription.' : 'Error while subscribing...';
    return {...state, message};
  } else if (!!status) {
    const message = `Websocket. Status: ${response.status || 'Error'}`;
    return {...state, message};
  } else if (ws_action) {
    switch (ws_action) {
      case RESPONSE_ACTIONS.PARTIAL: {
        const updatedTable = [...state[table], ...data];
        const updatedKeys = {...state.__keys, [table]: response.keys};

        return {...state, [table]: updatedTable, __keys: updatedKeys};
      }
      case RESPONSE_ACTIONS.INSERT: {
        const updatedTable = [...state[table], ...data];

        return {...state, [table]: updatedTable};
      }
      case RESPONSE_ACTIONS.UPDATE: {
        let updatedTable: Instrument[] | Order[] = state[table];
        for (const key_val of data) {
          const indexUpdate = findItemByKeys(state.__keys[table] as any, updatedTable, key_val as any);
          if (indexUpdate === -1) continue;
          const updatedValue: Instrument | Order = {...state[table][indexUpdate], ...key_val};

          updatedTable = [
            ...state[table].slice(0, indexUpdate),
            updatedValue,
            ...state[table].slice(indexUpdate + 1),
          ] as Instrument[] | Order[];

          if (table === 'order') {
            const leavesQty = (updatedValue as Order)?.leavesQty;
            if (typeof leavesQty === 'number' && leavesQty <= 0) {
              updatedTable = state[table].filter((_, i) => i !== indexUpdate);
            }
          }
        }
        return {...state, [table]: updatedTable};
      }
    }
  } else if (!!response?.unsubscribe) {
    const {[response.unsubscribe]: _deleted, ...rest} = state.__keys;
    // eslint-disable-next-line no-console
    console.warn('UNSUBSCRIBED: ', rest, response.unsubscribe);

    return {...state, __keys: rest};
  }
  return state;
};

export const wsConnect = (): Thunk => async (dispatch) => {
  try {
    const url = websocketBaseUrl();
    const subscribe = instrumentTopics(SYMBOL.XBTUSD, SYMBOL.ETHUSD, SYMBOL.XRPUSD);
    dispatch(connect(`${url}${subscribe}`));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response.data, 'wsConnect Error');
  }
};

export const wsDisconnect = (): Thunk => async (dispatch) => {
  try {
    dispatch(disconnect());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response.data, 'wsDisconnect Error');
  }
};

export const wsAuthenticate = (): Thunk => async (dispatch) => {
  try {
    dispatch(send(authKeyExpires('/realtime', 'GET')));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response.data, 'wsAuthenticate error');
  }
};

export const wsSubscribeTo =
  (payload: SUBSCRIPTION_TOPICS): Thunk =>
  async (dispatch) => {
    try {
      dispatch(send({op: 'subscribe', args: [payload]}));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response.data, 'wsSubscribe Error');
    }
  };

// export const wsUnsubscribeFrom = (payload: SUBSCRIPTION_TOPICS): Thunk => async (dispatch) => {
//   try {
//     dispatch(send({op: 'unsubscribe', args: [payload]}));
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.log(err.response.data, 'wsUnsubscribe Error');
//   }
// };

function findItemByKeys(keys: keyof Tables, table: ValueOf<Tables>, matchData: TableData): number {
  for (let index = 0; index < table.length; index++) {
    let matched = true;
    for (const key of keys) {
      if (table[index][key as keyof TableData] !== matchData[key as keyof TableData]) {
        matched = false;
      }
    }
    if (matched) return index;
  }
  return -1;
}
