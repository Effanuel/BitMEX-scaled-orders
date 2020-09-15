import {combineReducers} from 'redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/notification';
import {BitMEX_API, BitMEX} from 'redux/helpers/apiHelpers';
import {AppState} from 'redux/models/state';

import {previewReducer as preview} from '../modules/preview/previewModule';
import {websocketReducer as websocket} from '../modules/websocket/websocketModule';
import {trailingReducer as trailing} from '../modules/trailing/trailingModule';
import {crossReducer as cross} from '../modules/cross/crossModule';

export const rootReducer = combineReducers({preview, websocket, trailing, cross});

const reduxWebsocketMiddleware = reduxWebsocket();

function createStore(preloadedState: Partial<AppState> = {}, api: BitMEX = new BitMEX_API()) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: api},
      serializableCheck: {ignoredActionPaths: ['payload', 'meta.timestamp']},
    }).concat([reduxWebsocketMiddleware, notificationMiddleware]),
    preloadedState,
  });
}

export type AppDispatch = any;

export {createStore};
