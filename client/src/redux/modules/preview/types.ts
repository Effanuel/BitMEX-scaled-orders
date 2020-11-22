import {ProfitTarget, ScaledOrders} from 'util/index';

export const PREVIEW_POST_ORDER = 'preview/POST_ORDER';
export const PREVIEW_POST_MARKET_ORDER = 'preview/POST_MARKET_ORDER';
export const GET_BALANCE = 'preview/GET_BALANCE';

export const SHOW_PREVIEW = 'preview/SHOW_PREVIEW';
export const TOGGLE_PREVIEW = 'preview/SWITCH_PREVIEW';
export const ADD_PROFIT_TARGET = 'preview/ADD_PROFIT_TARGET';
export const REMOVE_PROFIT_TARGET = 'preview/REMOVE_PROFIT_TARGET';

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace PreviewActions {
  type SHOW_PREVIEW = ScaledOrders;
  type ADD_PROFIT_TARGET = ProfitTarget;
}

export interface PreviewState {
  orders: ScaledOrders;
  profitTargets: ProfitTarget[];
  balance: number;
  error: string;
  showPreview: boolean;
  previewLoading: boolean;
}

export const ACTIONS_preview = [GET_BALANCE, PREVIEW_POST_ORDER, PREVIEW_POST_MARKET_ORDER] as const;
export const API_ACTIONS_preview = [GET_BALANCE] as const;
