import {
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  WEBSOCKET_ERROR,
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

interface WebsocketResponseData {
  // Table name / Subscription topic.
  // Could be "trade", "order", "instrument", etc.
  table: string;
  // The type of the message. Types:
  // 'partial'; This is a table image, replace your data entirely.
  // 'update': Update a single row.
  // 'insert': Insert a new row.
  // 'delete': Delete a row.
  action: "partial" | "update" | "insert" | "delete";
  // An array of table rows is emitted here. They are identical in structure to data returned from the REST API.
  data: object[];
  //
  // The below fields define the table and are only sent on a `partial`
  //
  // Attribute names that are guaranteed to be unique per object.
  // If more than one is provided, the key is composite.
  // Use these key names to uniquely identify rows. Key columns are guaranteed
  // to be present on all data received.
  keys?: string[];
  // This lists key relationships with other tables.
  // For example, `quote`'s foreign key is {"symbol": "instrument"}
  foreignKeys?: { [key: string]: string };
  // This lists the shape of the table. The possible types:
  // "symbol" - In most languages this is equal to "string"
  // "guid"
  // "timestamp"
  // "timespan"
  // "float"
  // "long"
  // "integer"
  // "boolean"
  types?: { [key: string]: string };
  // When multiple subscriptions are active to the same table, use the `filter` to correlate which datagram
  // belongs to which subscription, as the `table` property will not contain the subscription's symbol.
  filter?: { account?: number; symbol?: string };
  // These are internal fields that indicate how responses are sorted and grouped.
  attributes?: { [key: string]: string };
}
interface WebsocketResponseSuccess {
  subscribe: string;
  success: boolean;
}

interface WebsocketResponseError {
  error: string;
}

interface Indexable {
  [key: string]: any;
}

export type WebsocketResponse = Indexable &
  (WebsocketResponseData | WebsocketResponseSuccess | WebsocketResponseError);
