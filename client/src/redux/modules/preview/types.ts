import { CreateAction, CreateNoPayloadAction } from '../../helpers/helperTypes';
import { ScaledOrders } from 'util/index';
import { PostOrderSuccess } from './index';

export const ORDER_SUCCESS = 'preview/ORDER_SUCCESS';
export const ORDER_ERROR = 'preview/ORDER_ERROR';
export const ORDER_LOADING = 'preview/ORDER_LOADING';

export const SHOW_PREVIEW = 'preview/SHOW_PREVIEW';
export const SWITCH_PREVIEW = 'preview/SWITCH_PREVIEW';

export const BALANCE_SUCCESS = 'preview/BALANCE_SUCCESS';

export type PreviewActions =
  | CreateAction<typeof ORDER_SUCCESS, PostOrderSuccess>
  | CreateAction<typeof ORDER_ERROR, string>
  | CreateNoPayloadAction<typeof ORDER_LOADING>
  | CreateAction<typeof SHOW_PREVIEW, ScaledOrders>
  | CreateNoPayloadAction<typeof SWITCH_PREVIEW>
  | CreateAction<typeof BALANCE_SUCCESS, number>;

export interface PreviewState {
  orders: ScaledOrders;
  balance: number;
  error: string;
  showPreview: boolean;
  loading: boolean;
}
