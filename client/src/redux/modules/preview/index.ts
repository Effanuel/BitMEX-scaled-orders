import {createScaledOrders, ScaledOrdersProps, ScaledOrders, createMarketOrder, DISTRIBUTIONS} from 'util/index';
import {SUCCESS, FAILURE, REQUEST, callAPI} from 'redux/helpers/actionHelpers';
import {SHOW_PREVIEW, SWITCH_PREVIEW, PreviewState, PREVIEW_POST_ORDER, GET_BALANCE} from './types';

const defaultState: PreviewState = {
  orders: {orders: [], stop: {}},
  balance: 0,
  showPreview: false,
  loading: false,
  error: '',
};

export const previewReducer = (state = defaultState, {type, payload}: Action): PreviewState => {
  switch (type) {
    case SUCCESS[PREVIEW_POST_ORDER]:
      return {
        ...state,
        orders: defaultState.orders,
        showPreview: false,
        loading: false,
        error: '',
      };
    case SUCCESS[GET_BALANCE]:
      return {
        ...state,
        balance: payload.walletBalance,
      };
    case FAILURE[GET_BALANCE]:
    case FAILURE[PREVIEW_POST_ORDER]:
      return {
        ...state,
        orders: defaultState.orders,
        showPreview: false,
        loading: false,
        error: payload,
      };
    case REQUEST[PREVIEW_POST_ORDER]:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SHOW_PREVIEW:
      return {
        ...state,
        orders: payload,
        showPreview: true,
        error: '',
      };
    case SWITCH_PREVIEW:
      return {
        ...state,
        showPreview: !state.showPreview,
        error: '',
      };
    default:
      return state;
  }
};

// Actions
// ==============================

export const scaledOrders = (ordersProps: ScaledOrdersProps, distribution: DISTRIBUTIONS) => {
  console.log(ordersProps);
  const payload = createScaledOrders(ordersProps, distribution);
  if (ordersProps.stop) {
    payload.orders.push(payload.stop as any);
  }
  return callAPI(PREVIEW_POST_ORDER, payload, '/bitmex/bulkOrders');
};

export const marketOrder = (orderProps: any) => {
  const order = createMarketOrder(orderProps);
  const payload = {order, method: 'POST'};

  return callAPI(PREVIEW_POST_ORDER, payload, '/bitmex/order');
};

export const getBalance = () => callAPI(GET_BALANCE, undefined, '/bitmex/getBalance', ['walletBalance']);

export const previewOrders = (ordersProps: ScaledOrdersProps, distribution: DISTRIBUTIONS): Action =>
  previewShow(createScaledOrders(ordersProps, distribution));

export const previewToggle = (): Action => ({
  type: SWITCH_PREVIEW,
});

const previewShow = (payload: ScaledOrders): Action => ({
  type: SHOW_PREVIEW,
  payload,
});
