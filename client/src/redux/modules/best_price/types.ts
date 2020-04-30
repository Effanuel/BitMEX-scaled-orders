import { createAction } from "../../helpers/helperTypes";

export const POST_ORDER = "best_price/POST_ORDER";
export const POST_ORDER_ERROR = "best_price/POST_RODER_ERROR";

export const PUT_ORDER = "best_price/PUT_ORDER";
export const PUT_ORDER_ERROR = "best_price/PUT_ORDER_ERROR";

export const __CLEAR_BEST_ORDER = "best_price/__CLEAR_BEST_ORDER";

export const LOADING = "best_price/LOADING";

export type BestPriceActionTypes =
  | createAction<typeof POST_ORDER, any>
  | createAction<typeof POST_ORDER_ERROR, any>
  | createAction<typeof PUT_ORDER, any>
  | createAction<typeof PUT_ORDER_ERROR, any>
  | createAction<typeof __CLEAR_BEST_ORDER>
  | createAction<typeof LOADING>;

export type PostOrder = createAction<typeof POST_ORDER, any>;

export interface BestPriceState {
  bestOrderID: string;
  price: number;
  limit: number;
  status: string;
  loading: boolean;
}
