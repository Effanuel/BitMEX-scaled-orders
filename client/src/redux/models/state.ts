import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { PreviewState } from "../modules/preview/types";

export type Thunk = ThunkAction<void, AppState, undefined, Action<string>>;
//========================================

export interface AppState {
  preview: PreviewState;
  websocket: WebsocketState;
}

interface WebsocketDataResponse {
  action: string;
  data: any;
}

export interface WebsocketState {
  __keys?: any;
  instrument?: any;
  order?: any;
  connected?: boolean;
  loading?: boolean;
  message?: string;
  error?: string;
  symbol?: string;
}
