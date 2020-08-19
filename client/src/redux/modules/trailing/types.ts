import {SIDE, SYMBOLS} from 'util/BitMEX-types';

export const POST_TRAILING_ORDER = 'trailing/POST_TRAILING_ORDER';
export const PUT_TRAILING_ORDER = 'trailing/PUT_TRAILING_ORDER';
export const DELETE_TRAILING_ORDER = 'trailing/DELETE_TRAILING_ORDER';

export const CHANGE_TRAILING_ORDER_SYMBOL = 'trailing/CHANGE_TRAILING_ORDER_SYMBOL';

export const __CLEAR_TRAILING_ORDER = 'trailing/__CLEAR_TRAILING_ORDER';

export interface TrailingState {
  trailOrderId: string;
  trailOrderPrice: number;
  trailOrderStatus: string;
  trailOrderSide: SIDE;
  trailOrderSymbol: SYMBOLS;
  trailLoading: boolean;
}

export const ACTIONS_trailing = [POST_TRAILING_ORDER, PUT_TRAILING_ORDER, DELETE_TRAILING_ORDER] as const;
