// export type PickEventScaled = Pick<State, keyof State>;

export type Comp = {
  quantity: any;
  entry: any;
  target: any;
  stop: any;
  side: any;
  symbol: any;
  [key: string]: any;
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
