import { Action } from "redux";

export const POST_ORDER = "best_price/POST_ORDER";
export const POST_ORDER_ERROR = "best_price/POST_RODER_ERROR";

export const PUT_ORDER = "best_price/PUT_ORDER";
export const PUT_ORDER_ERROR = "best_price/PUT_ORDER_ERROR";

export const __CLEAR_BEST_ORDER = "best_price/__CLEAR_BEST_ORDER";

export const LOADING = "best_price/LOADING";
//=========

export interface PostOrder extends Action {
  type: typeof POST_ORDER;
  payload: any;
}
interface PostOrderError extends Action {
  type: typeof POST_ORDER_ERROR;
  payload: any;
}
interface PutOrder extends Action {
  type: typeof PUT_ORDER;
  payload: any;
}
interface PutOrderError extends Action {
  type: typeof PUT_ORDER_ERROR;
}
interface __ClearBestOrder extends Action {
  type: typeof __CLEAR_BEST_ORDER;
}
interface Loading extends Action {
  type: typeof LOADING;
}

export type BestPriceActionTypes =
  | PostOrder
  | PostOrderError
  | PutOrder
  | PutOrderError
  | __ClearBestOrder
  | Loading;

export interface BestPriceState {
  bestOrderID: string;
  price: number;
  limit: number;
  status: string;
  loading: boolean;
}
