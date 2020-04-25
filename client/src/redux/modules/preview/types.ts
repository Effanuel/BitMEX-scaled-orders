import { Action } from "redux";

// Actions
export const ORDER_SUCCESS = "preview/ORDER_SUCCESS";
export const ORDER_ERROR = "preview/ORDER_EREROR";
export const ORDER_LOADING = "preview/ORDER_LOADING";
//
export const SHOW_PREVIEW = "preview/SHOW_PREVIEW";
export const SWITCH_PREVIEW = "preview/SWITCH_PREVIEW";
//
export const BALANCE_SUCCESS = "preview/BALANCE_SUCCESS";
// Action Types
interface OrderLoading extends Action {
  type: typeof ORDER_LOADING;
}
interface OrderSuccess extends Action {
  type: typeof ORDER_SUCCESS;
  payload: any;
}
interface OrderError extends Action {
  type: typeof ORDER_ERROR;
  payload: any;
}
interface ShowPreview extends Action {
  type: typeof SHOW_PREVIEW;
  payload: any; //{ orders: object[] };
}
interface SwitchPreview extends Action {
  type: typeof SWITCH_PREVIEW;
}
interface BalanceSuccess extends Action {
  type: typeof BALANCE_SUCCESS;
  payload: any;
}

export type PreviewActionTypes =
  | OrderLoading
  | OrderSuccess
  | OrderError
  | ShowPreview
  | SwitchPreview
  | BalanceSuccess;
// State
export interface PreviewState {
  orders: any;
  balance: number;
  error: string;
  showPreview: boolean;
  loading: boolean;
}
