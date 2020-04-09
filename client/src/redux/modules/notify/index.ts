import { MESSAGE, CLEAR, NotifyActionTypes, NotifyState } from "./types";

const initialState = {
  message: "",
  type: ""
};

export const notifyReducer = (
  state: NotifyState = initialState,
  action: NotifyActionTypes
) => {
  switch (action.type) {
    case MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS =======================

export const clearNotifications = () => ({
  type: CLEAR
});
