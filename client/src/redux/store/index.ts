import {combineReducers, createStore, applyMiddleware, compose} from 'redux';

import {previewReducer as preview} from '../modules/preview';
import {websocketReducer as websocket} from '../modules/websocket';
import {best_priceReducer as best_price} from '../modules/best-price';
import {notifyReducer as notify} from '../modules/notify';

import thunk from 'redux-thunk';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/notification';

const rootReducer = combineReducers({
  preview,
  websocket,
  best_price,
  notify,
});

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reduxWebsocketMiddleware = reduxWebsocket();
const middleware = [thunk, reduxWebsocketMiddleware, notificationMiddleware];
const initialState = {};

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export {store};
