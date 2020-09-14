import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {mockWebsocketState, mockPreviewState, mockTrailingState} from './mockData/orders';
import {MockBitMEX_API} from './mockAPI';
import {rootReducer} from 'redux/store';
import createStore from './configStore';
import {AppState} from 'redux/models/state';

export const mockedDefaultState: AppState = {
  websocket: mockWebsocketState({}),
  preview: mockPreviewState({}),
  trailing: mockTrailingState({}),
};

export function createMockedStore(overrideState?: Partial<AppState>, mockAPI = new MockBitMEX_API()) {
  const preloadedState = {...mockedDefaultState, ...overrideState};
  const enhancer = compose(applyMiddleware(thunk.withExtraArgument(mockAPI)));

  return createStore(rootReducer, preloadedState, enhancer);
}
