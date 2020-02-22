import { combineReducers, createStore, applyMiddleware, compose } from "redux";
// Reducers
import { previewReducer } from "../modules/preview/preview";
import { websocketReducer } from "../modules/websocket/websocket";
// Middleware
import thunk from "redux-thunk";
import reduxWebsocket from "@giantmachines/redux-websocket";
// State
import { AppState } from "../models/state";

const reduxWebsocketMiddleware = reduxWebsocket();
// Enabled to debug redux store more easily using redux-dev-tools
const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};
// Adding thunk for async dispatch of actions
// Adding reduxWebsocketMiddleware for subscribing to a websocket
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
