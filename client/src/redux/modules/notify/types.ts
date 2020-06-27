import { CreateAction, CreateNoPayloadAction } from '../../helpers/helperTypes';

export const MESSAGE = 'notify/MESSAGE';
export const CLEAR = 'notify/CLEAR';

export type NotifyActions = CreateAction<typeof MESSAGE, NotifyState> | CreateNoPayloadAction<typeof CLEAR>;

export enum NotifyType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  None = '',
}

export interface NotifyState {
  message: string;
  type: NotifyType;
}
