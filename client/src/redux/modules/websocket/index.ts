import {
  WebsocketResponse,
  WebsocketActions,
  WebsocketState,
  ReduxWebsocketMessage,
  FETCH_ORDERS,
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
  REDUX_WEBSOCKET_ERROR,
  REDUX_WEBSOCKET_TICKER,
} from "./types";
import axios from "axios";
import { connect, disconnect, send } from "@giantmachines/redux-websocket";
import { Thunk } from "../../models/state";
import { ActionCreator, Reducer } from "redux";
import { authKeyExpires } from "util/auth";

const initialState = {
  __keys: {},
  instrument: {},
  trade: {},
  order: {},
  connected: false,
  loading: false,
  message: "Websocket is offline.",
  symbol: "XBTUSD",
};
// Reducer
export const websocketReducer: Reducer<WebsocketState, WebsocketActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, order: { ...state.order, ...action.payload } };
    case REDUX_WEBSOCKET_TICKER:
      return {
        ...state,
        symbol: action.payload,
      };
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        loading: true,
        message: "Connecting...",
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        loading: false,
        message: "Websocket opened.",
        connected: true,
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...initialState,
        message: "Websocket closed.",
      };
    case REDUX_WEBSOCKET_ERROR:
      return {
        ...initialState,
        message: "Error. Too many reloads?",
      };

    case REDUX_WEBSOCKET_MESSAGE:
      return reduxWeboscketMessage(state, action);

    case REDUX_WEBSOCKET_SEND:
      return state;

    default:
      return state;
  }
};

const reduxWeboscketMessage: Reducer<WebsocketState, ReduxWebsocketMessage> = (
  state = initialState,
  action
) => {
  let response: WebsocketResponse = JSON.parse(action.payload.message);
  // console.log("REduxWebsocket message", response);

  const responseKeys = Object.keys(response);
  const table = response["table"];
  const data = response["data"];
  const ws_action = responseKeys.includes("action") ? response["action"] : null;

  if (responseKeys.includes("subscribe")) {
    const message = response["success"]
      ? "Successful subscription."
      : "Error while subscribing...";
    return { ...state, message };
  } else if (responseKeys.includes("status")) {
    return {
      ...state,
      message: `Websocket. Status: ${response["status"] || "Error"}`,
    };
  } else if (ws_action) {
    const tempState = {
      ...state,
      [table]: {
        ...state[table],
      },
    };
    // todo replace with switch case
    switch (ws_action) {
      case "partial": {
        const current_len = Object.keys(tempState[table]).length;
        const data_len = data.length;
        for (let i = current_len; i < current_len + data_len; ++i) {
          tempState[table][i] = {
            ...tempState[table][i],
            ...data[i], //...response
          };
        }
        // console.log(dat, "PARTIAL");
        // const len = Object.keys(tempState[table]).length;
        // for (let i = 0, __len = dat["data"].length; i < __len; ++i) {
        //   tempState[table][len + i] = {
        //     ...tempState[table][len + i],
        //     ...dat["data"][i]
        //   };
        // }
        tempState.__keys = {
          ...tempState.__keys,
          [table]: response["keys"],
        };
      }
      case "insert": {
        const current_len = Object.keys(tempState[table]).length;
        for (let i = current_len; i < current_len + data.length; ++i) {
          tempState[table][i] = {
            ...tempState[table][i],
            ...data[i],
          };
        }
      }
      case "update": {
        let item = 0;
        // console.log(dat);
        for (let key_val in data) {
          // Finds an item which needs to be updated.
          item = findItemByKeys(
            state.__keys[table], //datta.__keys[table],
            state[table], //datta[table],
            data[key_val]
          );
          if (item === -1) continue;
          tempState[table][item] = {
            ...tempState[table][item],
            ...data[key_val],
          };
          // for future order chasing
          if (table === "order" && tempState[table][item]["leavesQty"] <= 0) {
            console.log("DELETING FILLED ORDER");
            delete tempState[table][item];
            // const {
            //   [table]: { [item]: deleted, ...updated },
            // } = tempState;
          }
        }
        return { ...state, ...tempState };
      }
      // console.log(item);
    }
  } else if (responseKeys.includes("unsubscribe")) {
    delete state.__keys[response["unsubscribe"]];
  }
  return state;
};

type Actions = WebsocketActions;

// Actions
// ==============================
export const wsTickerChange = (payload: string): Actions => ({
  type: REDUX_WEBSOCKET_TICKER,
  payload,
});

export const getOrders = (): Thunk => async (dispatch) => {
  try {
    const response = await axios.post("/bitmex/getOrders");
    const { data } = response.data;
    console.log(data, "orders data");
    // const { text } = JSON.parse(data);
    dispatch(getSuccess(JSON.parse(data)));
    // dispatch(postOrderSuccess({ success, from: text }));
    // dispatch(send(authKeyExpires("/realtime", "GET")));
    // dispatch(send({ op: "subscribe", args: ["order"] }));
  } catch (err) {
    console.log(err, "ERR");
    // if (err.message.includes("500")) {
    //   dispatch(postOrderError("Server is offline."));
    // } else {
    //   dispatch(postOrderError(err.response.data.error));
    // }
  }
};

export const getSuccess = (payload: any): Actions => ({
  type: FETCH_ORDERS,
  payload,
});

export const wsConnect = (): Thunk => async (dispatch) => {
  try {
    const url = `wss://${
      process.env.REACT_APP___TESTNET === "true" ? "testnet" : "www"
    }.bitmex.com/realtime?subscribe=`;
    console.log(url, "gogogo");
    // If you want to add your own ticker,
    // you will need to add 'instrument:<ticker_name>' here
    // also change some code in <ScaledContainer />, selectors and utils
    const subscribe = "instrument:XBTUSD,instrument:ETHUSD,instrument:XRPUSD";
    dispatch(connect(`${url}${subscribe}`));
  } catch (err) {
    console.log(err.response.data, "wsConnect Error");
  }
};

export const wsDisconnect = (): Thunk => async (dispatch) => {
  try {
    dispatch(disconnect());
  } catch (err) {
    console.log(err.response.data, "wsDisconnect Error");
  }
};

export const wsSubscribeTo = (payload: string): Thunk => async (dispatch) => {
  try {
    // dispatch(disconnect());
    dispatch(send(authKeyExpires("/realtime", "GET")));
    // restrict symbol?
    dispatch(send({ op: "subscribe", args: [payload] }));
  } catch (err) {
    console.log(err.response.data, "wsDisconnect Error");
  }
};

export const wsUnsubscribeFrom = (payload: string): Thunk => async (
  dispatch
) => {
  try {
    // dispatch(disconnect());
    // dispatch(send(authKeyExpires("/realtime", "GET")));
    // restrict symbol?
    dispatch(send({ op: "unsubscribe", args: [payload] }));
  } catch (err) {
    console.log(err.response.data, "wsDisconnect Error");
  }
};

// Utils
// const findItemByKeys = (keys: any, table: any, matchData: any): number => {
//   for (let j in table) {
//     let matched = true;
//     for (let i = 0, len = keys.length; i < len; ++i) {
//       if (!table[j] || table[j][keys[i]] !== matchData[keys[i]]) {
//         matched = false;
//       }
//     }
//     if (matched) return +j;
//   }
//   return -1;
// };

function findItemByKeys(keys: any, table: any, matchData: any): number {
  for (let j in table) {
    // replace with of?
    let matched = true;
    for (let key of keys) {
      if (!table[j] || table[j][key] !== matchData[key]) {
        matched = false;
      }
    }
    if (matched) return +j;
  }
  return -1;
}
// tempState[table][item] = {
//   ...tempState[table][item],
//   ...data[key_val],
// };
// function deep(state: any, updatedFields: any) {
//   return { ...state, ...updatedFields };
// }
