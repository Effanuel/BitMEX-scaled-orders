import {SIDE} from 'util/BitMEX-types';
import {registerApiActions} from 'redux/helpers/actionHelpers';

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

registerApiActions(BEST_POST_ORDER, BEST_PUT_ORDER);
