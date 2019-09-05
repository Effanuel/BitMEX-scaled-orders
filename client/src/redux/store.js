import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reduxWebsocket from "@giantmachines/redux-websocket";

import rootReducer from "./reducers";

const reduxWebsocketMiddleware = reduxWebsocket();
const initialState = {};
const middleware = [thunk, reduxWebsocketMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
