export type PickEventScaled = Pick<AppComponentState, keyof AppComponentState>;

export type AppComponentState = {
  quantity?: string | number;
  n_tp?: string | number;
  start?: string | number;
  end?: string | number;
  stop?: string | number;
  distribution?: string | number;
  side?: string;
  symbol?: string;
};

export type AppComponentProps = {
  showPreview?: boolean;
  error?: string;
  wsError?: string;
  wsCurrentPrice?: string;
  loading?: boolean;
  loadingreq?: boolean;
  connected?: boolean;
  message: any;
  //
  postOrder: (payload: object) => void;
  previewOrders: (payload: object) => void;
  wsConnect: () => void;
  wsDisconnect: () => void;
  wsPriceSubscribe: (payload: string) => void;
  wsTickerChange: (payload: any) => void;
};
