import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
// Reducers
import { previewReducer as preview } from '../modules/preview';
import { websocketReducer as websocket } from '../modules/websocket';
import { best_priceReducer as best_price } from '../modules/best-price';
import { notifyReducer as notify } from '../modules/notify';
// Middleware
import thunk from 'redux-thunk';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/notification';
// State
import { AppState } from '../models/state';

const reduxWebsocketMiddleware = reduxWebsocket();
// Enabled to debug redux store more easily using redux-dev-tools
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};

// Adding reduxWebsocketMiddleware for subscribing to a websocket
// Adding notificationMiddleware for handling messages for snackbar
const middleware = [thunk, reduxWebsocketMiddleware, notificationMiddleware];

const rootReducer = combineReducers<AppState>({
  preview,
  websocket,
  best_price,
  notify,
});

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export { store };
