import {AnyAction, combineReducers} from 'redux';
import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';
import notificationMiddleware from '../middlewares/toast-notification';
import {ExchangeAPIFacade, ExchangeAPIFacadeType} from 'redux/api/api';
import {AppState} from 'redux/modules/state';

import {previewReducer as preview} from '../modules/preview/previewModule';
import {websocketReducer as websocket} from '../modules/websocket/websocketModule';
import {trailingReducer as trailing} from '../modules/trailing/trailingModule';
import {crossReducer as cross} from '../modules/cross/crossModule';
import {ordersReducer as orders} from '../modules/orders/ordersModule';
import {settingsReducer as settings, activateExchange} from '../modules/settings/settingsModule';

const appReducer = combineReducers({preview, websocket, trailing, cross, orders, settings});

const rootReducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
  if (action.type === activateExchange.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const reduxWebsocketMiddleware = reduxWebsocket();

function createStore(preloadedState: Partial<AppState> = {}, api: ExchangeAPIFacadeType = new ExchangeAPIFacade()) {
  return configureStore({
    reducer: rootReducer as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {extraArgument: api},
        serializableCheck: {ignoredActionPaths: ['payload', 'meta.timestamp']},
      }).concat([reduxWebsocketMiddleware, notificationMiddleware]),
    preloadedState,
  });
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
const useAppDispatch = () => useDispatch<AppDispatch>();

export {createStore, rootReducer, useAppDispatch};
