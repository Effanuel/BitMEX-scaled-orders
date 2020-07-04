import {SIDE} from 'util/BitMEX-types';

export const BEST_POST_ORDER = 'best_price/BEST_POST_ORDER';
export const BEST_PUT_ORDER = 'best_price/BEST_PUT_ORDER';

export const __CLEAR_BEST_ORDER = 'best_price/__CLEAR_BEST_ORDER';

export interface BestPriceState {
  bestOrderID: string;
  price: number;
  limit: number;
  status: string;
  side: SIDE;
  loading: boolean;
}

export const best_price_apiActions = [BEST_POST_ORDER, BEST_PUT_ORDER] as const;
