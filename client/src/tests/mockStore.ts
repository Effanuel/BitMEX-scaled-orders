import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {
  mockWebsocketState,
  mockPreviewState,
  mockTrailingState,
  mockCrossState,
  mockOrdersState,
} from './mockData/orders';
import {rootReducer} from 'redux/store';
import createStore from './configStore';
import {AppState} from 'redux/models/state';
import notificationMiddleware from '../redux/middlewares/notification';
import {API} from 'redux/api/api';

const mockedDefaultState: AppState = {
  websocket: mockWebsocketState({}),
  preview: mockPreviewState({}),
  trailing: mockTrailingState({}),
  cross: mockCrossState({}),
  orders: mockOrdersState({}),
};

export function createMockedStore(overrideState: Partial<AppState> = {}) {
  const preloadedState = {...mockedDefaultState, ...overrideState};
  const middlewares = [thunk.withExtraArgument(new API()), notificationMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares));

  return createStore(rootReducer, preloadedState, enhancer);
}

export type MockedStore = ReturnType<typeof createMockedStore>;
