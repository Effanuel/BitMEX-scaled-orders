import { CreateAction, CreateNoPayloadAction } from "../../helpers/helperTypes";

export const MESSAGE = "notify/MESSAGE";
export const CLEAR = "notify/CLEAR";

export type NotifyActions =
  | CreateAction<typeof MESSAGE, any>
  | CreateNoPayloadAction<typeof CLEAR>;

export interface NotifyState {
  message: string;
  type: string;
}
