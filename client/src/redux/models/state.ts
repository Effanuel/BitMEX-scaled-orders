import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type Thunk = ThunkAction<void, any, any, Action<string>>;
//========================================

export interface AppState {
  preview: PreviewState;
  websocket: WebsocketState;
}

export interface PreviewState {
  orders: any;
  error: string;
  showPreview: boolean;
  loading: boolean;
}

interface WebsocketDataResponse {
  action: string;
  data: any;
}

export interface WebsocketState {
  data: WebsocketDataResponse | any;
  connected: boolean;
  loading: boolean;
  error: string;
}
