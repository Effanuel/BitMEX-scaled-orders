import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
  REDUX_WEBSOCKET_ERROR,
  INTERNAL_CLEAR_MESSAGE_LOG,
  REDUX_WEBSOCKET_TICKER
} from "../actions/actionTypes";

import { WebsocketState } from "../models/state";
import { ReduxWebsocket } from "../actions/websocketActions";

const findItemByKeys = (keys: any, table: any, matchData: any) => {
  for (let j = 0; j < Object.keys(table).length; j++) {
    let matched = true;
    for (let i = 0; i < keys.length; i++) {
      if (table[j][keys[i]] !== matchData[keys[i]]) {
        matched = false;
      }
    }
    if (matched) return j;
  }
  return 0;
};

const initialState = {
  __keys: {},
  instrument: {},
  connected: false,
  loading: false,
  meesage: "",
  error: "",
  symbol: "XBTUSD"
};

export default (
  state: WebsocketState = initialState,
  action: ReduxWebsocket
): any => {
  switch (action.type) {
    case INTERNAL_CLEAR_MESSAGE_LOG:
      return {
        ...state,
        data: {}
      };
    case REDUX_WEBSOCKET_TICKER:
      return {
        ...state,
        symbol: action.payload
      };
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        loading: true,
        message: "Connecting..."
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        loading: false,
        message: "Websocket opened.",
        connected: true
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
        message: "Websocket closed."
      };
    case REDUX_WEBSOCKET_ERROR:
      return {
        ...state,
        error: "Websocket Error. Perhaps too many reloads.",
        loading: false
      };

    case REDUX_WEBSOCKET_MESSAGE:
      return reduxWeboscketMessage(state, action);

    case REDUX_WEBSOCKET_SEND:
      return state;
    default:
      return state;
  }
};

const reduxWeboscketMessage = (state: any = initialState, { payload }: any) => {
  let dat = JSON.parse(payload.message);

  const messageKeys = Object.keys(dat);
  const table = messageKeys.includes("table") ? dat["table"] : null;
  const _action = messageKeys.includes("action") ? dat["action"] : null;
  let item = 0;

  if (messageKeys.includes("subscribe")) {
    if (dat["success"]) {
      return {
        ...state,
        message: "Succesful subscription."
      };
    } else {
      return {
        ...state,
        error: "Error while subscribing..."
      };
    }
  } else if (messageKeys.includes("status")) {
    if (dat["status"] === 400) {
      return {
        ...state,
        error: "Websocket. Status: 400"
      };
    }
    if (dat["status"] === 401) {
      return {
        ...state,
        error: "Websocket. Status: 401"
      };
    }
  } else if (_action) {
    // if (!Object.keys(datta.__data).includes(table)) {
    //   datta.__data[table] = [];
    // }
    // if (!Object.keys(datta.__keys).includes(table)) {
    //   datta.__keys[table] = [];
    // }

    if (_action === "partial") {
      return {
        ...state,
        [table]: {
          ...state[table],
          [Object.keys(state[table]).length || 0]: dat["data"][0]
        },
        __keys: {
          ...state.__keys,
          [table]: dat["keys"]
        }
      };

      // datta.__keys[table] = dat["keys"];
    } else if (_action === "update") {
      for (let key_val in Object.keys(dat["data"])) {
        // Finds an item which needs to be updated.
        item = findItemByKeys(
          state.__keys[table], //datta.__keys[table],
          state[table], //datta[table],
          dat["data"][key_val]
        );
        if (!state[table][item]) continue;
        // datta[table][item] = {
        //   ...datta[table][item],
        //   ...dat["data"][key_val]
        // };
      }
      return {
        ...state,
        [table]: {
          ...state[table],
          [item]: {
            ...state[table][item],
            ...dat["data"][item]
          }
        },
        loading: false
      };
    }
  }

  return {
    ...state,

    loading: false
  };
};
