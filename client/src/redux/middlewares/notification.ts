import {PREVIEW_POST_ORDER} from '../modules/preview/types';
import {MESSAGE} from '../modules/notify/types';

import {NotifyType} from '../modules/notify/types';
import {FAILURE, SUCCESS} from 'redux/helpers/actionHelpers';
import {BEST_POST_ORDER} from 'redux/modules/best-price/types';

export interface Notification {
  message: string;
  type: NotifyType;
}

function handleSuccessActions({payload: {success, text, from}}: any) {
  const isOrderPlaced = success === 200 && !text.includes('Cancel');

  const {message, type} = isOrderPlaced
    ? {message: from, type: NotifyType.success}
    : {message: 'Order cancelled', type: NotifyType.warning};

  return {message, type};
}

function handleErrorActions({payload: {message, type}}: any) {
  return {message, type};
}

export const notificationMessage = (action: any): Notification => {
  switch (action.type) {
    case SUCCESS[PREVIEW_POST_ORDER]:
    case SUCCESS[BEST_POST_ORDER]:
      return handleSuccessActions(action);
    case FAILURE[PREVIEW_POST_ORDER]:
    case FAILURE[BEST_POST_ORDER]:
      return handleErrorActions(action);
    default:
      return {message: '', type: NotifyType.None};
  }
};

export default ({dispatch}: any) => (next: any) => (action: Action) => {
  const payload = notificationMessage(action);
  if (payload.message !== '') {
    dispatch({type: MESSAGE, payload});
  }

  next(action);
};
