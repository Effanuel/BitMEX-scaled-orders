import {showToast, ToastPreset} from 'components';
import {SUCCESS, FAILURE} from 'redux/helpers/actionHelpers';
import {PREVIEW_POST_MARKET_ORDER, PREVIEW_POST_ORDER} from 'redux/modules/preview/types';
import {POST_TRAILING_ORDER, PUT_TRAILING_ORDER, DELETE_TRAILING_ORDER} from 'redux/modules/trailing/types';
import {AppState} from 'redux/store';
import {Store} from 'redux';

interface RegisteredToasts {
  [key: string]: (store: Store<AppState>, action: Action) => void;
}

export const registeredToasts: RegisteredToasts = {
  [SUCCESS[PREVIEW_POST_MARKET_ORDER].type]: () => {
    showToast('Submitted Market Order');
  },
  [FAILURE[PREVIEW_POST_MARKET_ORDER].type]: (store: Store<AppState>, action: Action) => {
    showToast(`Market order: ${action.payload}`, 'error');
  },
  [SUCCESS[PREVIEW_POST_ORDER].type]: () => {
    showToast('Submitted Scaled Orders');
  },
  [FAILURE[PREVIEW_POST_ORDER].type]: (store: Store<AppState>, action: Action) => {
    showToast(`Scaled orders: ${action.payload}`, 'error');
  },
  [SUCCESS[POST_TRAILING_ORDER].type]: (store: Store<AppState>, action: Action) => {
    const {text, price, success} = action.payload;

    const isOrderSubmitted = success === 200;
    const isOrderPlaced = text === 'best_order';
    const toastDisplay: {message: string; preset: ToastPreset} =
      isOrderSubmitted && isOrderPlaced
        ? {message: `Trailing Order placed  at ${price}`, preset: 'success'}
        : {message: `Trailing order: Post only - order cancelled.`, preset: 'warning'};

    showToast(toastDisplay.message, toastDisplay.preset);
  },
  [SUCCESS[DELETE_TRAILING_ORDER].type]: () => {
    showToast('Trailing Order Canceled', 'success');
  },
  [FAILURE[DELETE_TRAILING_ORDER].type]: () => {
    showToast('Failed to Cancel Trailing Order', 'error');
  },
  [FAILURE[POST_TRAILING_ORDER].type]: () => {
    showToast('Order posting error.', 'error');
  },
  [FAILURE[PUT_TRAILING_ORDER].type]: () => {
    showToast('Order ammending error.', 'error');
  },
  [FAILURE[PREVIEW_POST_ORDER].type]: (store: Store<AppState>, action: Action) => {
    showToast(action.payload, 'error');
  },
};
