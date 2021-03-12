/* tslint:disable */
/* eslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * Public Announcements
 */
export interface Announcement {
  id: number;
  link?: string;
  title?: string;
  content?: string;
  date?: string;
}

export interface Error {
  error: {message?: string; name?: string};
}

/**
 * Persistent API Keys for Developers
 */
export interface APIKey {
  id: string;
  secret: string;
  name: string;
  nonce: number;
  cidr?: string;
  permissions?: XAny[];
  enabled?: boolean;
  userId: number;
  created?: string;
}

/**
 * Trollbox Data
 */
export interface Chat {
  id?: number;
  date: string;
  user: string;
  message: string;
  html: string;
  fromBot?: boolean;
  channelID?: number;
}

export interface ChatChannel {
  id?: number;
  name: string;
}

export interface ConnectedUsers {
  users?: number;
  bots?: number;
}

/**
 * Raw Order and Balance Data
 */
export interface Execution {
  execID?: string;
  orderID?: string;
  clOrdID?: string;
  clOrdLinkID?: string;
  account?: number;
  symbol: string;
  side?: string;
  lastQty?: number;
  lastPx?: number;
  underlyingLastPx?: number;
  lastMkt?: string;
  lastLiquidityInd?: string;
  simpleOrderQty?: number;
  orderQty?: number;
  price?: number;
  displayQty?: number;
  stopPx?: number;
  pegOffsetValue?: number;
  pegPriceType?: string;
  currency?: string;
  settlCurrency?: string;
  execType?: string;
  ordType?: string;
  timeInForce?: string;
  execInst?: string;
  contingencyType?: string;
  exDestination?: string;
  ordStatus?: string;
  triggered?: string;
  workingIndicator?: boolean;
  ordRejReason?: string;
  simpleLeavesQty?: number;
  leavesQty?: number;
  simpleCumQty?: number;
  cumQty?: number;
  avgPx?: number;
  commission?: number;
  tradePublishIndicator?: string;
  multiLegReportingType?: string;
  text?: string;
  trdMatchID?: string;
  execCost?: number;
  execComm?: number;
  homeNotional?: number;
  foreignNotional?: number;
  transactTime?: string;
  timestamp: string;
}

/**
 * Swap Funding History
 */
export interface Funding {
  timestamp: string;
  symbol: string;
  fundingInterval?: string;
  fundingRate?: number;
  fundingRateDaily?: number;
}

/**
 * Tradeable Contracts, Indices, and History
 */
export interface Instrument {
  symbol: string;
  rootSymbol?: string;
  state?: string;
  typ?: string;
  listing?: string;
  front?: string;
  expiry?: string;
  settle?: string;
  listedSettle?: string;
  relistInterval?: string;
  inverseLeg?: string;
  sellLeg?: string;
  buyLeg?: string;
  optionStrikePcnt?: number;
  optionStrikeRound?: number;
  optionStrikePrice?: number;
  optionMultiplier?: number;
  positionCurrency?: string;
  underlying?: string;
  quoteCurrency?: string;
  underlyingSymbol?: string;
  reference?: string;
  referenceSymbol?: string;
  calcInterval?: string;
  publishInterval?: string;
  publishTime?: string;
  maxOrderQty?: number;
  maxPrice?: number;
  lotSize?: number;
  tickSize?: number;
  multiplier?: number;
  settlCurrency?: string;
  underlyingToPositionMultiplier?: number;
  underlyingToSettleMultiplier?: number;
  quoteToSettleMultiplier?: number;
  isQuanto?: boolean;
  isInverse?: boolean;
  initMargin?: number;
  maintMargin?: number;
  riskLimit?: number;
  riskStep?: number;
  limit?: number;
  capped?: boolean;
  taxed?: boolean;
  deleverage?: boolean;
  makerFee?: number;
  takerFee?: number;
  settlementFee?: number;
  insuranceFee?: number;
  fundingBaseSymbol?: string;
  fundingQuoteSymbol?: string;
  fundingPremiumSymbol?: string;
  fundingTimestamp?: string;
  fundingInterval?: string;
  fundingRate?: number;
  indicativeFundingRate?: number;
  rebalanceTimestamp?: string;
  rebalanceInterval?: string;
  openingTimestamp?: string;
  closingTimestamp?: string;
  sessionInterval?: string;
  prevClosePrice?: number;
  limitDownPrice?: number;
  limitUpPrice?: number;
  bankruptLimitDownPrice?: number;
  bankruptLimitUpPrice?: number;
  prevTotalVolume?: number;
  totalVolume?: number;
  volume?: number;
  volume24h?: number;
  prevTotalTurnover?: number;
  totalTurnover?: number;
  turnover?: number;
  turnover24h?: number;
  homeNotional24h?: number;
  foreignNotional24h?: number;
  prevPrice24h?: number;
  vwap?: number;
  highPrice?: number;
  lowPrice?: number;
  lastPrice?: number;
  lastPriceProtected?: number;
  lastTickDirection?: string;
  lastChangePcnt?: number;
  bidPrice?: number;
  midPrice?: number;
  askPrice?: number;
  impactBidPrice?: number;
  impactMidPrice?: number;
  impactAskPrice?: number;
  hasLiquidity?: boolean;
  openInterest?: number;
  openValue?: number;
  fairMethod?: string;
  fairBasisRate?: number;
  fairBasis?: number;
  fairPrice?: number;
  markMethod?: string;
  markPrice?: number;
  indicativeTaxRate?: number;
  indicativeSettlePrice?: number;
  optionUnderlyingPrice?: number;
  settledPriceAdjustmentRate?: number;
  settledPrice?: number;
  timestamp?: string;
}

export interface InstrumentInterval {
  intervals: string[];
  symbols: string[];
}

export type XAny = object;

export interface IndexComposite {
  timestamp: string;
  symbol?: string;
  indexSymbol?: string;
  reference?: string;
  lastPrice?: number;
  sourcePrice?: number;
  conversionIndex?: string;
  conversionIndexPrice?: number;
  weight?: number;
  logged?: string;
}

/**
 * Insurance Fund Data
 */
export interface Insurance {
  currency: string;
  timestamp: string;
  walletBalance?: number;
}

/**
 * Information on Top Users
 */
export interface Leaderboard {
  name: string;
  isRealName?: boolean;
  profit?: number;
}

/**
 * Active Liquidations
 */
export interface Liquidation {
  orderID: string;
  symbol?: string;
  side?: string;
  price?: number;
  leavesQty?: number;
}

/**
 * Account Notifications
 */
export interface GlobalNotification {
  id?: number;
  date: string;
  title: string;
  body: string;
  ttl: number;
  type?: 'success' | 'error' | 'info';
  closable?: boolean;
  persist?: boolean;
  waitForVisibility?: boolean;
  sound?: string;
}

/**
 * Placement, Cancellation, Amending, and History
 */
// Main type for different order types
export interface Order {
  orderID: string;
  clOrdID: string;
  //   clOrdLinkID: string; // Deprecated
  account: number;
  symbol: SYMBOL;
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
  ordType: ORD_TYPE;
  timeInForce: timeInForce;
  execInst: EXEC_INST | string;
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

export interface OrderBookL2 {
  symbol: string;
  id: number;
  side: string;
  size?: number;
  price?: number;
}

/**
 * Summary of Open and Closed Positions
 */
export interface Position {
  account: number;
  symbol: string;
  currency?: string;
  underlying?: string;
  quoteCurrency?: string;
  commission?: number;
  initMarginReq?: number;
  maintMarginReq?: number;
  riskLimit?: number;
  leverage?: number;
  crossMargin?: boolean;
  deleveragePercentile?: number;
  rebalancedPnl?: number;
  prevRealisedPnl?: number;
  prevUnrealisedPnl?: number;
  prevClosePrice?: number;
  openingTimestamp?: string;
  openingQty?: number;
  openingCost?: number;
  openingComm?: number;
  openOrderBuyQty?: number;
  openOrderBuyCost?: number;
  openOrderBuyPremium?: number;
  openOrderSellQty?: number;
  openOrderSellCost?: number;
  openOrderSellPremium?: number;
  execBuyQty?: number;
  execBuyCost?: number;
  execSellQty?: number;
  execSellCost?: number;
  execQty?: number;
  execCost?: number;
  execComm?: number;
  currentTimestamp?: string;
  currentQty?: number;
  currentCost?: number;
  currentComm?: number;
  realisedCost?: number;
  unrealisedCost?: number;
  grossOpenCost?: number;
  grossOpenPremium?: number;
  grossExecCost?: number;
  isOpen?: boolean;
  markPrice?: number;
  markValue?: number;
  riskValue?: number;
  homeNotional?: number;
  foreignNotional?: number;
  posState?: string;
  posCost?: number;
  posCost2?: number;
  posCross?: number;
  posInit?: number;
  posComm?: number;
  posLoss?: number;
  posMargin?: number;
  posMaint?: number;
  posAllowance?: number;
  taxableMargin?: number;
  initMargin?: number;
  maintMargin?: number;
  sessionMargin?: number;
  targetExcessMargin?: number;
  varMargin?: number;
  realisedGrossPnl?: number;
  realisedTax?: number;
  realisedPnl?: number;
  unrealisedGrossPnl?: number;
  longBankrupt?: number;
  shortBankrupt?: number;
  taxBase?: number;
  indicativeTaxRate?: number;
  indicativeTax?: number;
  unrealisedTax?: number;
  unrealisedPnl?: number;
  unrealisedPnlPcnt?: number;
  unrealisedRoePcnt?: number;
  simpleQty?: number;
  simpleCost?: number;
  simpleValue?: number;
  simplePnl?: number;
  simplePnlPcnt?: number;
  avgCostPrice?: number;
  avgEntryPrice?: number;
  breakEvenPrice?: number;
  marginCallPrice?: number;
  liquidationPrice?: number;
  bankruptPrice?: number;
  timestamp?: string;
  lastPrice?: number;
  lastValue?: number;
}

/**
 * Best Bid/Offer Snapshots & Historical Bins
 */
export interface Quote {
  timestamp: string;
  symbol: string;
  bidSize?: number;
  bidPrice?: number;
  askPrice?: number;
  askSize?: number;
}

/**
 * Historical Settlement Data
 */
export interface Settlement {
  timestamp: string;
  symbol: string;
  settlementType?: string;
  settledPrice?: number;
  optionStrikePrice?: number;
  optionUnderlyingPrice?: number;
  bankrupt?: number;
  taxBase?: number;
  taxRate?: number;
}

/**
 * Exchange Statistics
 */
export interface Stats {
  rootSymbol: string;
  currency?: string;
  volume24h?: number;
  turnover24h?: number;
  openInterest?: number;
  openValue?: number;
}

export interface StatsHistory {
  date: string;
  rootSymbol: string;
  currency?: string;
  volume?: number;
  turnover?: number;
}

export interface StatsUSD {
  rootSymbol: string;
  currency?: string;
  turnover24h?: number;
  turnover30d?: number;
  turnover365d?: number;
  turnover?: number;
}

/**
 * Individual & Bucketed Trades
 */
export interface Trade {
  timestamp: string;
  symbol: string;
  side?: string;
  size?: number;
  price?: number;
  tickDirection?: string;
  trdMatchID?: string;
  grossValue?: number;
  homeNotional?: number;
  foreignNotional?: number;
}

export interface TradeBin {
  timestamp: string;
  symbol: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  trades?: number;
  volume?: number;
  vwap?: number;
  lastSize?: number;
  turnover?: number;
  homeNotional?: number;
  foreignNotional?: number;
}

export interface Wallet {
  account: number;
  currency: string;
  prevDeposited?: number;
  prevWithdrawn?: number;
  prevTransferIn?: number;
  prevTransferOut?: number;
  prevAmount?: number;
  prevTimestamp?: string;
  deltaDeposited?: number;
  deltaWithdrawn?: number;
  deltaTransferIn?: number;
  deltaTransferOut?: number;
  deltaAmount?: number;
  deposited?: number;
  withdrawn?: number;
  transferIn?: number;
  transferOut?: number;
  amount?: number;
  pendingCredit?: number;
  pendingDebit?: number;
  confirmedDebit?: number;
  timestamp?: string;
  addr?: string;
  script?: string;
  withdrawalLock?: string[];
}

export interface Transaction {
  transactID: string;
  account?: number;
  currency?: string;
  transactType?: string;
  amount?: number;
  fee?: number;
  transactStatus?: string;
  address?: string;
  tx?: string;
  text?: string;
  transactTime?: string;
  timestamp?: string;
}

export interface AccessToken {
  id: string;

  /** time to live in seconds (2 weeks by default) */
  ttl?: number;
  created?: string;
  userId?: number;
}

export interface Affiliate {
  account: number;
  currency: string;
  prevPayout?: number;
  prevTurnover?: number;
  prevComm?: number;
  prevTimestamp?: string;
  execTurnover?: number;
  execComm?: number;
  totalReferrals?: number;
  totalTurnover?: number;
  totalComm?: number;
  payoutPcnt?: number;
  pendingPayout?: number;
  timestamp?: string;
  referrerAccount?: number;
  referralDiscount?: number;
  affiliatePayout?: number;
}

/**
 * Daily Quote Fill Ratio Statistic
 */
export interface QuoteFillRatio {
  date: string;
  account?: number;
  quoteCount?: number;
  dealtCount?: number;
  quotesMavg7?: number;
  dealtMavg7?: number;
  quoteFillRatioMavg7?: number;
}

/**
 * Hourly Quote Value Ratio Statistic
 */
export interface QuoteValueRatio {
  timestamp?: string;
  account?: number;
  symbol?: string;
  quoteCount?: number;
  volumeXBT?: number;
  QVR?: number;
  id?: number;
}

/**
 * Account Operations
 */
export interface User {
  id?: number;
  ownerId?: number;
  firstname?: string;
  lastname?: string;
  username: string;
  email?: string;
  phone?: string;
  created?: string;
  lastUpdated?: string;
  preferences?: UserPreferences;
  TFAEnabled?: string;
  affiliateID?: string;
  pgpPubKey?: string;
  pgpPubKeyCreated?: string;
  country?: string;
  geoipCountry?: string;
  geoipRegion?: string;
  typ?: string;
}

export type UserCommissionsBySymbol = object;

export interface Margin {
  account: number;
  currency?: string;
  riskLimit?: number;
  prevState?: string;
  state?: string;
  action?: string;
  amount?: number;
  pendingCredit?: number;
  pendingDebit?: number;
  confirmedDebit?: number;
  prevRealisedPnl?: number;
  prevUnrealisedPnl?: number;
  grossComm?: number;
  grossOpenCost?: number;
  grossOpenPremium?: number;
  grossExecCost?: number;
  grossMarkValue?: number;
  riskValue?: number;
  taxableMargin?: number;
  initMargin?: number;
  maintMargin?: number;
  sessionMargin?: number;
  targetExcessMargin?: number;
  varMargin?: number;
  realisedPnl?: number;
  unrealisedPnl?: number;
  indicativeTax?: number;
  unrealisedProfit?: number;
  syntheticMargin?: number;
  walletBalance?: number;
  marginBalance?: number;
  marginBalancePcnt?: number;
  marginLeverage?: number;
  marginUsedPcnt?: number;
  excessMargin?: number;
  excessMarginPcnt?: number;
  availableMargin?: number;
  withdrawableMargin?: number;
  timestamp?: string;
  grossLastValue?: number;
  commission?: number;
}

/**
 * User communication SNS token
 */
export interface CommunicationToken {
  id: string;
  userId: number;
  deviceToken: string;
  channel: string;
}

/**
 * User Events for Auditing
 */
export interface UserEvent {
  id?: number;
  type:
    | 'apiKeyCreated'
    | 'deleverageExecution'
    | 'depositConfirmed'
    | 'depositPending'
    | 'banZeroVolumeApiUser'
    | 'liquidationOrderPlaced'
    | 'login'
    | 'pgpMaskedEmail'
    | 'pgpTestEmail'
    | 'passwordChanged'
    | 'positionStateLiquidated'
    | 'positionStateWarning'
    | 'resetPasswordConfirmed'
    | 'resetPasswordRequest'
    | 'transferCanceled'
    | 'transferCompleted'
    | 'transferReceived'
    | 'transferRequested'
    | 'twoFactorDisabled'
    | 'twoFactorEnabled'
    | 'withdrawalCanceled'
    | 'withdrawalCompleted'
    | 'withdrawalConfirmed'
    | 'withdrawalRequested'
    | 'addressSkipConfirmRequested'
    | 'addressSkipConfirmVerified'
    | 'verify';
  status: 'success' | 'failure';
  userId: number;
  createdById: number;
  ip?: string;
  geoipCountry?: string;
  geoipRegion?: string;
  geoipSubRegion?: string;
  eventMeta?: object;
  created: string;
}

export interface UserPreferences {
  alertOnLiquidations?: boolean;
  animationsEnabled?: boolean;
  announcementsLastSeen?: string;
  chatChannelID?: number;
  colorTheme?: string;
  currency?: string;
  debug?: boolean;
  disableEmails?: string[];
  disablePush?: string[];
  hideConfirmDialogs?: string[];
  hideConnectionModal?: boolean;
  hideFromLeaderboard?: boolean;
  hideNameFromLeaderboard?: boolean;
  hideNotifications?: string[];
  locale?: string;
  msgsSeen?: string[];
  orderBookBinning?: object;
  orderBookType?: string;
  orderClearImmediate?: boolean;
  orderControlsPlusMinus?: boolean;
  showLocaleNumbers?: boolean;
  sounds?: string[];
  strictIPCheck?: boolean;
  strictTimeout?: boolean;
  tickerGroup?: string;
  tickerPinned?: boolean;
  tradeLayout?: string;
}

///
///
///
///
///
///

type pegPriceType = 'LastPeg' | 'MidPricePeg' | 'MarketPeg' | 'PrimaryPeg' | 'TrailingStopPeg';

type timeInForce = 'Day' | 'GoodTillCancel' | 'ImmediateOrCancel' | 'FillOrKill';

export enum ORD_TYPE {
  Market = 'Market',
  Limit = 'Limit',
  Stop = 'Stop',
  StopLimit = 'StopLimit',
  MarketIfTouched = 'MarketIfTouched',
  LimitIfTouched = 'LimitIfTouched',
  Pegged = 'Pegged',
}

export enum EXEC_INST {
  LastPrice = 'LastPrice',
  Close = 'Close',
  ParticipateDoNotInitiate = 'ParticipateDoNotInitiate',
  ReduceOnly = 'ReduceOnly',
  MarkPrice = 'MarkPrice',
  IndexPrice = 'IndexPrice',
}

export enum SYMBOL {
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
