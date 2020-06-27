// Main type for different order types

export interface orderType {
  orderID: string;
  clOrdID: string;
  //   clOrdLinkID: string; // Deprecated
  account: number;
  symbol: SYMBOLS;
  side: SIDE;
  //   simpleOrderQty: number; // Deprecated
  orderQty: number;
  price: number;
  displayQty: number;
  stopPx: number;
  pegOffsetValue: number;
  pegPriceType: pegPriceType;
  currency: string;
  settlCurrency: string;
  ordType: ordType;
  timeInForce: timeInForce;
  execInst: string;
  //   contingencyType: string; // Deprecated
  exDestination: string;
  ordStatus: string;
  triggered: string;
  workingIndicator: true;
  ordRejReason: string;
  simpleLeavesQty: number;
  leavesQty: number;
  simpleCumQty: number;
  cumQty: number;
  avgPx: number;
  multiLegReportingType: string;
  text: string;
  transactTime: string;
  timestamp: string;
}

type pegPriceType = 'LastPeg' | 'MidPricePeg' | 'MarketPeg' | 'PrimaryPeg' | 'TrailingStopPeg';

type timeInForce = 'Day' | 'GoodTillCancel' | 'ImmediateOrCancel' | 'FillOrKill';

type ordType = 'Market' | 'Limit' | 'Stop' | 'StopLimit' | 'MarketIfTouched' | 'LimitIfTouched' | 'Pegged';

export enum SYMBOLS {
  XBTUSD = 'XBTUSD',
  ETHUSD = 'ETHUSD',
  XRPUSD = 'XRPUSD',
}

export enum SIDE {
  SELL = 'Sell',
  BUY = 'Buy',
}

export type SUBSCRIPTION_TOPICS =
  | 'announcement'
  | 'chat'
  | 'connected'
  | 'funding'
  | 'instrument'
  | 'insurance'
  | 'liquidation'
  | 'orderBookL2_25'
  | 'orderBookL2'
  | 'orderBook10'
  | 'publicNotifications'
  | 'quote'
  | 'quoteBin1m'
  | 'quoteBin5m'
  | 'quoteBin1h'
  | 'quoteBin1d'
  | 'settlement'
  | 'trade'
  | 'tradeBin1m'
  | 'tradeBin5m'
  | 'tradeBin1h'
  | 'tradeBin1d'
  | 'affiliate'
  | 'execution'
  | 'order'
  | 'margin'
  | 'position'
  | 'privateNotifications'
  | 'transact'
  | 'wallet';
