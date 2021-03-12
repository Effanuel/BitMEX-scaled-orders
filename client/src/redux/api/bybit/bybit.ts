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
 * Get bybit server time.
 */
export interface ServerTime {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: any;
  time_now?: string;
}

/**
 * Query LCP info.
 */
export interface LCPInfo {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LCPInfoBase;
  time_now?: string;
}

/**
 * Query LCP info.
 */
export interface LCPInfoBase {
  date?: string;
  self_ratio?: number;
  platform_ratio?: number;
  score?: number;
}

/**
 * Get Bybit OpenAPI announcements in the last 30 days in reverse order.
 */
export interface Announcement {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: AnnouncementInfo[];
  time_now?: string;
}

/**
 * Get Bybit OpenAPI announcements in the last 30 days in reverse order.
 */
export interface AnnouncementInfo {
  id?: number;
  title?: string;
  link?: string;
  summary?: string;
  created_at?: string;
}

/**
 * Get bybit server time.
 */
export interface APIKeyBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: APIKeyInfo[];
  time_now?: string;
}

/**
 * Get bybit server time.
 */
export interface APIKeyInfo {
  api_key?: string;
  user_id?: number;
  ips?: string[];
  note?: string;
  permissions?: string[];
  created_at?: string;
  read_only?: boolean;
}

/**
 * Get user leverage.
 */
export interface Leverage {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LeverageResult[];
  time_now?: string;
  rate_limit_status?: number;
}

export interface LeverageResult {
  BTCUSD?: LeverageInfo[];
  EOSUSD?: LeverageInfo[];
  ETHUSD?: LeverageInfo[];
  XRPUSD?: LeverageInfo[];
}

export interface LeverageInfo {
  leverage?: number;
}

/**
 * Get symbol information.
 */
export interface Symbols {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: SymbolInfo[];
  time_now?: string;
}

export interface SymbolInfo {
  name?: string;
  base_currency?: string;
  quote_currency?: string;
  price_scale?: number;
  price_filter?: PriceFilter[];
  lot_size_filter?: LotSizeFilter[];
}

/**
 * Get liq_records information.
 */
export interface LiqRecords {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LiqRecordsInfo[];
  time_now?: string;
}

export interface LiqRecordsInfo {
  id?: number;
  qty?: number;
  side?: string;
  time?: number;
  symbol?: string;
  price?: number;
}

/**
 * Get open_interest information.
 */
export interface OpenInterest {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OpenInterestInfo[];
  time_now?: string;
}

export interface OpenInterestInfo {
  open_interest?: number;
  timestamp?: number;
  symbol?: string;
}

/**
 * Get big deal information.
 */
export interface BigDeal {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: BigDealInfo[];
  time_now?: string;
}

export interface BigDealInfo {
  side?: string;
  timestamp?: number;
  symbol?: string;
  value?: number;
}

/**
 * Get account long short account ratio information.
 */
export interface AccountRatio {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: AccountRatioInfo[];
  time_now?: string;
}

export interface AccountRatioInfo {
  buy_ratio?: number;
  sell_ratio?: number;
  timestamp?: number;
  symbol?: string;
}

/**
 * Get mark price kline information.
 */
export interface MarkPriceKlineBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: MarkPriceKlineInfo[];
  time_now?: string;
}

export interface MarkPriceKlineInfo {
  id?: number;
  symbol?: string;
  period?: string;
  start_at?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface PriceFilter {
  min_price?: string;
  max_price?: string;
  tick_size?: string;
}

export interface LotSizeFilter {
  min_trading_qty?: object;
  max_trading_qty?: object;
  qty_step?: object;
}

/**
 * Get my position list.
 */
export interface Position {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: PositionInfo[];
  time_now?: string;
}

/**
 * PositionInfo.
 */
export interface PositionInfo {
  id?: number;
  user_id?: number;
  risk_id?: number;
  symbol?: string;
  side?: string;
  size?: number;
  position_value?: number;
  entry_price?: number;
  leverage?: number;
  auto_add_margin?: number;
  position_margin?: number;
  liq_price?: number;
  bust_price?: number;
  occ_closing_fee?: number;
  occ_funding_fee?: number;
  take_profit?: number;
  stop_loss?: number;
  position_status?: string;
  deleverage_indicator?: string;
  oc_calc_data?: string;
  order_margin?: number;
  wallet_balance?: number;
  unrealised_pnl?: number;
  realised_pnl?: number;
  cum_realised_pnl?: number;
  cum_commission?: number;
  cross_seq?: number;
  position_seq?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Place new order response
 */
export interface OrderResBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OrderRes[];
  time_now?: string;
}

/**
 * Place new order response
 */
export interface OrderRes {
  order_id?: string;
  user_id?: number;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: number;
  qty?: string;
  time_in_force?: string;
  order_status?: string;
  last_exec_time?: number;
  last_exec_price?: number;
  leaves_qty?: number;
  cum_exec_qty?: number;
  cum_exec_value?: number;
  cum_exec_fee?: number;
  reject_reason?: string;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * order list response
 */
export interface V2OrderRes {
  user_id?: number;
  order_status?: string;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: string;
  qty?: string;
  time_in_force?: string;
  order_link_id?: string;
  order_id?: string;
  created_at?: string;
  updated_at?: string;
  leaves_qty?: string;
  leaves_value?: string;
  cum_exec_qty?: string;
  cum_exec_value?: string;
  cum_exec_fee?: string;
  reject_reason?: string;
}

/**
 * Order Id response
 */
export interface OrderIdRes {
  order_id?: string;
}

/**
 * Get order list response
 */
export interface V2OrderListBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: V2OrderListData[];
  time_now?: string;
}

/**
 * Get order list response
 */
export interface V2OrderListData {
  data?: V2OrderRes[];
  cursor?: string;
}

/**
 * cancel order response
 */
export interface OrderCancelBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OrderRes[];
  time_now?: string;
}

/**
 * Cancel all active orders response
 */
export interface OrderCancelAllBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OrderCancelAllRes[];
  time_now?: string;
}

/**
 * Cancel all active orders response
 */
export interface OrderCancelAllRes {
  clOrdID?: string;
  user_id?: number;
  side?: string;
  order_type?: string;
  price?: string;
  qty?: string;
  time_in_force?: string;
  create_type?: string;
  order_status?: string;
  leaves_qty?: number;
  leaves_value?: number;
  created_at?: string;
  updated_at?: string;
  cross_status?: string;
  cross_seq?: number;
}

/**
 * Replace active order response
 */
export interface ReplaceOrderBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: { stop_order_id?: string }[];
  time_now?: string;
}

/**
 * Query real-time active order information response
 */
export interface QueryOrderBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: QueryOrderRes[];
  time_now?: string;
}

/**
 * Query real-time active order information response
 */
export interface QueryOrderRes {
  order_id?: string;
  user_id?: number;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: number;
  qty?: string;
  time_in_force?: string;
  order_status?: string;
  ext_fields?: ExtFields[];
  leaves_qty?: number;
  leaves_value?: number;
  cum_exec_qty?: number;
  reject_reason?: string;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * extra fields
 */
export interface ExtFields {
  o_req_num?: number;
  xreq_type?: string;
  xreq_offset?: number;
}

/**
 * Place new conditional order response
 */
export interface V2ConditionalBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: V2ConditionalRes[];
  time_now?: string;
}

/**
 * Place new conditional order response
 */
export interface V2CancelOrderBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: { stop_order_id?: string }[];
  time_now?: string;
}

/**
 * Place new conditional order response
 */
export interface ConditionalRes {
  stop_order_id?: string;
  user_id?: number;
  stop_order_status?: string;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  time_in_force?: string;
  stop_order_type?: string;
  base_price?: number;
  stop_px?: number;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Place new conditional order response
 */
export interface V2ConditionalRes {
  user_id?: number;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: string;
  qty?: string;
  time_in_force?: string;
  trigger_by?: string;
  base_price?: string;
  remark?: string;
  reject_reason?: string;
  stop_px?: string;
  stop_order_id?: string;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * conditional order list response
 */
export interface V2ConditionalListRes {
  user_id?: number;
  stop_order_status?: string;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: string;
  qty?: string;
  time_in_force?: string;
  stop_order_type?: string;
  trigger_by?: string;
  base_price?: string;
  order_link_id?: string;
  stop_px?: string;
  stop_order_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Cancel all conditional order response
 */
export interface ConditionalCancelAllBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: ConditionalCancelAllRes[];
  time_now?: string;
}

/**
 * Cancel all conditional order response
 */
export interface ConditionalCancelAllRes {
  clOrdID?: string;
  user_id?: number;
  symbol?: string;
  side?: string;
  order_type?: string;
  price?: string;
  qty?: number;
  time_in_force?: string;
  create_type?: string;
  cancel_type?: string;
  order_status?: string;
  leaves_qty?: number;
  leaves_value?: string;
  cross_seq?: number;
  stop_order_type?: string;
  trigger_by?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get conditional order list
 */
export interface ConditionalOrdersResBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: ConditionalOrdersRes[];
  time_now?: string;
}

/**
 * Get conditional order list
 */
export interface StopOrderOrdersResBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: ConditionalRes[];
  time_now?: string;
}

/**
 * Get order list response
 */
export interface ConditionalOrdersRes {
  data?: V2ConditionalListRes[];
  cursor?: string;
}

/**
 * Replace conditional order response
 */
export interface ReplaceConditionalBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: { stop_order_id?: string }[];
  time_now?: string;
}

/**
 * Get the last funding Rate
 */
export interface FundingRateBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: FundingRate[];
  time_now?: string;
}

/**
 * Get the last funding Rate
 */
export interface FundingRate {
  symbol?: string;
  funding_rate?: string;
  funding_rate_timestamp?: number;
}

/**
 * Get the last funding fee
 */
export interface FundingFeeBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: FundingFeeRes[];
  time_now?: string;
}

/**
 * Get the last funding fee
 */
export interface FundingFeeRes {
  symbol?: string;
  side?: string;
  size?: number;
  funding_rate?: string;
  exec_fee?: number;
  exec_timestamp?: number;
}

/**
 * Get the last funding fee
 */
export interface FundingPredictedBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: FundingPredicted[];
  time_now?: string;
}

/**
 * Get the last funding fee
 */
export interface FundingPredicted {
  predicted_funding_rate?: number;
  predicted_funding_fee?: number;
}

/**
 * Get the trade records of a order response
 */
export interface TradeRecordsBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: TradeRecords[];
  time_now?: string;
}

/**
 * Get the trade records of a order response
 */
export interface TradeRecords {
  order_id?: string;
  trade_list?: TradeRecordsInfo[];
}

/**
 * Get the trade records of a order response
 */
export interface TradeRecordsInfo {
  closed_size?: number;
  cross_seq?: number;
  exec_fee?: string;
  exec_id?: string;
  exec_price?: string;
  exec_qty?: number;
  exec_time?: string;
  exec_type?: string;
  exec_value?: string;
  fee_rate?: string;
  last_liquidity_ind?: string;
  leaves_qty?: number;
  nth_fill?: number;
  order_id?: string;
  order_price?: string;
  order_qty?: number;
  order_type?: string;
  side?: string;
  symbol?: string;
  user_id?: number;
}

/**
 * Get the orderbook response
 */
export interface OrderBookBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OderBookRes[];
  time_now?: string;
}

/**
 * Get the orderbook response
 */
export interface OderBookRes {
  symbol?: string;
  price?: string;
  size?: number;
  side?: string;
}

/**
 * Get the closed-pnl/list response
 */
export interface ClosedPnlBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: ClosedPnlInfo[];
  time_now?: string;
}

/**
 * Get the closed-pnl/list response
 */
export interface ClosedPnlInfo {
  id?: number;
  user_id?: number;
  symbol?: string;
  order_id?: string;
  side?: string;
  qty?: number;
  order_price?: number;
  order_type?: string;
  exec_type?: string;
  closed_size?: number;
  cum_entry_value?: number;
  avg_entry_price?: number;
  cum_exit_value?: number;
  avg_exit_price?: number;
  closed_pnl?: number;
  fill_count?: number;
  leverage?: number;
  created_at?: number;
}

/**
 * Get the orderbook response
 */
export interface SymbolInfoBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: SymbolTickInfo[];
  time_now?: string;
}

/**
 * Get the orderbook response
 */
export interface SymbolTickInfo {
  symbol?: string;
  bid_price?: string;
  ask_price?: string;
  last_price?: string;
  last_tick_direction?: string;
  prev_price_24h?: string;
  price_24h_pcnt?: string;
  high_price_24h?: string;
  low_price_24h?: string;
  prev_price_1h?: string;
  price_1h_pcnt?: string;
  mark_price?: string;
  index_price?: string;
  open_interest?: number;
  open_value?: string;
  total_turnover?: string;
  turnover_24h?: string;
  total_volume?: number;
  volume_24h?: number;
  funding_rate?: string;
  predicted_funding_rate?: string;
  next_funding_time?: string;
  countdown_hour?: number;
}

/**
 * Get the Trading Records response
 */
export interface TradingRecords {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: TradingRecordsInfo[];
  time_now?: string;
}

/**
 * Get the orderbook response
 */
export interface TradingRecordsInfo {
  id?: number;
  symbol?: string;
  price?: number;
  qty?: number;
  side?: string;
  time?: string;
}

/**
 * Get the orderbook response
 */
export interface KlineBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: KlineRes[];
  time_now?: string;
}

/**
 * Get the orderbook response
 */
export interface KlineRes {
  symbol?: string;
  interval?: string;
  open_time?: number;
  open?: string;
  high?: string;
  low?: string;
  close?: string;
  volume?: string;
}

/**
 * Get funding record response
 */
export interface FundRecordBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: FundingRecords[];
  time_now?: string;
}

/**
 * Get funding record response
 */
export interface FundingRecords {
  id?: number;
  user_id?: number;
  coin?: string;
  wallet_id?: number;
  type?: string;
  amount?: string;
  tx_id?: string;
  address?: string;
  wallet_balance?: string;
  exec_time?: string;
  cross_seq?: number;
}

/**
 * Asset Exchange Records
 */
export interface ExchangeOrderListBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: ExchangeOrderList[];
  time_now?: string;
}

/**
 * Asset Exchange Records
 */
export interface ExchangeOrderList {
  from_coin?: string;
  to_coin?: string;
  from_amount?: number;
  to_amount?: number;
  exchange_rate?: number;
  from_fee?: number;
  created_at?: string;
}

/**
 * Get account withdraw records response
 */
export interface WithdrawResBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: WithdrawRecords[];
  time_now?: string;
}

/**
 * Get withdraw records response
 */
export interface WithdrawRecords {
  id?: number;
  user_id?: number;
  coin?: string;
  status?: string;
  amount?: string;
  fee?: string;
  address?: string;
  tx_id?: string;
  submited_at?: string;
  updated_at?: string;
}

/**
 * Get account withdraw balance response
 */
export interface WalletBalanceBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: object;
  time_now?: string;
}

/**
 * Get wallet balance response
 */
export interface WalletBalance {
  equity?: number;
  available_balance?: number;
  used_margin?: number;
  order_margin?: number;
  position_margin?: number;
  occ_closing_fee?: number;
  occ_funding_fee?: number;
  wallet_balance?: number;
  realised_pnl?: number;
  unrealised_pnl?: number;
  cum_realised_pnl?: number;
  given_cash?: number;
  service_cash?: number;
}

/**
 * Set risk limit.
 */
export interface SetRiskLimitBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: RiskLimitRes[];
  time_now?: string;
}

/**
 * Set risk limit.
 */
export interface RiskLimitRes {
  position?: PositionInfo[];
  risk?: RiskIDRes[];
}

/**
 * Set risk limit.
 */
export interface RiskIDRes {
  id?: number;
  coin?: string;
  limit?: number;
  maintain_margin?: string;
  starting_margin?: string;
  section?: string;
  is_lowest_risk?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get risk limit.
 */
export interface RiskLimitBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: GetRiskLimitRes[];
  time_now?: string;
}

/**
 * Get risk limit.
 */
export interface GetRiskLimitRes {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: RiskIDRes[];
  time_now?: string;
}

/**
 * Set Trading-Stop Condition response
 */
export interface TradingStopBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: TradingStopRes[];
  time_now?: string;
}

/**
 * Set Trading-Stop Condition response
 */
export interface TradingStopRes {
  id?: number;
  user_id?: number;
  symbol?: string;
  side?: string;
  size?: number;
  position_value?: number;
  entry_price?: number;
  risk_id?: number;
  auto_add_margin?: number;
  leverage?: number;
  position_margin?: number;
  liq_price?: number;
  bust_price?: number;
  occ_closing_fee?: number;
  occ_funding_fee?: number;
  take_profit?: number;
  stop_loss?: number;
  position_status?: string;
  deleverage_indicator?: number;
  oc_calc_data?: string;
  order_margin?: number;
  wallet_balance?: number;
  realised_pnl?: number;
  cum_realised_pnl?: number;
  cum_commission?: number;
  cross_seq?: number;
  position_seq?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Create Linear Order Base
 */
export interface LinearCreateOrderResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearCreateOrderResult[];
  time_now?: string;
}

/**
 * Create Linear Order
 */
export interface LinearCreateOrderResult {
  created_time?: string;
  cum_exec_fee?: number;
  cum_exec_qty?: number;
  cum_exec_value?: number;
  last_exec_price?: number;
  order_id?: string;
  order_link_id?: string;
  order_status?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  reduce_only?: boolean;
  side?: string;
  symbol?: string;
  time_in_force?: string;
  updated_time?: string;
  user_id?: number;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

/**
 * Create Linear Order Base
 */
export interface LinearCancelOrderResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearCancelOrderResult[];
  time_now?: string;
}

/**
 * replace order can modify/amend your active orders
 */
export interface LinearOrderReplace {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OrderIdRes[];
  time_now?: string;
}

/**
 * Create Linear Order
 */
export interface LinearCancelOrderResult {
  order_id?: string;
}

/**
 * Cancel all linear active orders response
 */
export interface LinearOrderCancelAllBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: string[];
  time_now?: string;
}

/**
 * replace conditional order can modify/amend your conditional orders
 */
export interface LinearStopOrderReplace {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: OrderIdRes[];
  time_now?: string;
}

/**
 * Linear Order list Base
 */
export interface LinearOrderRecordsResponseBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearOrderRecordsResponse[];
  time_now?: string;
}

export interface LinearOrderRecordsResponse {
  current_page?: number;
  data?: LinearListOrderResult[];
}

export interface LinearListOrderResult {
  created_time?: string;
  cum_exec_fee?: number;
  cum_exec_qty?: number;
  cum_exec_value?: number;
  last_exec_price?: number;
  order_id?: string;
  order_link_id?: string;
  order_status?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  reduce_only?: boolean;
  side?: string;
  symbol?: string;
  time_in_force?: string;
  updated_time?: string;
  user_id?: number;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

/**
 * Linear Order Query Result Base
 */
export interface LinearSearchOrderResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearSearchOrderResult[];
  time_now?: string;
}

export interface LinearSearchOrderResult {
  created_time?: string;
  cum_exec_fee?: number;
  cum_exec_qty?: number;
  cum_exec_value?: number;
  last_exec_price?: number;
  order_id?: string;
  order_link_id?: string;
  order_status?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  reduce_only?: boolean;
  side?: string;
  symbol?: string;
  time_in_force?: string;
  updated_time?: string;
  user_id?: number;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

/**
 * Create Linear Stop Order Base
 */
export interface LinearCreateStopOrderResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearCreateStopOrderResult[];
  time_now?: string;
}

/**
 * Create Linear Stop Order
 */
export interface LinearCreateStopOrderResult {
  stop_order_id?: string;
  user_id?: number;
  side?: string;
  symbol?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  time_in_force?: string;
  order_status?: string;
  trigger_price?: number;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

/**
 * Cancel Linear Stop Order Base
 */
export interface LinearCancelStopOrderResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearCancelStopOrderResult[];
  time_now?: string;
}

/**
 * Cancel Linear Stop Order
 */
export interface LinearCancelStopOrderResult {
  stop_order_id?: string;
}

/**
 * Cancel all linear stop orders response
 */
export interface LinearStopOrderCancelAllBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: string[];
  time_now?: string;
}

/**
 * Linear Stop Order list Base
 */
export interface LinearStopOrderRecordsResponseBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearStopOrderRecordsResponse[];
  time_now?: string;
}

export interface LinearStopOrderRecordsResponse {
  current_page?: number;
  last_page?: number;
  data?: LinearListStopOrderResult[];
}

export interface LinearListStopOrderResult {
  stop_order_id?: string;
  user_id?: number;
  side?: string;
  symbol?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  time_in_force?: string;
  order_status?: string;
  trigger_price?: number;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

/**
 * Linear Order Query Result Base
 */
export interface LinearSearchStopOrderResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearSearchStopOrderResult[];
  time_now?: string;
}

export interface LinearSearchStopOrderResult {
  stop_order_id?: string;
  user_id?: number;
  side?: string;
  symbol?: string;
  order_type?: string;
  price?: number;
  qty?: number;
  time_in_force?: string;
  order_status?: string;
  trigger_price?: number;
  order_link_id?: string;
  created_at?: string;
  updated_at?: string;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

/**
 * Linear Positions Result Base
 */
export interface LinearPositionListResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearPositionListResult[];
  time_now?: string;
}

export interface LinearPositionListResult {
  bust_price?: number;
  cum_realised_pnl?: number;
  entry_price?: number;
  free_qty?: number;
  leverage?: number;
  liq_price?: number;
  occ_closing_fee?: number;
  position_margin?: number;
  position_value?: number;
  realised_pnl?: number;
  side?: string;
  size?: number;
  symbol?: string;
  user_id?: number;
  tp_sl_mode?: string;
}

export interface LinearSwitchModeResult {
  tp_sl_mode?: number;
}

/**
 * Set leverage result
 */
export interface LinearSetLeverageResult {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: any;
  time_now?: string;
}

/**
 * Switch isolated result
 */
export interface LinearSwitchIsolatedResult {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: any;
  time_now?: string;
}

/**
 * Set Trading Stop result
 */
export interface LinearSetTradingStopResult {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: any;
  time_now?: string;
}

/**
 * Linear Positions Result Base
 */
export interface LinearClosePnlRecordsResponse {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearClosedPnlRecordResult[];
  time_now?: string;
}

export interface LinearClosedPnlRecordResult {
  avg_entry_price?: number;
  avg_exit_price?: number;
  closed_pnl?: number;
  closed_size?: number;
  created_at?: number;
  cum_entry_value?: number;
  cum_exit_value?: number;
  exec_type?: string;
  fill_count?: number;
  id?: number;
  leverage?: number;
  order_id?: string;
  order_price?: number;
  order_type?: string;
  qty?: number;
  side?: string;
  symbol?: string;
  user_id?: number;
}

/**
 * Linear Positions Result Base
 */
export interface LinearTradeRecordsResponse {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearTradeRecordItem[];
  time_now?: string;
}

export interface LinearTradeRecordItem {
  closed_size?: number;
  exec_fee?: number;
  exec_id?: string;
  exec_price?: number;
  exec_qty?: number;
  exec_type?: string;
  exec_value?: number;
  fee_rate?: number;
  last_liquidity_ind?: string;
  leaves_qty?: number;
  order_id?: string;
  order_link_id?: string;
  order_price?: number;
  order_qty?: number;
  order_type?: string;
  price?: number;
  side?: string;
  symbol?: string;
  trade_time?: number;
  trade_time_ms?: number;
}

/**
 * Set auto add margin result
 */
export interface LinearSetMarginResultBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearSetMarginResult[];
  time_now?: string;
}

export interface LinearSetMarginResult {
  PositionListResult?: LinearPositionListResult[];
  available_balance?: number;
  wallet_balance?: number;
}

/**
 * Get Kline
 */
export interface LinearKlineRespBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearKlineResp[];
  time_now?: string;
}

export interface LinearKlineResp {
  close?: number;
  high?: number;
  id?: number;
  interval?: string;
  low?: number;
  open?: number;
  open_time?: number;
  period?: string;
  start_at?: number;
  symbol?: string;
  turnover?: number;
  volume?: number;
}

/**
 * Get Prev Funding Rate
 */
export interface LinearPrevFundingRateRespBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearPrevFundingRateResp[];
  time_now?: string;
}

export interface LinearPrevFundingRateResp {
  funding_rate?: number;
  funding_rate_timestamp?: string;
  symbol?: string;
}

/**
 * Get My Last Funding
 */
export interface LinearPrevFundingRespBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearPrevFundingResp[];
  time_now?: string;
}

export interface LinearPrevFundingResp {
  exec_fee?: number;
  exec_time?: string;
  funding_rate?: number;
  side?: string;
  size?: number;
  symbol?: string;
}

/**
 * Get Predicted Funding
 */
export interface LinearFundingPredictedBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearFundingPredicted[];
  time_now?: string;
}

export interface LinearFundingPredicted {
  predicted_funding_rate?: number;
  predicted_funding_fee?: number;
}

/**
 * Get Recent Trading Record
 */
export interface LinearRecentTradingRecordRespBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearRecentTradingRecordResp[];
  time_now?: string;
}

export interface LinearRecentTradingRecordResp {
  id?: string;
  price?: number;
  qty?: number;
  side?: string;
  symbol?: string;
  time?: string;
  trade_time_ms?: number;
}

/**
 * Get Risk Limit
 */
export interface LinearRiskLimitRespBase {
  ret_code?: number;
  ret_msg?: string;
  ext_code?: string;
  ext_info?: string;
  result?: LinearRiskLimitResp[];
  time_now?: string;
}

export interface LinearRiskLimitResp {
  created_at?: string;
  id?: number;
  is_lowest_risk?: number;
  limit?: number;
  maintain_margin?: number;
  section?: string[];
  starting_margin?: number;
  symbol?: string;
  updated_at?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

enum BodyType {
  Json,
  FormData,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//api.bybit.com/";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key),
          )
          .join("&")}`
      : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
  };

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = (null as unknown) as T;
    r.error = (null as unknown) as E;

    return response
      .json()
      .then((data) => {
        if (r.ok) {
          r.data = data;
        } else {
          r.error = data;
        }
        return r;
      })
      .catch((e) => {
        r.error = e;
        return r;
      });
  };

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<HttpResponse<T>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {};
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Bybit API
 * @version 0.2.10
 * @baseUrl //api.bybit.com/
 * ## REST API for the Bybit Exchange.
 * Base URI: [https://api.bybit.com]
 *
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  v2 = {
    /**
     * No description
     *
     * @tags Common
     * @name CommonGetTime
     * @summary Get bybit server time.
     * @request GET:/v2/public/time
     * @secure
     */
    commonGetTime: (params?: RequestParams) =>
      this.request<ServerTime[], any>(`/v2/public/time`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Common
     * @name CommonAnnouncements
     * @summary Get Bybit OpenAPI announcements in the last 30 days in reverse order.
     * @request GET:/v2/public/announcement
     * @secure
     */
    commonAnnouncements: (params?: RequestParams) =>
      this.request<Announcement[], any>(`/v2/public/announcement`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Common
     * @name CommonGetLcp
     * @summary Query LCP info.
     * @request GET:/v2/private/account/lcp
     * @secure
     */
    commonGetLcp: (query: { symbol: string }, params?: RequestParams) =>
      this.request<LCPInfo[], any>(
        `/v2/private/account/lcp${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Symbol
     * @name SymbolGet
     * @summary Query Symbols.
     * @request GET:/v2/public/symbols
     * @secure
     */
    symbolGet: (params?: RequestParams) =>
      this.request<Symbols[], any>(`/v2/public/symbols`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Market
     * @name MarketLiqRecords
     * @summary Query liq records.
     * @request GET:/v2/public/liq-records
     * @secure
     */
    marketLiqRecords: (
      query: { symbol: string; from?: number; limit?: number; start_time?: number; end_time?: number },
      params?: RequestParams,
    ) =>
      this.request<LiqRecords[], any>(
        `/v2/public/liq-records${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Kline
     * @name KlineMarkPrice
     * @summary Query mark price kline.
     * @request GET:/v2/public/mark-price-kline
     * @secure
     */
    klineMarkPrice: (
      query: { symbol: string; interval: string; from: number; limit?: number },
      params?: RequestParams,
    ) =>
      this.request<MarkPriceKlineBase[], any>(
        `/v2/public/mark-price-kline${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Market
     * @name MarketOpenInterest
     * @summary Query Open Interest
     * @request GET:/v2/public/open-interest
     * @secure
     */
    marketOpenInterest: (query: { symbol: string; limit?: number; period: string }, params?: RequestParams) =>
      this.request<OpenInterest[], any>(
        `/v2/public/open-interest${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Market
     * @name MarketBigDeal
     * @summary Query Big Deal
     * @request GET:/v2/public/big-deal
     * @secure
     */
    marketBigDeal: (query: { symbol: string; limit?: number }, params?: RequestParams) =>
      this.request<BigDeal[], any>(
        `/v2/public/big-deal${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Market
     * @name MarketAccountRatio
     * @summary Query Account Long Short Ratio
     * @request GET:/v2/public/account-ratio
     * @secure
     */
    marketAccountRatio: (query: { symbol: string; limit?: number; period: string }, params?: RequestParams) =>
      this.request<AccountRatio[], any>(
        `/v2/public/account-ratio${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Positions
     * @name PositionsMyPosition
     * @summary Get my position list.
     * @request GET:/v2/private/position/list
     * @secure
     */
    positionsMyPosition: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<Position[], any>(
        `/v2/private/position/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletExchangeOrder
     * @summary Asset Exchange Records
     * @request GET:/v2/private/exchange-order/list
     * @secure
     */
    walletExchangeOrder: (query?: { limit?: number; from?: number; direction?: string }, params?: RequestParams) =>
      this.request<ExchangeOrderListBase[], any>(
        `/v2/private/exchange-order/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletGetBalance
     * @summary get wallet balance info
     * @request GET:/v2/private/wallet/balance
     * @secure
     */
    walletGetBalance: (query?: { coin?: string }, params?: RequestParams) =>
      this.request<WalletBalanceBase[], any>(
        `/v2/private/wallet/balance${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Order
     * @name OrderNew
     * @summary Place active order
     * @request POST:/v2/private/order/create
     * @secure
     */
    orderNew: (
      data: {
        side: string;
        symbol: string;
        order_type: string;
        qty: number;
        price?: number;
        time_in_force: string;
        take_profit?: number;
        stop_loss?: number;
        reduce_only?: boolean;
        close_on_trigger?: boolean;
        order_link_id?: string;
      },
      params?: RequestParams,
    ) => this.request<OrderResBase[], any>(`/v2/private/order/create`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrders
     * @summary Get my active order list.
     * @request GET:/v2/private/order/list
     * @secure
     */
    orderGetOrders: (
      query: { symbol: string; limit?: number; order_status?: string; direction?: string; cursor?: string },
      params?: RequestParams,
    ) =>
      this.request<V2OrderListBase[], any>(
        `/v2/private/order/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCancel
     * @summary Get my active order list.
     * @request POST:/v2/private/order/cancel
     * @secure
     */
    orderCancel: (data: { order_id?: string; symbol: string; order_link_id?: string }, params?: RequestParams) =>
      this.request<OrderCancelBase[], any>(`/v2/private/order/cancel`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCancelAll
     * @summary Get my active order list.
     * @request POST:/v2/private/order/cancelAll
     * @secure
     */
    orderCancelAll: (data: { symbol: string }, params?: RequestParams) =>
      this.request<OrderCancelAllBase[], any>(`/v2/private/order/cancelAll`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Order
     * @name OrderReplace
     * @summary Replace active order. Only incomplete orders can be modified.
     * @request POST:/v2/private/order/replace
     * @secure
     */
    orderReplace: (
      data: { order_id?: string; order_link_id?: string; symbol: string; p_r_qty?: string; p_r_price?: string },
      params?: RequestParams,
    ) => this.request<ReplaceOrderBase[], any>(`/v2/private/order/replace`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Order
     * @name OrderQuery
     * @summary Get my active order list.
     * @request GET:/v2/private/order
     * @secure
     */
    orderQuery: (query?: { order_id?: string; symbol?: string; order_link_id?: string }, params?: RequestParams) =>
      this.request<QueryOrderBase[], any>(
        `/v2/private/order${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Conditional
     * @name ConditionalNew
     * @summary Place a new conditional order.
     * @request POST:/v2/private/stop-order/create
     * @secure
     */
    conditionalNew: (
      data: {
        side: string;
        symbol: string;
        order_type: string;
        qty: string;
        price?: string;
        base_price: string;
        stop_px: string;
        time_in_force: string;
        trigger_by?: string;
        close_on_trigger?: boolean;
        order_link_id?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<V2ConditionalBase[], any>(
        `/v2/private/stop-order/create`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Conditional
     * @name ConditionalGetOrders
     * @summary Get my conditional order list.
     * @request GET:/v2/private/stop-order/list
     * @secure
     */
    conditionalGetOrders: (
      query: { symbol: string; stop_order_status?: string; limit?: number; direction?: string; cursor?: string },
      params?: RequestParams,
    ) =>
      this.request<ConditionalOrdersResBase[], any>(
        `/v2/private/stop-order/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Conditional
     * @name ConditionalQuery
     * @summary Query real-time stop order information.
     * @request GET:/v2/private/stop-order
     * @secure
     */
    conditionalQuery: (
      query?: { stop_order_id?: string; order_link_id?: string; symbol?: string },
      params?: RequestParams,
    ) =>
      this.request<StopOrderOrdersResBase[], any>(
        `/v2/private/stop-order${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Conditional
     * @name ConditionalCancel
     * @summary Cancel conditional order.
     * @request POST:/v2/private/stop-order/cancel
     * @secure
     */
    conditionalCancel: (
      data: { stop_order_id?: string; order_link_id?: string; symbol: string },
      params?: RequestParams,
    ) =>
      this.request<V2CancelOrderBase[], any>(
        `/v2/private/stop-order/cancel`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Conditional
     * @name ConditionalCancelAll
     * @summary Cancel conditional order.
     * @request POST:/v2/private/stop-order/cancelAll
     * @secure
     */
    conditionalCancelAll: (data: { symbol: string }, params?: RequestParams) =>
      this.request<ConditionalCancelAllBase[], any>(
        `/v2/private/stop-order/cancelAll`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Conditional
     * @name ConditionalReplace
     * @summary Replace conditional order. Only incomplete orders can be modified.
     * @request POST:/v2/private/stop-order/replace
     * @secure
     */
    conditionalReplace: (
      data: {
        stop_order_id?: string;
        order_link_id?: string;
        symbol: string;
        p_r_qty?: string;
        p_r_price?: string;
        p_r_trigger_price?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<ReplaceConditionalBase[], any>(
        `/v2/private/stop-order/replace`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Execution
     * @name ExecutionGetTrades
     * @summary Get user’s trade records.
     * @request GET:/v2/private/execution/list
     * @secure
     */
    executionGetTrades: (
      query: { order_id?: string; symbol: string; start_time?: string; page?: string; limit?: string },
      params?: RequestParams,
    ) =>
      this.request<TradeRecordsBase[], any>(
        `/v2/private/execution/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Execution, Positions
     * @name PositionsClosePnlRecords
     * @summary Get user's closed profit and loss records
     * @request GET:/v2/private/trade/closed-pnl/list
     * @secure
     */
    positionsClosePnlRecords: (
      query: {
        symbol: string;
        start_time?: number;
        end_time?: number;
        exec_type?: string;
        page?: number;
        limit?: number;
      },
      params?: RequestParams,
    ) =>
      this.request<ClosedPnlBase[], any>(
        `/v2/private/trade/closed-pnl/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Market
     * @name MarketOrderbook
     * @summary Get the orderbook.
     * @request GET:/v2/public/orderBook/L2
     * @secure
     */
    marketOrderbook: (query: { symbol: string }, params?: RequestParams) =>
      this.request<OrderBookBase[], any>(
        `/v2/public/orderBook/L2${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Market
     * @name MarketSymbolInfo
     * @summary Get the latest information for symbol.
     * @request GET:/v2/public/tickers
     * @secure
     */
    marketSymbolInfo: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<SymbolInfoBase[], any>(
        `/v2/public/tickers${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Market
     * @name MarketTradingRecords
     * @summary Get recent trades
     * @request GET:/v2/public/trading-records
     * @secure
     */
    marketTradingRecords: (query: { symbol: string; from?: number; limit?: number }, params?: RequestParams) =>
      this.request<TradingRecords[], any>(
        `/v2/public/trading-records${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Kline
     * @name KlineGet
     * @summary Query historical kline.
     * @request GET:/v2/public/kline/list
     * @secure
     */
    klineGet: (query: { symbol: string; interval: string; from: number; limit?: number }, params?: RequestParams) =>
      this.request<KlineBase[], any>(
        `/v2/public/kline/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
  openApi = {
    /**
     * No description
     *
     * @tags APIkey
     * @name ApIkeyInfo
     * @summary Get account api-key information.
     * @request GET:/open-api/api-key
     * @secure
     */
    apIkeyInfo: (params?: RequestParams) =>
      this.request<APIKeyBase[], any>(`/open-api/api-key`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Positions
     * @name PositionsTradingStop
     * @summary Set Trading-Stop Condition.
     * @request POST:/open-api/position/trading-stop
     * @secure
     */
    positionsTradingStop: (
      data: {
        symbol: string;
        take_profit?: string;
        stop_loss?: string;
        trailing_stop?: string;
        new_trailing_active?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<TradingStopBase[], any>(
        `/open-api/position/trading-stop`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletGetRecords
     * @summary Get wallet fund records
     * @request GET:/open-api/wallet/fund/records
     * @secure
     */
    walletGetRecords: (
      query?: {
        start_date?: string;
        end_date?: string;
        currency?: string;
        wallet_fund_type?: string;
        page?: string;
        limit?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<FundRecordBase[], any>(
        `/open-api/wallet/fund/records${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletWithdraw
     * @summary Get wallet fund records
     * @request GET:/open-api/wallet/withdraw/list
     * @secure
     */
    walletWithdraw: (
      query?: { start_date?: string; end_date?: string; coin?: string; status?: string; page?: string; limit?: string },
      params?: RequestParams,
    ) =>
      this.request<WithdrawResBase[], any>(
        `/open-api/wallet/withdraw/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletSetRiskLimit
     * @summary Set risk limit
     * @request POST:/open-api/wallet/risk-limit
     * @secure
     */
    walletSetRiskLimit: (data: { symbol: string; risk_id: number }, params?: RequestParams) =>
      this.request<SetRiskLimitBase[], any>(`/open-api/wallet/risk-limit`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletGetRiskLimit
     * @summary Get risk limit.
     * @request GET:/open-api/wallet/risk-limit/list
     * @secure
     */
    walletGetRiskLimit: (params?: RequestParams) =>
      this.request<RiskLimitBase[], any>(`/open-api/wallet/risk-limit/list`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Funding
     * @name FundingPrevRate
     * @summary Get predicted funding rate and funding fee.
     * @request GET:/open-api/funding/prev-funding-rate
     * @secure
     */
    fundingPrevRate: (query: { symbol: string }, params?: RequestParams) =>
      this.request<FundingRateBase[], any>(
        `/open-api/funding/prev-funding-rate${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Funding
     * @name FundingMyLastFee
     * @summary Funding settlement occurs every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC. The current interval's fund fee settlement is based on the previous interval's fund rate. For example, at 16:00, the settlement is based on the fund rate generated at 8:00. The fund rate generated at 16:00 will be used at 0:00 on the next day.
     * @request GET:/open-api/funding/prev-funding
     * @secure
     */
    fundingMyLastFee: (query: { symbol: string }, params?: RequestParams) =>
      this.request<FundingFeeBase[], any>(
        `/open-api/funding/prev-funding${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Funding
     * @name FundingPredicted
     * @summary Get predicted funding rate and funding fee.
     * @request GET:/open-api/funding/predicted-funding
     * @secure
     */
    fundingPredicted: (query: { symbol: string }, params?: RequestParams) =>
      this.request<FundingPredictedBase[], any>(
        `/open-api/funding/predicted-funding${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
  user = {
    /**
     * No description
     *
     * @tags Positions
     * @name PositionsSaveLeverage
     * @summary Change user leverage.
     * @request POST:/user/leverage/save
     * @secure
     */
    positionsSaveLeverage: (data: { symbol: string; leverage: string }, params?: RequestParams) =>
      this.request<ServerTime[], any>(`/user/leverage/save`, "POST", params, data, BodyType.Json, true),
  };
  position = {
    /**
     * No description
     *
     * @tags Positions
     * @name PositionsChangeMargin
     * @summary Update margin.
     * @request POST:/position/change-position-margin
     * @secure
     */
    positionsChangeMargin: (data: { symbol: string; margin: string }, params?: RequestParams) =>
      this.request<ServerTime[], any>(`/position/change-position-margin`, "POST", params, data, BodyType.Json, true),
  };
  private = {
    /**
     * @description This will create linear order
     *
     * @tags LinearOrder
     * @name LinearOrderNew
     * @summary Create Active Order
     * @request POST:/private/linear/order/create
     * @secure
     */
    linearOrderNew: (
      data: {
        symbol?: string;
        side?: string;
        order_type?: string;
        time_in_force?: string;
        qty?: number;
        price?: number;
        take_profit?: number;
        stop_loss?: number;
        reduce_only?: boolean;
        tp_trigger_by?: string;
        sl_trigger_by?: string;
        close_on_trigger?: boolean;
        order_link_id?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearCreateOrderResultBase[], any>(
        `/private/linear/order/create`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will cancel linear active order
     *
     * @tags LinearOrder
     * @name LinearOrderCancel
     * @summary Cancel Active Order
     * @request POST:/private/linear/order/cancel
     * @secure
     */
    linearOrderCancel: (data: { order_id?: string; order_link_id?: string; symbol?: string }, params?: RequestParams) =>
      this.request<LinearCancelOrderResultBase[], any>(
        `/private/linear/order/cancel`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags LinearOrder
     * @name LinearOrderCancelAll
     * @summary Cancel all active orders.
     * @request POST:/private/linear/order/cancel-all
     * @secure
     */
    linearOrderCancelAll: (data: { symbol: string }, params?: RequestParams) =>
      this.request<LinearOrderCancelAllBase[], any>(
        `/private/linear/order/cancel-all`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get linear active orders
     *
     * @tags LinearOrder
     * @name LinearOrderGetOrders
     * @summary Get linear Active Orders
     * @request GET:/private/linear/order/list
     * @secure
     */
    linearOrderGetOrders: (
      query?: {
        order_id?: string;
        order_link_id?: string;
        symbol?: string;
        order?: string;
        page?: string;
        limit?: string;
        order_status?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearOrderRecordsResponseBase[], any>(
        `/private/linear/order/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get linear active orders(real-time)
     *
     * @tags LinearOrder
     * @name LinearOrderQuery
     * @summary Get Active Orders(real-time)
     * @request GET:/private/linear/order/search
     * @secure
     */
    linearOrderQuery: (
      query?: { symbol?: string; order_id?: string; order_link_id?: string },
      params?: RequestParams,
    ) =>
      this.request<LinearSearchOrderResultBase[], any>(
        `/private/linear/order/search${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags LinearOrder
     * @name LinearOrderReplace
     * @summary Replace Active Order
     * @request POST:/private/linear/order/replace
     * @secure
     */
    linearOrderReplace: (
      data: { symbol: string; order_id?: string; order_link_id?: string; p_r_qty?: string; p_r_price?: number },
      params?: RequestParams,
    ) =>
      this.request<LinearOrderReplace[], any>(
        `/private/linear/order/replace`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will create linear stop order
     *
     * @tags LinearConditional
     * @name LinearConditionalNew
     * @summary Create linear stop Order
     * @request POST:/private/linear/stop-order/create
     * @secure
     */
    linearConditionalNew: (
      data: {
        symbol?: string;
        side?: string;
        order_type?: string;
        qty?: number;
        price?: number;
        base_price?: number;
        stop_px?: number;
        time_in_force?: string;
        trigger_by?: string;
        reduce_only?: boolean;
        close_on_trigger?: boolean;
        order_link_id?: string;
        take_profit?: number;
        stop_loss?: number;
        tp_trigger_by?: string;
        sl_trigger_by?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearCreateStopOrderResultBase[], any>(
        `/private/linear/stop-order/create`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will cancel linear active order
     *
     * @tags LinearConditional
     * @name LinearConditionalCancel
     * @summary Cancel Active Order
     * @request POST:/private/linear/stop-order/cancel
     * @secure
     */
    linearConditionalCancel: (
      data: { stop_order_id?: string; order_link_id?: string; symbol?: string },
      params?: RequestParams,
    ) =>
      this.request<LinearCancelStopOrderResultBase[], any>(
        `/private/linear/stop-order/cancel`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags LinearConditional
     * @name LinearConditionalCancelAll
     * @summary Cancel all stop orders.
     * @request POST:/private/linear/stop-order/cancel-all
     * @secure
     */
    linearConditionalCancelAll: (data: { symbol: string }, params?: RequestParams) =>
      this.request<LinearStopOrderCancelAllBase[], any>(
        `/private/linear/stop-order/cancel-all`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get linear active orders
     *
     * @tags LinearConditional
     * @name LinearConditionalGetOrders
     * @summary Get linear Stop Orders
     * @request GET:/private/linear/stop-order/list
     * @secure
     */
    linearConditionalGetOrders: (
      query?: {
        stop_order_id?: string;
        order_link_id?: string;
        symbol?: string;
        order?: string;
        page?: string;
        limit?: string;
        stop_order_status?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearStopOrderRecordsResponseBase[], any>(
        `/private/linear/stop-order/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get linear stop orders(real-time)
     *
     * @tags LinearConditional
     * @name LinearConditionalQuery
     * @summary Get Stop Orders(real-time)
     * @request GET:/private/linear/stop-order/search
     * @secure
     */
    linearConditionalQuery: (
      query?: { symbol?: string; stop_order_id?: string; order_link_id?: string },
      params?: RequestParams,
    ) =>
      this.request<LinearSearchStopOrderResultBase[], any>(
        `/private/linear/stop-order/search${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags LinearConditional
     * @name LinearConditionalReplace
     * @summary Replace conditional order
     * @request POST:/private/linear/stop-order/replace
     * @secure
     */
    linearConditionalReplace: (
      data: {
        symbol: string;
        stop_order_id?: string;
        order_link_id?: string;
        p_r_qty?: string;
        p_r_price?: number;
        p_r_trigger_price?: number;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearStopOrderReplace[], any>(
        `/private/linear/stop-order/replace`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get my position list.
     *
     * @tags LinearPositions
     * @name LinearPositionsMyPosition
     * @summary Get my position list.
     * @request GET:/private/linear/position/list
     * @secure
     */
    linearPositionsMyPosition: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<LinearPositionListResultBase[], any>(
        `/private/linear/position/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will Set auto add margin
     *
     * @tags LinearPositions
     * @name LinearPositionsSetAutoAddMargin
     * @summary Set auto add margin
     * @request POST:/private/linear/position/set-auto-add-margin
     * @secure
     */
    linearPositionsSetAutoAddMargin: (
      data: { symbol?: string; side?: string; auto_add_margin?: boolean },
      params?: RequestParams,
    ) =>
      this.request<LinearSetMarginResult[], any>(
        `/private/linear/position/set-auto-add-margin`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will Set Leverage
     *
     * @tags LinearPositions
     * @name LinearPositionsSaveLeverage
     * @summary Set leverage
     * @request POST:/private/linear/position/set-leverage
     * @secure
     */
    linearPositionsSaveLeverage: (
      data: { symbol?: string; buy_leverage?: number; sell_leverage?: number },
      params?: RequestParams,
    ) =>
      this.request<LinearSetLeverageResult[], any>(
        `/private/linear/position/set-leverage`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will switch isolated
     *
     * @tags LinearPositions
     * @name LinearPositionsSwitchIsolated
     * @summary Switch isolated
     * @request POST:/private/linear/position/switch-isolated
     * @secure
     */
    linearPositionsSwitchIsolated: (
      data: { symbol?: string; is_isolated?: boolean; buy_leverage?: number; sell_leverage?: number },
      params?: RequestParams,
    ) =>
      this.request<LinearSwitchIsolatedResult[], any>(
        `/private/linear/position/switch-isolated`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will set tradingStop
     *
     * @tags LinearPositions
     * @name LinearPositionsTradingStop
     * @summary Set tradingStop
     * @request POST:/private/linear/position/trading-stop
     * @secure
     */
    linearPositionsTradingStop: (
      data: {
        symbol?: string;
        side?: string;
        take_profit?: number;
        stop_loss?: number;
        trailing_stop?: number;
        tp_trigger_by?: string;
        sl_trigger_by?: string;
        sl_size?: number;
        tp_size?: number;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearSetTradingStopResult[], any>(
        `/private/linear/position/trading-stop`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will Add/Reduce Margin
     *
     * @tags LinearPositions
     * @name LinearPositionsChangeMargin
     * @summary Add/Reduce Margin
     * @request POST:/private/linear/position/add-margin
     * @secure
     */
    linearPositionsChangeMargin: (data: { symbol?: string; side?: string; margin?: number }, params?: RequestParams) =>
      this.request<LinearSetMarginResult[], any>(
        `/private/linear/position/add-margin`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will Switch TP/SL Mode
     *
     * @tags LinearPositions
     * @name LinearPositionsSwitchMode
     * @summary Switch Mode
     * @request POST:/private/linear/tpsl/switch-mode
     * @secure
     */
    linearPositionsSwitchMode: (data: { symbol?: string; tp_sl_mode?: string }, params?: RequestParams) =>
      this.request<LinearSwitchModeResult[], any>(
        `/private/linear/tpsl/switch-mode`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get user's closed profit and loss records.
     *
     * @tags LinearPositions
     * @name LinearPositionsClosePnlRecords
     * @summary Get user's closed profit and loss records.
     * @request GET:/private/linear/trade/closed-pnl/list
     * @secure
     */
    linearPositionsClosePnlRecords: (
      query?: {
        symbol?: string;
        start_time?: number;
        end_time?: number;
        exec_type?: string;
        page?: number;
        limit?: number;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearClosePnlRecordsResponse[], any>(
        `/private/linear/trade/closed-pnl/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get user's trading records.
     *
     * @tags LinearExecution
     * @name LinearExecutionGetTrades
     * @summary Get user's trading records.
     * @request GET:/private/linear/trade/execution/list
     * @secure
     */
    linearExecutionGetTrades: (
      query?: {
        symbol?: string;
        start_time?: number;
        end_time?: number;
        exec_type?: string;
        page?: number;
        limit?: number;
      },
      params?: RequestParams,
    ) =>
      this.request<LinearTradeRecordsResponse[], any>(
        `/private/linear/trade/execution/list${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get prev funding
     *
     * @tags LinearFunding
     * @name LinearFundingMyLastFee
     * @summary Get prev funding
     * @request GET:/private/linear/funding/prev-funding
     * @secure
     */
    linearFundingMyLastFee: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<LinearPrevFundingRespBase[], any>(
        `/private/linear/funding/prev-funding${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags LinearFunding
     * @name LinearFundingPredicted
     * @summary Get predicted funding rate and funding fee.
     * @request GET:/private/linear/funding/predicted-funding
     * @secure
     */
    linearFundingPredicted: (query: { symbol: string }, params?: RequestParams) =>
      this.request<LinearFundingPredictedBase[], any>(
        `/private/linear/funding/predicted-funding${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
  public = {
    /**
     * @description This will get prev funding rate
     *
     * @tags LinearFunding
     * @name LinearFundingPrevRate
     * @summary Get prev funding
     * @request GET:/public/linear/funding/prev-funding-rate
     * @secure
     */
    linearFundingPrevRate: (query: { symbol: string }, params?: RequestParams) =>
      this.request<LinearPrevFundingRateRespBase[], any>(
        `/public/linear/funding/prev-funding-rate${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get kline
     *
     * @tags LinearKline
     * @name LinearKlineGet
     * @summary Get kline
     * @request GET:/public/linear/kline
     * @secure
     */
    linearKlineGet: (
      query: { symbol: string; interval: string; from: number; limit?: number },
      params?: RequestParams,
    ) =>
      this.request<LinearKlineRespBase[], any>(
        `/public/linear/kline${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get mark price kline
     *
     * @tags LinearKline
     * @name LinearKlineMarkPrice
     * @summary Get kline
     * @request GET:/public/linear/mark-price-kline
     * @secure
     */
    linearKlineMarkPrice: (
      query: { symbol: string; interval: string; from: number; limit?: number },
      params?: RequestParams,
    ) =>
      this.request<LinearKlineRespBase[], any>(
        `/public/linear/mark-price-kline${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get recent trades
     *
     * @tags LinearMarket
     * @name LinearMarketTrading
     * @summary Get recent trades
     * @request GET:/public/linear/recent-trading-records
     * @secure
     */
    linearMarketTrading: (query: { symbol: string; limit?: string }, params?: RequestParams) =>
      this.request<LinearRecentTradingRecordRespBase[], any>(
        `/public/linear/recent-trading-records${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description This will get risk limit.
     *
     * @tags LinearWallet
     * @name LinearWalletGetRiskLimit
     * @summary Get risk limit.
     * @request GET:/public/linear/risk-limit
     * @secure
     */
    linearWalletGetRiskLimit: (params?: RequestParams) =>
      this.request<LinearRiskLimitRespBase[], any>(
        `/public/linear/risk-limit`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
}
