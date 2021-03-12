import {AsyncThunk} from '@reduxjs/toolkit';
import {showToast, ToastPreset} from 'components';
import {postMarketOrder, postOrderBulk} from 'redux/modules/preview/previewModule';
import {cancelTrailingOrder, ammendTrailingOrder, postTrailingOrder} from 'redux/modules/trailing/trailingModule';
import {postMarketCrossOrder as crossPostMarketOrder} from 'redux/modules/cross/crossModule';
import {addProfitTarget, cancelOrder} from 'redux/modules/orders/ordersModule';

type RequestFunction = (action: Action) => void;
type ThunkToasts = {[key: string]: RequestFunction};

interface RequestTypes {
  REQUEST?: RequestFunction;
  SUCCESS?: RequestFunction;
  FAILURE?: RequestFunction;
}

function buildThunkToasts<R, T, C>(thunk: AsyncThunk<R, T, C>, requestTypes: RequestTypes): ThunkToasts {
  const {REQUEST, SUCCESS, FAILURE} = requestTypes;

  const request = REQUEST ? {[thunk.pending.type]: REQUEST} : {};
  const success = SUCCESS ? {[thunk.fulfilled.type]: SUCCESS} : {};
  const failure = FAILURE ? {[thunk.rejected.type]: FAILURE} : {};

  return {...request, ...success, ...failure};
}

const PostTrailingOrderSuccess = (action: Action) => {
  const {statusCode, data} = action.payload;
  const {text, price} = data;

  const isOrderSubmitted = statusCode === 200;
  const isOrderPlaced = text === 'best_order';

  const toastDisplay: {message: string; preset: ToastPreset} =
    isOrderSubmitted && isOrderPlaced
      ? {message: `Trailing Order placed at ${price}`, preset: 'success'}
      : {message: `Trailing order: Post only - order cancelled.`, preset: 'warning'};

  showToast(toastDisplay.message, toastDisplay.preset);
};

export const registeredToasts: ThunkToasts = {
  ...buildThunkToasts(crossPostMarketOrder, {
    SUCCESS: () => showToast('Submitted Market Order'),
    FAILURE: (action) => showToast(`Market order: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(crossPostMarketOrder, {
    SUCCESS: () => showToast('Submitted Market Order'),
    FAILURE: (action) => showToast(`Market order: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(postOrderBulk, {
    SUCCESS: () => showToast('Submitted Scaled Orders'),
    FAILURE: (action) => showToast(`Scaled orders: ${action.payload}`, 'error'),
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
    FAILURE: (action) => showToast(`Market order: ${action.payload}`, 'error'),
  }),
  ...buildThunkToasts(ammendTrailingOrder, {
    FAILURE: () => showToast('Order ammending error.', 'error'),
  }),
  ...buildThunkToasts(cancelOrder, {
    SUCCESS: () => showToast('Order was cancelled.'),
    FAILURE: (action) => showToast(`Cancel Order: ${action.payload}`, 'warning'),
  }),
  ...buildThunkToasts(addProfitTarget, {
    SUCCESS: (action) => showToast(`Profit target at price ${action.payload.data.price} was placed`),
    FAILURE: () => showToast(`Failed to add profit target order.`, 'warning'),
  }),
};
