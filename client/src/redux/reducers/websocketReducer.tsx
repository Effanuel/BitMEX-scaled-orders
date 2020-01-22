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

const findItemByKeys = (keys: any, table: any, matchData: any): number => {
  for (let j in Object.keys(table)) {
    let matched = true;
    for (let i = 0, len = keys.length; i < len; ++i) {
      if (table[j][keys[i]] !== matchData[keys[i]]) {
        matched = false;
      }
    }

    if (matched) return parseInt(j);
  }
  return -1;
};

const initialState = {
  __keys: {},
  instrument: {},
  trade: {},
  order: {},
  connected: false,
  loading: false,
  message: "",
  symbol: "XBTUSD"
};

export default (
  state: WebsocketState = initialState,
  action: ReduxWebsocket
): WebsocketState => {
  switch (action.type) {
    case INTERNAL_CLEAR_MESSAGE_LOG:
      return state;
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
        message: "Error. Too many reloads?",
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

const reduxWeboscketMessage = (
  state: any = initialState,
  { payload }: any
): object => {
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
        message: "Error while subscribing..."
      };
    }
  } else if (messageKeys.includes("status")) {
    if (dat["status"] === 400) {
      return {
        ...state,
        message: "Websocket. Status: 400"
      };
    }
    if (dat["status"] === 401) {
      return {
        ...state,
        message: "Websocket. Status: 401"
      };
    }
  } else if (_action) {
    const tempState = {
      ...state,
      [table]: {
        ...state[table]
      }
    };
    if (_action === "partial") {
      // console.log(dat, "PARTIAL");
      const len = Object.keys(tempState[table]).length;
      for (let i = 0, __len = dat["data"].length; i < __len; ++i) {
        tempState[table][len + i] = {
          ...tempState[table][len + i],
          ...dat["data"][i]
        };
      }
      tempState.__keys = {
        ...tempState.__keys,
        [table]: dat["keys"]
      };
    } else if (_action === "insert") {
      const len = Object.keys(tempState[table]).length;
      for (let i = 0, __len = dat["data"].length; i < __len; ++i) {
        tempState[table][len + i] = {
          ...tempState[table][len + i],
          ...dat["data"][i]
        };
      }
    } else if (_action === "update") {
      // console.log(dat);
      for (let key_val in Object.keys(dat["data"])) {
        // Finds an item which needs to be updated.
        item = findItemByKeys(
          state.__keys[table], //datta.__keys[table],
          state[table], //datta[table],
          dat["data"][key_val]
        );
        if (item === -1) continue;
        tempState[table][item] = {
          ...tempState[table][item],
          ...dat["data"][key_val]
        };
        // for future order chasing
        if (table === "order" && tempState[table][item]["leavesQty"] <= 0) {
          console.log("DELETING FILLED ORDER");
          delete tempState[table][item];
        }
      }
    }
    return tempState;
    // console.log(item);
  }
  return state;
};
