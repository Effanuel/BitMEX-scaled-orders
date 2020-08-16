import {createScaledOrders, DistributionProps, DISTRIBUTIONS, MarketOrderProps} from 'util/index';
import {SUCCESS, FAILURE, REQUEST, callAPI, withPayloadType} from 'redux/helpers/actionHelpers';
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
import {BitMEX_API} from 'redux/helpers/apiHelpers';

export const defaultState: PreviewState = {
  orders: {orders: [], stop: {}},
  balance: 0,
  showPreview: false,
  previewLoading: false,
  error: '',
};

const previewShow = createAction(SHOW_PREVIEW, withPayloadType<PreviewActions.SHOW_PREVIEW>());
export const previewToggle = createAction(TOGGLE_PREVIEW);

export const previewReducer = createReducer<PreviewState>(defaultState, (builder) =>
  builder
    .addCase(SUCCESS[PREVIEW_POST_ORDER], (state) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: ''};
    })
    .addCase(SUCCESS[PREVIEW_POST_MARKET_ORDER], (state) => {
      return {...state, previewLoading: false, error: ''};
    })
    .addCase(SUCCESS[GET_BALANCE], (state, {payload}) => {
      return {...state, balance: payload.walletBalance};
    })
    .addCase(FAILURE[GET_BALANCE], (state, {payload}) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: payload};
    })
    .addCase(FAILURE[PREVIEW_POST_ORDER], (state, {payload}) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: payload};
    })
    .addCase(REQUEST[PREVIEW_POST_ORDER], (state) => {
      return {...state, previewLoading: true, error: ''};
    })
    .addCase(previewShow, (state, {payload}) => {
      return {...state, orders: payload, showPreview: true, error: ''};
    })
    .addCase(previewToggle, (state) => {
      return {...state, showPreview: !state.showPreview, error: ''};
    }),
);

// Actions
// ==============================
const API = new BitMEX_API();

export const postScaledOrders = (ordersProps: DistributionProps, distribution: DISTRIBUTIONS) =>
  callAPI(PREVIEW_POST_ORDER, API.postBulkOrders, {ordersProps, distribution}, {});

export const postMarketOrder = (orderProps: MarketOrderProps) =>
  callAPI(PREVIEW_POST_MARKET_ORDER, API.postMarketOrder, orderProps, {});

export const getBalance = () => () => callAPI(GET_BALANCE, API.getBalance, undefined, {});

export const previewOrders = (ordersProps: DistributionProps, distribution: DISTRIBUTIONS): Action =>
  previewShow(createScaledOrders({ordersProps, distribution}));
