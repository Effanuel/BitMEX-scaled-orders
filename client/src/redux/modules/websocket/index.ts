import {
  WebsocketResponse,
  WebsocketActions,
  WebsocketState,
  ReduxWebsocketMessage,
  ResponseActions,
  FETCH_ORDERS,
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
  REDUX_WEBSOCKET_ERROR,
  REDUX_WEBSOCKET_TICKER,
} from './types';
import axios from 'axios';
import {connect, disconnect, send} from '@giantmachines/redux-websocket';
import {Thunk} from '../../models/state';
import {Reducer} from 'redux';
import {authKeyExpires} from 'util/auth';
import {SUBSCRIPTION_TOPICS, SYMBOLS} from 'util/BitMEX-types';

const initialState: WebsocketState = {
  __keys: {},
  instrument: {},
  trade: {},
  order: {},
  connected: false,
  loading: false,
  message: 'Websocket is offline.',
  error: '',
  symbol: SYMBOLS.XBTUSD,
};

export const websocketReducer: Reducer<WebsocketState, WebsocketActions> = (
  state = initialState,
  action,
): WebsocketState => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        order: {...state.order, ...action.payload},
      };
    case REDUX_WEBSOCKET_TICKER:
      return {
        ...state,
        symbol: action.payload,
      };
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        loading: true,
        message: 'Connecting...',
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        loading: false,
        message: 'Websocket opened.',
        connected: true,
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        ...initialState,
        message: 'Websocket closed.',
      };
    case REDUX_WEBSOCKET_ERROR:
      return {
        ...state,
        ...initialState,
        message: 'Error. Too many reloads?',
      };
    case REDUX_WEBSOCKET_MESSAGE:
      return reduxWeboscketMessage(state, action);
    case REDUX_WEBSOCKET_SEND:
    default:
      return state;
  }
};

const reduxWeboscketMessage: Reducer<WebsocketState, ReduxWebsocketMessage> = (
  state = initialState,
  action,
): WebsocketState => {
  const response: WebsocketResponse = JSON.parse(action.payload.message);

  const responseKeys = Object.keys(response);
  const table = response?.table;
  const data = response?.data;
  const ws_action = response?.action;

  if (response?.subscribe) {
    const message = response['success'] ? 'Successful subscription.' : 'Error while subscribing...';
    return {...state, message};
  } else if (responseKeys.includes('status')) {
    const message = `Websocket. Status: ${(response as any).status || 'Error'}`;
    return {...state, message};
  } else if (ws_action) {
    const tempState: WebsocketState = {
      ...state,
      [table]: {...state[table]},
    };
    switch (ws_action) {
      case ResponseActions.PARTIAL: {
        const current_len = Object.keys(tempState[table]).length;
        for (let i = current_len; i < current_len + data.length; ++i) {
          tempState[table][i] = {
            ...tempState[table][i],
            ...(data[i] as any),
          };
        }

        tempState.__keys = {
          ...tempState.__keys,
          [table]: response['keys'],
        };

        return {...state, ...tempState};
      }
      case ResponseActions.INSERT: {
        const current_len = Object.keys(tempState[table]).length;
        for (let i = current_len; i < current_len + data.length; ++i) {
          tempState[table][i] = {
            ...tempState[table][i],
            ...data[i],
          };
        }
        return {...state, ...tempState};
      }
      case ResponseActions.UPDATE: {
        let item = 0;
        for (const key_val in data) {
          item = findItemByKeys(state.__keys[table], state[table], data[key_val]);
          if (item === -1) continue;
          tempState[table][item] = {
            ...tempState[table][item],
            ...data[key_val],
          };
          if (table === 'order' && tempState[table][item]['leavesQty'] <= 0) {
            console.log('DELETING FILLED ORDER');
            delete tempState[table][item];
          }
        }
        return {...state, ...tempState};
      }
    }
  } else if (responseKeys.includes('unsubscribe')) {
    delete state.__keys[response.unsubscribe];
  }
  return state;
};

type Actions = WebsocketActions;

// Actions
// ==============================
export const wsTickerChange = (payload: SYMBOLS): Actions => ({
  type: REDUX_WEBSOCKET_TICKER,
  payload,
});

export const getOrders = (): Thunk => async (dispatch) => {
  try {
    const response = await axios.post('/bitmex/getOrders');
    const {data} = response.data;
    console.log(data, 'orders data');
    // const { text } = JSON.parse(data);
    dispatch(getSuccess(JSON.parse(data)));
    // dispatch(postOrderSuccess({ success, from: text }));
    // dispatch(send(authKeyExpires("/realtime", "GET")));
    // dispatch(send({ op: "subscribe", args: ["order"] }));
  } catch (err) {
    console.log(err, 'ERR');
  }
};

export const getSuccess = (payload: any): Actions => ({
  type: FETCH_ORDERS,
  payload,
});

export const wsConnect = (): Thunk => async (dispatch) => {
  try {
    const url = `wss://${
      process.env.REACT_APP___TESTNET === 'true' ? 'testnet' : 'www'
    }.bitmex.com/realtime?subscribe=`;
    const subscribe = 'instrument:XBTUSD,instrument:ETHUSD,instrument:XRPUSD';
    dispatch(connect(`${url}${subscribe}`));
  } catch (err) {
    console.log(err.response.data, 'wsConnect Error');
  }
};

export const wsDisconnect = (): Thunk => async (dispatch) => {
  try {
    dispatch(disconnect());
  } catch (err) {
    console.log(err.response.data, 'wsDisconnect Error');
  }
};

export const wsSubscribeTo = (payload: SUBSCRIPTION_TOPICS): Thunk => async (dispatch) => {
  try {
    dispatch(send(authKeyExpires('/realtime', 'GET')));
    dispatch(send({op: 'subscribe', args: [payload]}));
  } catch (err) {
    console.log(err.response.data, 'wsDisconnect Error');
  }
};

export const wsUnsubscribeFrom = (payload: SUBSCRIPTION_TOPICS): Thunk => async (dispatch) => {
  try {
    dispatch(send({op: 'unsubscribe', args: [payload]}));
  } catch (err) {
    console.log(err.response.data, 'wsDisconnect Error');
  }
};

function findItemByKeys(keys: any, table: any, matchData: any): number {
  for (const index in table) {
    if (Object.keys(table[index]).length) {
      let matched = true;
      for (const key of keys) {
        if (!table[index] || table[index][key] !== matchData[key]) {
          matched = false;
        }
      }
      if (matched) return +index;
    }
  }
  return -1;
}
