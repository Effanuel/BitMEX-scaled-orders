import { MESSAGE, CLEAR, NotifyActions, NotifyState, NotifyType } from './types';
import { Reducer } from 'redux';

const initialState = {
  message: '',
  type: NotifyType.None,
};

export const notifyReducer: Reducer<NotifyState, NotifyActions> = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS =======================

export const clearNotifications = (): NotifyActions => ({
  type: CLEAR,
});
