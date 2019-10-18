import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
  REDUX_WEBSOCKET_LOADING,
  REDUX_WEBSOCKET_ERROR,
  INTERNAL_CLEAR_MESSAGE_LOG
} from '../actions/actionTypes';

import { Websocket } from '../actions/websocketActions';

interface WebsocketReducerStore {
  data: object;
  connected: boolean;
  loading: boolean;
  error: string;
}

const initialState = {
  data: {},
  connected: false,
  loading: false,
  error: ''
};

export default (
  state: WebsocketReducerStore = initialState,
  action: Websocket
): WebsocketReducerStore => {
  switch (action.type) {
    case INTERNAL_CLEAR_MESSAGE_LOG:
      return {
        ...state,
        data: {}
      };
    case REDUX_WEBSOCKET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        loading: true
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        loading: false,
        connected: true
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false
      };
    case REDUX_WEBSOCKET_ERROR:
      return {
        ...state,
        error: 'Websocket Error. Perhaps too many reloads.',
        loading: false
      };

    case REDUX_WEBSOCKET_MESSAGE:
      return {
        ...state,
        loading: false,
        data: JSON.parse(action.payload.message)
      };

    case REDUX_WEBSOCKET_SEND:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
