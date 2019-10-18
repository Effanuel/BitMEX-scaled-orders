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

export interface WebsocketState {
  data: object;
  connected: boolean;
  loading: boolean;
  error: string;
}
