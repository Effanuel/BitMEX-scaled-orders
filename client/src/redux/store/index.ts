import {combineReducers} from 'redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/notification';

import {previewReducer as preview} from '../modules/preview';
import {websocketReducer as websocket} from '../modules/websocket';
import {trailingReducer as trailing} from '../modules/trailing';
import {BitMEX_API, BitMEX} from 'redux/helpers/apiHelpers';

const rootReducer = combineReducers({preview, websocket, trailing});

const reduxWebsocketMiddleware = reduxWebsocket();

function createStore(preloadedState: Partial<AppState> = {}, api: BitMEX = new BitMEX_API()) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: api},
      serializableCheck: {ignoredActionPaths: ['payload', 'meta.timestamp']},
    }).concat([reduxWebsocketMiddleware, notificationMiddleware]), //[thunk.withExtraArgument(api), ],
    preloadedState,
  });
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = any;

export {createStore};
