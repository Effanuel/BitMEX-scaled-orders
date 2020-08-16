import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/notification';

import {previewReducer as preview} from '../modules/preview';
import {websocketReducer as websocket} from '../modules/websocket';
import {trailingReducer as trailing} from '../modules/trailing';

const rootReducer = combineReducers({preview, websocket, trailing});

const reduxWebsocketMiddleware = reduxWebsocket();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, reduxWebsocketMiddleware, notificationMiddleware],
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export {store};
