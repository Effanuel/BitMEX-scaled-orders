import { MESSAGE, CLEAR, NotifyActions, NotifyState } from "./types";
import { ActionCreator, Reducer } from "redux";

const initialState = {
  message: "",
  type: "",
};

export const notifyReducer: Reducer<NotifyState, NotifyActions> = (
  state = initialState,
  action
) => {
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
