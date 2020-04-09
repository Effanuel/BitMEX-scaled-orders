export const POST_ORDER = "best_price/post";
export const PUT_ORDER = "best_price/put";
export const __CLEAR_BEST_ORDER = "best_price/__clear";
export const LOADING = "best_price/loading";
//=========
export const PUT_ORDER_ERROR = "best_price/putError";
export const POST_ORDER_ERROR = "best_price/postError";

interface PostOrder {
  type: typeof POST_ORDER;
  payload: any;
}
interface PutOrder {
  type: typeof PUT_ORDER;
  payload: any;
}
interface __ClearBestOrder {
  type: typeof __CLEAR_BEST_ORDER;
}
interface Loading {
  type: typeof LOADING;
}
interface PutOrderError {
  type: typeof PUT_ORDER_ERROR;
}

interface PostOrderError {
  type: typeof POST_ORDER_ERROR;
  payload: any;
}

export type BestPriceActionTypes =
  | PostOrder
  | PutOrder
  | __ClearBestOrder
  | Loading
  | PutOrderError
  | PostOrderError;

export interface BestPriceState {
  bestOrderID: string;
  price: number;
  limit: number;
  status: string;
  loading: boolean;
}
