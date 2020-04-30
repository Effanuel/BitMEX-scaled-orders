import { createAction } from "../../helpers/helperTypes";

export const MESSAGE = "notify/MESSAGE";
export const CLEAR = "notify/CLEAR";

export type NotifyActionTypes =
  | createAction<typeof MESSAGE, any>
  | createAction<typeof CLEAR>;

export interface NotifyState {
  message: string;
  type: string;
}
