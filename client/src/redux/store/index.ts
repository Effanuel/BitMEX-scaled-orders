import { combineReducers, createStore, applyMiddleware } from "redux";
import previewReducer from "../reducers/previewReducer";
import websocketReducer from "../reducers/websocketReducer";

import thunk from "redux-thunk";
import reduxWebsocket from "@giantmachines/redux-websocket";

import { AppState } from "../models/state";

const reduxWebsocketMiddleware = reduxWebsocket();
const initialState = {};
const middleware = [thunk, reduxWebsocketMiddleware];

const rootReducer = combineReducers<AppState>({
  preview: previewReducer,
  websocket: websocketReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export { store };
