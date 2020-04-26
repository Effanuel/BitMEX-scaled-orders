import { MESSAGE, CLEAR, NotifyActionTypes, NotifyState } from "./types";
import { ActionCreator, Reducer } from "redux";

const initialState = {
  message: "",
  type: "",
};

export const notifyReducer: Reducer<NotifyState, NotifyActionTypes> = (
  state: NotifyState = initialState,
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

export const clearNotifications: ActionCreator<NotifyActionTypes> = () => ({
  type: CLEAR,
});
