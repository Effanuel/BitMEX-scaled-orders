// Actions
export const ORDER_SUCCESS = "preview/success";
export const ORDER_ERROR = "preview/error";
export const ORDER_LOADING = "preview/loading";
//
export const SHOW_PREVIEW = "preview/preview_show";
export const SWITCH_PREVIEW = "preview/preview_close";

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
export type PreviewActionTypes =
  | OrderLoading
  | OrderSuccess
  | OrderError
  | ShowPreview
  | SwitchPreview;
// State
export interface PreviewState {
  orders: any;
  error: string;
  showPreview: boolean;
  loading: boolean;
}
