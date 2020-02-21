// Actions
export const ORDER_SUCCESS = "preview/success";
export const ORDER_ERROR = "preview/error";
export const ORDER_LOADING = "preview/loading";
//
export const SHOW_PREVIEW = "preview/preview_show";
export const SWITCH_PREVIEW = "preview/preview_switch";
//
export const BALANCE_SUCCESS = "preview/balance_success";
// Action Types
interface OrderLoading {
  type: typeof ORDER_LOADING;
}
interface OrderSuccess {
  type: typeof ORDER_SUCCESS;
  payload: any;
}
interface OrderError {
  type: typeof ORDER_ERROR;
  payload: string;
}
interface ShowPreview {
  type: typeof SHOW_PREVIEW;
  payload: any; //{ orders: object[] };
}
interface SwitchPreview {
  type: typeof SWITCH_PREVIEW;
}

interface BalanceSuccess {
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
  message: string;
}
