import {ScaledOrders} from 'util/index';
import {registerApiActions} from 'redux/helpers/actionHelpers';

export const PREVIEW_POST_ORDER = 'preview/POST_ORDER';
export const GET_BALANCE = 'preview/GET_BALANCE';

export const SHOW_PREVIEW = 'preview/SHOW_PREVIEW';
export const SWITCH_PREVIEW = 'preview/SWITCH_PREVIEW';

export interface PreviewState {
  orders: ScaledOrders;
  balance: number;
  error: string;
  showPreview: boolean;
  loading: boolean;
}

registerApiActions(PREVIEW_POST_ORDER, GET_BALANCE);
