import {
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_LOADING,
  PREVIEW_ORDERS_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  error: '',
  showPreview: false,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ORDER_LOADING:
      return { ...state, error: '', loading: true };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        ...payload,
        showPreview: false,
        error: '',
        orders: [],
        loading: false
      };
    case POST_ORDER_ERROR:
      return {
        ...state,
        showPreview: false,
        orders: [],
        error: payload,
        loading: false
      };
    case PREVIEW_ORDERS_SUCCESS:
      return { ...state, showPreview: true, orders: payload.orders, error: '' };
    default:
      return state;
  }
};
