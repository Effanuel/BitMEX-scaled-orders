import {combineReducers} from 'redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/toast-notification';
import {APIFacade, APIType} from 'redux/api/api';
import {AppState} from 'redux/modules/state';

import {previewReducer as preview} from '../modules/preview/previewModule';
import {websocketReducer as websocket} from '../modules/websocket/websocketModule';
import {trailingReducer as trailing} from '../modules/trailing/trailingModule';
import {crossReducer as cross} from '../modules/cross/crossModule';
import {ordersReducer as orders} from '../modules/orders/ordersModule';
import {settingsReducer as settings} from '../modules/settings/settingsModule';

const rootReducer = combineReducers({preview, websocket, trailing, cross, orders, settings});

const reduxWebsocketMiddleware = reduxWebsocket();

function createStore(preloadedState: Partial<AppState> = {}, api: APIType = new APIFacade()) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: api},
      serializableCheck: {ignoredActionPaths: ['payload', 'meta.timestamp']},
    }).concat([reduxWebsocketMiddleware, notificationMiddleware]),
    preloadedState,
  });
}

export {createStore, rootReducer};
