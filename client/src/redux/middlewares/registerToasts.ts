import {AsyncThunk} from '@reduxjs/toolkit';
import {Store} from 'redux';
import {showToast, ToastPreset} from 'components';
import {postMarketOrder, postScaledOrders} from 'redux/modules/preview/previewModule';
import {cancelTrailingOrder, ammendTrailingOrder, postTrailingOrder} from 'redux/modules/trailing/trailingModule';
import {postMarketOrder as crossPostMarketOrder} from 'redux/modules/cross/crossModule';
import {AppState} from 'redux/models/state';

interface RegisteredToasts {
  [key: string]: (store: Store<AppState>, action: Action) => void;
}

interface RequestTypes {
  REQUEST?: (store: Store<AppState>, action: Action) => void;
  SUCCESS?: (store: Store<AppState>, action: Action) => void;
  FAILURE?: (store: Store<AppState>, action: Action) => void;
}

interface ThunkToasts {
  [key: string]: (store: Store<AppState>, action: Action) => void;
}

function buildThunkToasts<R, T, C>(thunk: AsyncThunk<R, T, C>, requestTypes: RequestTypes): ThunkToasts {
  const {REQUEST, SUCCESS, FAILURE} = requestTypes;

  const request = REQUEST ? {[thunk.pending.type]: REQUEST} : null;
  const success = SUCCESS ? {[thunk.fulfilled.type]: SUCCESS} : null;
  const failure = FAILURE ? {[thunk.rejected.type]: FAILURE} : null;

  return {...request, ...success, ...failure};
}

const PostMarketOrderToasts = buildThunkToasts(postMarketOrder, {
  SUCCESS: () => showToast('Submitted Market Order'),
  FAILURE: (store, action) => showToast(`Market order: ${action.payload}`, 'error'),
});

//  TODO: MERGE WITH PostMarketOrderToasts
const CrossPostMarketOrderToasts = buildThunkToasts(crossPostMarketOrder, {
  SUCCESS: () => showToast('Submitted Market Order'),
  FAILURE: (store, action) => showToast(`Market order: ${action.payload}`, 'error'),
});

const PostScaledOrdersToasts = buildThunkToasts(postScaledOrders, {
  SUCCESS: () => showToast('Submitted Scaled Orders'),
  FAILURE: (store, action) => showToast(`Scaled orders: ${action.payload}`, 'error'),
});

const PostTrailingOrderToasts = buildThunkToasts(postTrailingOrder, {
  SUCCESS: (store, action) => {
    const {text, price, success} = action.payload;

    const isOrderSubmitted = success === 200;
    const isOrderPlaced = text === 'best_order';
    const toastDisplay: {message: string; preset: ToastPreset} =
      isOrderSubmitted && isOrderPlaced
        ? {message: `Trailing Order placed at ${price}`, preset: 'success'}
        : {message: `Trailing order: Post only - order cancelled.`, preset: 'warning'};

    showToast(toastDisplay.message, toastDisplay.preset);
  },
  FAILURE: () => showToast('Order posting error.', 'error'),
});

const CancelTrailingOrderToasts = buildThunkToasts(cancelTrailingOrder, {
  SUCCESS: () => showToast('Trailing Order Canceled', 'success'),
  FAILURE: () => showToast('Failed to Cancel Trailing Order', 'error'),
});

const AmmendTrailingOrderToasts = buildThunkToasts(ammendTrailingOrder, {
  FAILURE: () => showToast('Order ammending error.', 'error'),
});

export const registeredToasts: RegisteredToasts = {
  ...CrossPostMarketOrderToasts,
  ...PostMarketOrderToasts,
  ...PostScaledOrdersToasts,
  ...PostTrailingOrderToasts,
  ...CancelTrailingOrderToasts,
  ...AmmendTrailingOrderToasts,
};
