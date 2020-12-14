import {AsyncThunk} from '@reduxjs/toolkit';
import {Store} from 'redux';
import {showToast, ToastPreset} from 'components';
import {postMarketOrder, postScaledOrders} from 'redux/modules/preview/previewModule';
import {cancelTrailingOrder, ammendTrailingOrder, postTrailingOrder} from 'redux/modules/trailing/trailingModule';
import {postMarketOrder as crossPostMarketOrder} from 'redux/modules/cross/crossModule';
import {AppState} from 'redux/models/state';

type RequestFunction = (store: Store<AppState>, action: Action) => void;

interface RequestTypes {
  REQUEST?: RequestFunction;
  SUCCESS?: RequestFunction;
  FAILURE?: RequestFunction;
}

function buildThunkToasts<R, T, C>(
  thunk: AsyncThunk<R, T, C>,
  requestTypes: RequestTypes,
): {[key: string]: RequestFunction} {
  const {REQUEST, SUCCESS, FAILURE} = requestTypes;

  const request = REQUEST ? {[thunk.pending.type]: REQUEST} : {};
  const success = SUCCESS ? {[thunk.fulfilled.type]: SUCCESS} : {};
  const failure = FAILURE ? {[thunk.rejected.type]: FAILURE} : {};

  return {...request, ...success, ...failure};
}

const PostTrailingOrderSuccess = (store: Store<AppState>, action: Action) => {
  const {text, price, success} = action.payload;

  const isOrderSubmitted = success === 200;
  const isOrderPlaced = text === 'best_order';
  const toastDisplay: {message: string; preset: ToastPreset} =
    isOrderSubmitted && isOrderPlaced
      ? {message: `Trailing Order placed at ${price}`, preset: 'success'}
      : {message: `Trailing order: Post only - order cancelled.`, preset: 'warning'};

  showToast(toastDisplay.message, toastDisplay.preset);
};

type RegisteredToasts = {[key: string]: (store: Store<AppState>, action: Action) => void};

export const registeredToasts: RegisteredToasts = {
  ...buildThunkToasts(crossPostMarketOrder, {
    SUCCESS: () => showToast('Submitted Market Order'),
    FAILURE: (store, action) => showToast(`Market order: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(crossPostMarketOrder, {
    SUCCESS: () => showToast('Submitted Market Order'),
    FAILURE: (store, action) => showToast(`Market order: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(postScaledOrders, {
    SUCCESS: () => showToast('Submitted Scaled Orders'),
    FAILURE: (store, action) => showToast(`Scaled orders: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(postTrailingOrder, {
    SUCCESS: PostTrailingOrderSuccess,
    FAILURE: () => showToast('Order posting error.', 'error'),
  }),
  ...buildThunkToasts(cancelTrailingOrder, {
    SUCCESS: () => showToast('Trailing Order Canceled', 'success'),
    FAILURE: () => showToast('Failed to Cancel Trailing Order', 'error'),
  }),
  ...buildThunkToasts(postMarketOrder, {
    SUCCESS: () => showToast('Submitted Market Order'),
    FAILURE: (store, action) => showToast(`Market order: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(ammendTrailingOrder, {
    FAILURE: () => showToast('Order ammending error.', 'error'),
  }),
};
