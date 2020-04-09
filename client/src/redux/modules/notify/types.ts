export const MESSAGE = "notify/message";
export const CLEAR = "notify/clear";

interface Message {
  type: typeof MESSAGE;
  payload: any;
}
interface Clear {
  type: typeof CLEAR;
}

export type NotifyActionTypes = Message | Clear;

export interface NotifyState {
  message: string;
  type: string;
}
