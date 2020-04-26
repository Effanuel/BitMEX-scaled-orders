import { Action } from "redux";

export const MESSAGE = "notify/MESSAGE";
export const CLEAR = "notify/CLEAR";

interface Message extends Action {
  type: typeof MESSAGE;
  payload: any;
}
interface Clear extends Action {
  type: typeof CLEAR;
}

export type NotifyActionTypes = Message | Clear;

export interface NotifyState {
  message: string;
  type: string;
}
