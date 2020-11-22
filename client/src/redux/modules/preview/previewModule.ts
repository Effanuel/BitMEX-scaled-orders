import {
  createProfitTarget,
  createScaledOrders,
  DistributionProps,
  DISTRIBUTIONS,
  MarketOrderProps,
  ProfitTargetProps,
} from 'util/index';
import {withPayloadType, createThunk, ThunkApiConfig, formatErrorMessage} from 'redux/helpers/actionHelpers';
import {
  SHOW_PREVIEW,
  TOGGLE_PREVIEW,
  PreviewState,
  PREVIEW_POST_ORDER,
  GET_BALANCE,
  PreviewActions,
  PREVIEW_POST_MARKET_ORDER,
  ADD_PROFIT_TARGET,
  REMOVE_PROFIT_TARGET,
} from './types';
import {AsyncThunk, createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';

export const defaultState: PreviewState = {
  orders: {orders: [], stop: {}},
  profitTargets: [],
  balance: 0,
  showPreview: false,
  previewLoading: false,
  error: '',
};

export const postMarketOrder = createThunk<MarketOrderProps>(PREVIEW_POST_MARKET_ORDER, 'postMarketOrder');

type PostScaledOrdersProps = {ordersProps: DistributionProps; distribution: DISTRIBUTIONS};
// export const postScaledOrders = createThunk<PostScaledOrdersProps>(PREVIEW_POST_ORDER, 'postBulkOrders');

export const postScaledOrders: AsyncThunk<any, PostScaledOrdersProps, ThunkApiConfig> = createAsyncThunk(
  PREVIEW_POST_ORDER,
  async (_payload, {rejectWithValue, extra: API, getState}) => {
    try {
      const apiMethod = 'postBulkOrders';

      const scaledOrders = createScaledOrders(_payload);
      if (_payload.ordersProps.stop) {
        scaledOrders.orders.push(scaledOrders.stop as any);
      }
      const {profitTargets} = getState().preview;
      if (profitTargets.length) {
        scaledOrders.orders.push(...profitTargets);
      }

      return await API[apiMethod](scaledOrders);
    } catch (err) {
      return rejectWithValue(formatErrorMessage(err));
    }
  },
);

export const getBalance = createThunk<string, {walletBalance: number}>(GET_BALANCE, 'getBalance');

export const previewToggle = createAction(TOGGLE_PREVIEW);

const previewShow = createAction(SHOW_PREVIEW, withPayloadType<PreviewActions.SHOW_PREVIEW>());
export const previewOrders = (ordersProps: DistributionProps, distribution: DISTRIBUTIONS): Action =>
  previewShow(createScaledOrders({ordersProps, distribution}));

const addProfitTargetAction = createAction(ADD_PROFIT_TARGET, withPayloadType<PreviewActions.ADD_PROFIT_TARGET>());
export const addProfitTarget = (props: ProfitTargetProps) => addProfitTargetAction(createProfitTarget(props));

const removeProfitTargetAction = createAction(REMOVE_PROFIT_TARGET, withPayloadType<number>());
export const removeProfitTarget = (price: number) => removeProfitTargetAction(price);

export const previewReducer = createReducer<PreviewState>(defaultState, (builder) =>
  builder
    .addCase(postScaledOrders.pending, (state) => {
      return {...state, previewLoading: true, error: ''};
    })
    .addCase(postScaledOrders.fulfilled, (state) => {
      return {
        ...state,
        orders: defaultState.orders,
        showPreview: false,
        previewLoading: false,
        error: '',
        profitTargets: [],
      };
    })
    .addCase(postScaledOrders.rejected, (state, {payload}) => {
      return {
        ...state,
        orders: defaultState.orders,
        showPreview: false,
        previewLoading: false,
        error: payload ?? '',
        profitTargets: [],
      };
    })
    .addCase(postMarketOrder.fulfilled, (state) => {
      return {...state, previewLoading: false, error: ''};
    })
    .addCase(getBalance.fulfilled, (state, {payload}) => {
      return {...state, balance: payload.walletBalance};
    })
    .addCase(getBalance.rejected, (state, {payload}) => {
      return {...state, orders: defaultState.orders, showPreview: false, previewLoading: false, error: payload ?? ''};
    })
    .addCase(previewShow, (state, {payload}) => {
      return {...state, orders: payload, showPreview: true, error: '', profitTargets: []};
    })
    .addCase(previewToggle, (state) => {
      return {...state, showPreview: !state.showPreview, error: '', profitTargets: []};
    })
    .addCase(addProfitTargetAction, (state, {payload}) => {
      return {...state, profitTargets: [...state.profitTargets, payload], error: ''};
    })
    .addCase(removeProfitTargetAction, (state, {payload}) => {
      return {...state, profitTargets: state.profitTargets.filter((target) => target.stopPx !== payload), error: ''};
    }),
);
