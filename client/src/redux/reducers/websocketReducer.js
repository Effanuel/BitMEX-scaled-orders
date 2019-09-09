import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
  REDUX_WEBSOCKET_LOADING
} from "../actions/actionTypes";

const initialState = {
  data: {},
  connected: false,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "INTERNAL::CLEAR_MESSAGE_LOG":
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

    case REDUX_WEBSOCKET_MESSAGE:
      return {
        ...state,
        laoding: false,
        data: JSON.parse(payload.message)
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
