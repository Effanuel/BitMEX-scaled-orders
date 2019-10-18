import {
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_LOADING,
  PREVIEW_ORDERS_SUCCESS
} from '../actions/actionTypes';

import { PostOrder } from '../actions/previewActions';

interface PreviewReducerStore {
  orders: any;
  error: string;
  showPreview: boolean;
  loading: boolean;
}

const initialState = {
  orders: [],
  error: '',
  showPreview: false,
  loading: false
};

export default (
  state: PreviewReducerStore = initialState,
  action: PostOrder
): PreviewReducerStore => {
  switch (action.type) {
    case POST_ORDER_LOADING:
      return { ...state, error: '', loading: true };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
        error: action.payload,
        loading: false
      };
    case PREVIEW_ORDERS_SUCCESS:
      return {
        ...state,
        showPreview: true,
        orders: action.payload.orders,
        error: ''
      };
    default:
      return state;
  }
};
