import {
  POST_ORDER,
  POST_ORDER_SUCCESS,
  PREVIEW_PRICE,
  PREVIEW_PRICE_SUCCESS,
  PREVIEW_ORDERS,
  PREVIEW_ORDERS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  distribution: "Uniform",
  side: "",
  error: "",
  showPreview: false,
  currentPrice: null,
  instrument: "XBTUSD"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ORDER_SUCCESS:
      return { ...state, ...payload, showPreview: false, error: "" };
    case PREVIEW_PRICE_SUCCESS:
      return { ...state, currentPrice: payload };
    case PREVIEW_ORDERS_SUCCESS:
      return { ...state, showPreview: true, orders: payload.orders };

    default:
      return state;
  }
};
