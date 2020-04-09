import {
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  WEBSOCKET_ERROR
} from "@giantmachines/redux-websocket";
// Actions
export const FETCH_ORDERS = "websocket/fetch_orders";

const WEBSOCKET_PREFIX: string = "REDUX_WEBSOCKET";
export const REDUX_WEBSOCKET_BROKEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_BROKEN}`;
export const REDUX_WEBSOCKET_OPEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_OPEN}`;
export const REDUX_WEBSOCKET_CLOSED = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CLOSED}`;
export const REDUX_WEBSOCKET_MESSAGE = `${WEBSOCKET_PREFIX}::${WEBSOCKET_MESSAGE}`;
export const REDUX_WEBSOCKET_CONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CONNECT}`;
export const REDUX_WEBSOCKET_DISCONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_DISCONNECT}`;
export const REDUX_WEBSOCKET_SEND = `${WEBSOCKET_PREFIX}::${WEBSOCKET_SEND}`;
export const REDUX_WEBSOCKET_ERROR = `${WEBSOCKET_PREFIX}::${WEBSOCKET_ERROR}`;
export const REDUX_WEBSOCKET_TICKER = "REDUX_WEBSOCKET_TICKER"; // :string fixes internal action error
// export const INTERNAL_CLEAR_MESSAGE_LOG = "INTERNAL::CLEAR_MESSAGE_LOG";
// Actions Types
interface ReduxWebsocketFetchOrders {
  type: typeof FETCH_ORDERS;
  payload: any;
}

interface WebsocketTickerChange {
  type: typeof REDUX_WEBSOCKET_TICKER;
  payload: any;
}
// interface InternalClearMessageLog {
//   type: typeof INTERNAL_CLEAR_MESSAGE_LOG;
//   payload: any;
// }
interface ReduxWebsocketConnect {
  type: typeof REDUX_WEBSOCKET_CONNECT;
  payload: any;
}
interface ReduxWebsocketOpen {
  type: typeof REDUX_WEBSOCKET_OPEN;
  payload: any;
}
interface ReduxWebsocketBroken {
  type: typeof REDUX_WEBSOCKET_BROKEN;
  payload: any;
}
interface ReduxtWebsocketClosed {
  type: typeof REDUX_WEBSOCKET_CLOSED;
  payload: any;
}
interface ReduxWebsocketError {
  type: typeof REDUX_WEBSOCKET_ERROR;
  payload: any;
}
interface ReduxWebsocketSend {
  type: typeof REDUX_WEBSOCKET_SEND;
  payload: any;
}
interface ReduxWebsocketMessage {
  type: typeof REDUX_WEBSOCKET_MESSAGE;
  payload: any;
}

export type WebsocketActionTypes =
  | ReduxWebsocketFetchOrders
  | WebsocketTickerChange
  | ReduxWebsocketConnect
  | ReduxWebsocketOpen
  | ReduxWebsocketBroken
  | ReduxtWebsocketClosed
  | ReduxWebsocketError
  | ReduxWebsocketSend
  | ReduxWebsocketMessage;
// | InternalClearMessageLog;
// State
export interface WebsocketState {
  __keys?: any;
  instrument?: any;
  order?: any;
  connected?: boolean;
  loading?: boolean;
  message?: string;
  error?: string;
  symbol?: string;
}
