import {createScaledOrders, DistributionProps, DISTRIBUTIONS, MarketOrderProps} from 'util/index';
import {withPayloadType, createThunk} from 'redux/helpers/actionHelpers';
import {
  SHOW_PREVIEW,
  TOGGLE_PREVIEW,
  PreviewState,
  PREVIEW_POST_ORDER,
  GET_BALANCE,
  PreviewActions,
  PREVIEW_POST_MARKET_ORDER,
} from './types';
import {createAction, createReducer} from '@reduxjs/toolkit';

export const defaultState: PreviewState = {
  orders: {orders: [], stop: {}},
  balance: 0,
  showPreview: false,
  previewLoading: false,
  error: '',
};

export const postMarketOrder = createThunk<MarketOrderProps>(PREVIEW_POST_MARKET_ORDER, 'postMarketOrder');

type PostScaledOrdersProps = {ordersProps: DistributionProps; distribution: DISTRIBUTIONS};
export const postScaledOrders = createThunk<PostScaledOrdersProps>(PREVIEW_POST_ORDER, 'postBulkOrders');

export const getBalance = createThunk(GET_BALANCE, 'getBalance');

export const previewToggle = createAction(TOGGLE_PREVIEW);

const previewShow = createAction(SHOW_PREVIEW, withPayloadType<PreviewActions.SHOW_PREVIEW>());

export const previewOrders = (ordersProps: DistributionProps, distribution: DISTRIBUTIONS): Action =>
  previewShow(createScaledOrders({ordersProps, distribution}));

export const previewReducer = createReducer<PreviewState>(defaultState, (builder) =>
  builder
    .addCase(postScaledOrders.pending, (state) => {
      return {...state, previewLoading: true, error: ''};
    })
    .addCase(postScaledOrders.fulfilled, (state) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: ''};
    })
    .addCase(postScaledOrders.rejected, (state, {payload}: any) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: payload};
    })
    .addCase(postMarketOrder.fulfilled, (state) => {
      return {...state, previewLoading: false, error: ''};
    })
    .addCase(getBalance.fulfilled, (state, {payload}) => {
      return {...state, balance: payload.walletBalance};
    })
    .addCase(getBalance.rejected, (state, {payload}: any) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: payload};
    })
    .addCase(previewShow, (state, {payload}) => {
      return {...state, orders: payload, showPreview: true, error: ''};
    })
    .addCase(previewToggle, (state) => {
      return {...state, showPreview: !state.showPreview, error: ''};
    }),
);
