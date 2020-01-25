import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { previewReducer } from "../modules/preview/preview";
import { websocketReducer } from "../modules/websocket/websocket";

import thunk from "redux-thunk";
import reduxWebsocket from "@giantmachines/redux-websocket";

import { AppState } from "../models/state";

const reduxWebsocketMiddleware = reduxWebsocket();
const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};
const middleware = [thunk, reduxWebsocketMiddleware];

const rootReducer = combineReducers<AppState>({
  preview: previewReducer,
  websocket: websocketReducer
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export { store };
