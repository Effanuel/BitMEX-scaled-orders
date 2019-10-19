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
