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

export interface Account {
  makerCommission?: number;
  takerCommission?: number;
  buyerCommission?: number;
  sellerCommission?: number;
  canTrade?: boolean;
  canWithdraw?: boolean;
  canDeposit?: boolean;
  updateTime?: number;
  accountType?: string;
  balances?: { asset?: string; free?: string; locked?: string }[];
}

export interface Order {
  symbol?: string;
  origClientOrderId?: string;
  orderId?: number;

  /** Unless OCO, value will be -1 */
  orderListId?: number;
  clientOrderId?: string;
  price?: number;
  origQty?: number;
  executedQty?: number;
  cummulativeQuoteQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
}

export interface OrderDetails {
  symbol?: string;
  origClientOrderId?: string;
  orderId?: number;

  /** Unless OCO, value will be -1 */
  orderListId?: number;
  price?: number;
  origQty?: number;
  executedQty?: number;
  cummulativeQuoteQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
  stopPrice?: number;
  icebergQty?: number;
  time?: number;
  updateTime?: number;
  isWorking?: boolean;
  origQuoteOrderQty?: number;
}

export interface MarginOrder {
  symbol?: string;
  orderId?: number;
  origClientOrderId?: string;
  clientOrderId?: string;
  price?: string;
  origQty?: string;
  executedQty?: string;
  cummulativeQuoteQty?: string;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
}

export interface MarginOrderDetail {
  symbol?: string;
  orderId?: number;
  clientOrderId?: string;
  price?: string;
  origQty?: string;
  executedQty?: string;
  cummulativeQuoteQty?: string;
  status?: string;
  stopPrice?: string;
  time?: number;
  timeInForce?: string;
  type?: string;
  side?: string;
  icebergQty?: string;
  isWorking?: boolean;
  updateTime?: number;
}

export interface MarginOrderResponseAck {
  symbol?: string;
  orderId?: number;
  clientOrderId?: string;
  transactTime?: number;
}

export interface MarginOrderResponseResult {
  symbol?: string;
  orderId?: number;
  clientOrderId?: string;
  transactTime?: number;
  price?: number;
  origQty?: number;
  executedQty?: number;
  cummulativeQuoteQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
}

export interface MarginOrderResponseFull {
  symbol?: string;
  orderId?: number;
  clientOrderId?: string;
  transactTime?: number;
  price?: number;
  origQty?: number;
  executedQty?: number;
  cummulativeQuoteQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
  marginBuyBorrowAmount?: number;
  marginBuyBorrowAsset?: string;
  fills?: { price?: string; qty?: string; commission?: string; commissionAsset?: string }[];
}

export interface MarginTrade {
  commission?: string;
  commissionAsset?: string;
  id?: number;
  isBestMatch?: boolean;
  isBuyer?: boolean;
  isMaker?: boolean;
  orderId?: number;
  price?: string;
  qty?: string;
  symbol?: string;
  time?: number;
}

export interface OrderResponseAck {
  symbol?: string;
  orderId?: number;

  /** Unless OCO, value will be -1 */
  orderListId?: number;
  clientOrderId?: string;
  transactTime?: number;
}

export interface OrderResponseResult {
  symbol?: string;
  orderId?: number;

  /** Unless OCO, value will be -1 */
  orderListId?: number;
  clientOrderId?: string;
  transactTime?: number;
  price?: number;
  origQty?: number;
  executedQty?: number;
  cummulativeQuoteQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
}

export interface OrderResponseFull {
  symbol?: string;
  orderId?: number;

  /** Unless OCO, value will be -1 */
  orderListId?: number;
  clientOrderId?: string;
  transactTime?: number;
  price?: number;
  origQty?: number;
  executedQty?: number;
  cummulativeQuoteQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
  fills?: { price?: string; qty?: string; commission?: string; commissionAsset?: string }[];
}

export interface OCOOrder {
  orderListId?: number;
  contingencyType?: string;
  listStatusType?: string;
  listOrderStatus?: string;
  listClientOrderId?: string;
  transactionTime?: number;
  symbol?: string;
  orders?: { symbol?: string; orderId?: number; clientOrderId?: string }[];
}

export interface OCOOrderReport {
  orderListId?: number;
  contingencyType?: string;
  listStatusType?: string;
  listOrderStatus?: string;
  listClientOrderId?: string;
  transactionTime?: number;
  symbol?: string;
  orders?: { symbol?: string; orderId?: number; clientOrderId?: string }[];
  orderReports?: Order[];
}

export type BookTickerList = BookTicker[];

export interface BookTicker {
  symbol?: string;
  bidPrice?: string;
  bidQty?: string;
  askPrice?: string;
  askQty?: string;
}

export type PriceTickerList = PriceTicker[];

export interface PriceTicker {
  symbol?: string;
  price?: string;
}

export type TickerList = Ticker[];

export interface Ticker {
  symbol?: string;
  priceChange?: string;
  priceChangePercent?: string;
  prevClosePrice?: string;
  lastPrice?: string;
  bidPrice?: string;
  bidQty?: string;
  askPrice?: string;
  askQty?: string;
  openPrice?: string;
  highPrice?: string;
  lowPrice?: string;
  volume?: string;
  quoteVolume?: string;
  openTime?: number;
  closeTime?: number;
  firstId?: number;
  lastId?: number;
  count?: number;
}

export interface MyTrade {
  symbol?: string;

  /** trade id */
  id?: number;
  orderId?: number;
  orderListId?: number;

  /** price */
  price?: string;

  /** amount of base asset */
  qty?: string;

  /** amount of quote asset */
  quoteQty?: string;
  commission?: string;
  commissionAsset?: string;

  /** trade timestamp */
  time?: number;
  isBuyer?: boolean;
  isMaker?: boolean;
  isBestMatch?: boolean;
}

export interface Transaction {
  /** transaction id */
  tranId?: number;
}

export interface Trade {
  /** trade id */
  id?: number;

  /** price */
  price?: string;

  /** amount of base asset */
  qty?: string;

  /** amount of quote asset */
  quoteQty?: string;

  /** trade timestamp */
  time?: number;
  isBuyerMaker?: boolean;
  isBestMatch?: boolean;
}

export interface AggTrade {
  /** trade id */
  a?: number;

  /** price */
  p?: string;

  /** amount of base asset */
  q?: string;

  /** First tradeId */
  f?: number;

  /** Last tradeId */
  l?: number;

  /** Timestamp */
  T?: boolean;

  /** Was the buyer the maker? */
  m?: boolean;

  /** Was the trade the best price match? */
  M?: boolean;
}

export interface Error {
  /** error code */
  code?: number;

  /** error message */
  msg?: string;
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
  public baseUrl: string = "https://api.binance.com";
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
 * @title Binance SPOT Public API
 * @version 1.0
 * @baseUrl https://api.binance.com
 * The swagger file of Binance Public API
 *
 * API documents:
 *   - [https://github.com/binance-exchange/binance-official-api-docs](https://github.com/binance-exchange/binance-official-api-docs)
 *   - [https://binance-docs.github.io/apidocs/spot/en](https://binance-docs.github.io/apidocs/spot/en)
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Test connectivity to the Rest API. Weight 1
     *
     * @tags Market Data
     * @name V3PingList
     * @summary Test Connectivity
     * @request GET:/api/v3/ping
     */
    v3PingList: (params?: RequestParams) => this.request<any, any>(`/api/v3/ping`, "GET", params),

    /**
     * @description Test connectivity to the Rest API and get the current server time. Weight 1
     *
     * @tags Market Data
     * @name V3TimeList
     * @summary Check Server Time
     * @request GET:/api/v3/time
     */
    v3TimeList: (params?: RequestParams) => this.request<{ serverTime?: number }, any>(`/api/v3/time`, "GET", params),

    /**
     * @description Current exchange trading rules and symbol information Weight 1
     *
     * @tags Market Data
     * @name V3ExchangeInfoList
     * @summary Exchange Information
     * @request GET:/api/v3/exchangeInfo
     */
    v3ExchangeInfoList: (params?: RequestParams) =>
      this.request<
        {
          timezone?: string;
          serverTime?: number;
          rateLimits?: { rateLimitType?: string; interval?: string; intervalNum?: number; limit?: number }[];
          exchangeFilters?: object[];
          symbols?: {
            symbol?: string;
            status?: string;
            baseAsset?: string;
            baseAssetPrecision?: number;
            quoteAsset?: string;
            quoteAssetPrecision?: number;
            baseCommissionPrecision?: number;
            quoteCommissionPrecision?: number;
            orderTypes?: string[];
            icebergAllowed?: boolean;
            ocoAllowed?: boolean;
            quoteOrderQtyMarketAllowed?: boolean;
            isSpotTradingAllowed?: boolean;
            isMarginTradingAllowed?: boolean;
            filters?: { filterType?: string; minPrice?: string; maxPrice?: string; tickSize?: string }[];
            permissions?: string[];
          }[];
        },
        any
      >(`/api/v3/exchangeInfo`, "GET", params),

    /**
     * @description | Limit               | Weight  | | -------------       |---------| | 5, 10, 20, 50, 100  | 1       | | 500                 | 5       | | 1000                | 10      | | 5000                | 50      |
     *
     * @tags Market Data
     * @name V3DepthList
     * @summary Order Book
     * @request GET:/api/v3/depth
     */
    v3DepthList: (
      query: { symbol: string; limit?: 5 | 10 | 20 | 50 | 100 | 500 | 1000 | 5000 },
      params?: RequestParams,
    ) =>
      this.request<{ lastUpdateId?: number; bids?: string[][][]; asks?: string[][][] }, Error>(
        `/api/v3/depth${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description Get recent trades (up to last 500). Weight 1
     *
     * @tags Market Data
     * @name V3TradesList
     * @summary Recent Trades List
     * @request GET:/api/v3/trades
     */
    v3TradesList: (query: { symbol: string; limit?: number }, params?: RequestParams) =>
      this.request<Trade[], Error>(`/api/v3/trades${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Get older market trades. `X-MBX-APIKEY` required in header Weight 5
     *
     * @tags Market Data
     * @name V3HistoricalTradesList
     * @summary Old Trade Lookup
     * @request GET:/api/v3/historicalTrades
     * @secure
     */
    v3HistoricalTradesList: (query: { symbol: string; limit?: number; fromId?: number }, params?: RequestParams) =>
      this.request<Trade[], Error>(
        `/api/v3/historicalTrades${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated. Weight 1
     *
     * @tags Market Data
     * @name V3AggTradesList
     * @summary Compressed/Aggregate Trades List
     * @request GET:/api/v3/aggTrades
     */
    v3AggTradesList: (
      query: { symbol: string; fromId?: number; startTime?: number; endTime?: number; limit?: number },
      params?: RequestParams,
    ) => this.request<AggTrade[], Error>(`/api/v3/aggTrades${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Kline/candlestick bars for a symbol.\ Klines are uniquely identified by their open time. Weight 1
     *
     * @tags Market Data
     * @name V3KlinesList
     * @summary Kline/Candlestick Data
     * @request GET:/api/v3/klines
     */
    v3KlinesList: (
      query: {
        symbol: string;
        interval:
          | "1m"
          | "3m"
          | "5m"
          | "15m"
          | "30m"
          | "1h"
          | "2h"
          | "4h"
          | "6h"
          | "8h"
          | "12h"
          | "1d"
          | "3d"
          | "1w"
          | "1M";
        startTime?: number;
        endTime?: number;
        limit?: number;
      },
      params?: RequestParams,
    ) => this.request<any[], Error>(`/api/v3/klines${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Current average price for a symbol. Weight 1
     *
     * @tags Market Data
     * @name V3AvgPriceList
     * @summary Current Average Price
     * @request GET:/api/v3/avgPrice
     */
    v3AvgPriceList: (query: { symbol: string }, params?: RequestParams) =>
      this.request<{ mins?: number; price?: string }, Error>(
        `/api/v3/avgPrice${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description 24 hour rolling window price change statistics. Careful when accessing this with no symbol. Weight:\ `1` for a single symbol;\ `40` when the symbol parameter is omitted
     *
     * @tags Market Data
     * @name V3Ticker24HrList
     * @summary 24hr Ticker Price Change Statistics
     * @request GET:/api/v3/ticker/24hr
     */
    v3Ticker24HrList: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<Ticker | TickerList, Error>(`/api/v3/ticker/24hr${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Latest price for a symbol or symbols. Weight:\ `1` for a single symbol;\ `2` when the symbol parameter is omitted
     *
     * @tags Market Data
     * @name V3TickerPriceList
     * @summary Symbol Price Ticker
     * @request GET:/api/v3/ticker/price
     */
    v3TickerPriceList: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<PriceTicker | PriceTickerList, Error>(
        `/api/v3/ticker/price${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description Best price/qty on the order book for a symbol or symbols. Weight:\ 1 for a single symbol;\ 40 when the symbol parameter is omitted
     *
     * @tags Market Data
     * @name V3TickerBookTickerList
     * @summary Symbol Order Book Ticker
     * @request GET:/api/v3/ticker/bookTicker
     */
    v3TickerBookTickerList: (query?: { symbol?: string }, params?: RequestParams) =>
      this.request<BookTicker | BookTickerList, Error>(
        `/api/v3/ticker/bookTicker${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine. Weight: 1
     *
     * @tags Trade
     * @name V3OrderTestCreate
     * @summary Test New Order (TRADE)
     * @request POST:/api/v3/order/test
     * @secure
     */
    v3OrderTestCreate: (
      query: {
        symbol: string;
        side: "SELL" | "BUY";
        type:
          | "LIMIT"
          | "MARKET"
          | "STOP_LOSS"
          | "STOP_LOSS_LIMIT"
          | "TAKE_PROFIT"
          | "TAKE_PROFIT_LIMIT"
          | "LIMIT_MAKER";
        timeInForce?: "GTC" | "IOC" | "FOK";
        quantity?: number;
        quoteOrderQty?: number;
        price?: number;
        newClientOrderId?: string;
        stopPrice?: number;
        icebergQty?: number;
        newOrderRespType?: "ACK" | "RESULT" | "FULL";
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, Error>(
        `/api/v3/order/test${this.addQueryParams(query)}`,
        "POST",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Check an order's status. - Either `orderId` or `origClientOrderId` must be sent. - For some historical orders `cummulativeQuoteQty` will be < 0, meaning the data is not available at this time. Weight: 1
     *
     * @tags Trade
     * @name V3OrderList
     * @summary Query Order (USER_DATA)
     * @request GET:/api/v3/order
     */
    v3OrderList: (
      query: {
        symbol: string;
        orderId?: number;
        origClientOrderId?: string;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<OrderDetails, Error>(`/api/v3/order${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Send in a new order. - `LIMIT_MAKER` are `LIMIT` orders that will be rejected if they would immediately match and trade as a taker. - `STOP_LOSS` and `TAKE_PROFIT` will execute a `MARKET` order when the `stopPrice` is reached. - Any `LIMIT` or `LIMIT_MAKER` type order can be made an iceberg order by sending an `icebergQty`. - Any order with an `icebergQty` MUST have `timeInForce` set to `GTC`. - `MARKET` orders using `quantity` specifies how much a user wants to buy or sell based on the market price. - `MARKET` orders using `quoteOrderQty` specifies the amount the user wants to spend (when buying) or receive (when selling) of the quote asset; the correct quantity will be determined based on the market liquidity and `quoteOrderQty`. - `MARKET` orders using `quoteOrderQty` will not break `LOT_SIZE` filter rules; the order will execute a quantity that will have the notional value as close as possible to `quoteOrderQty`. - same `newClientOrderId` can be accepted only when the previous one is filled, otherwise the order will be rejected. Trigger order price rules against market price for both `MARKET` and `LIMIT` versions: - Price above market price: STOP_LOSS BUY, TAKE_PROFIT SELL - Price below market price: STOP_LOSS SELL, TAKE_PROFIT BUY Weight: 1
     *
     * @tags Trade
     * @name V3OrderCreate
     * @summary New Order (TRADE)
     * @request POST:/api/v3/order
     * @secure
     */
    v3OrderCreate: (
      query: {
        symbol: string;
        side: "SELL" | "BUY";
        type:
          | "LIMIT"
          | "MARKET"
          | "STOP_LOSS"
          | "STOP_LOSS_LIMIT"
          | "TAKE_PROFIT"
          | "TAKE_PROFIT_LIMIT"
          | "LIMIT_MAKER";
        timeInForce?: "GTC" | "IOC" | "FOK";
        quantity?: number;
        quoteOrderQty?: number;
        price?: number;
        newClientOrderId?: string;
        stopPrice?: number;
        icebergQty?: number;
        newOrderRespType?: "ACK" | "RESULT" | "FULL";
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<OrderResponseAck | OrderResponseResult | OrderResponseFull, Error>(
        `/api/v3/order${this.addQueryParams(query)}`,
        "POST",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Cancel an active order. Either `orderId` or `origClientOrderId` must be sent. Weight: 1
     *
     * @tags Trade
     * @name V3OrderDelete
     * @summary Cancel Order (TRADE)
     * @request DELETE:/api/v3/order
     */
    v3OrderDelete: (
      query: {
        symbol: string;
        orderId?: number;
        origClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<Order, Error>(`/api/v3/order${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @description Get all open orders on a symbol. Careful when accessing this with no symbol.\ Weight:\ `1` for a single symbol;\ `40` when the symbol parameter is omitted
     *
     * @tags Trade
     * @name V3OpenOrdersList
     * @summary Current Open Orders (USER_DATA)
     * @request GET:/api/v3/openOrders
     */
    v3OpenOrdersList: (
      query: { symbol?: string; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<OrderDetails[], Error>(`/api/v3/openOrders${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Cancels all active orders on a symbol.\ This includes OCO orders. Weight: 1
     *
     * @tags Trade
     * @name V3OpenOrdersDelete
     * @summary Cancel all Open Orders on a Symbol (TRADE)
     * @request DELETE:/api/v3/openOrders
     */
    v3OpenOrdersDelete: (
      query: { symbol: string; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<Order[], Error>(`/api/v3/openOrders${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @description Get all account orders; active, canceled, or filled.. - If orderId is set, it will get orders >= that orderId. Otherwise most recent orders are returned. - For some historical orders cummulativeQuoteQty will be < 0, meaning the data is not available at this time. Weight: 5
     *
     * @tags Trade
     * @name V3AllOrdersList
     * @summary All Orders (USER_DATA)
     * @request GET:/api/v3/allOrders
     */
    v3AllOrdersList: (
      query: {
        symbol: string;
        orderId?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<OrderDetails[], Error>(`/api/v3/allOrders${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Send in a new OCO - Price Restrictions: - SELL: Limit Price > Last Price > Stop Price - BUY: Limit Price < Last Price < Stop Price - Quantity Restrictions: - Both legs must have the same quantity - ICEBERG quantities however do not have to be the same Weight: 1
     *
     * @tags Trade
     * @name V3OrderOcoCreate
     * @summary New OCO (TRADE)
     * @request POST:/api/v3/order/oco
     */
    v3OrderOcoCreate: (
      query: {
        symbol: string;
        listClientOrderId?: string;
        side: "SELL" | "BUY";
        quantity: number;
        limitClientOrderId?: number;
        price: number;
        limitIcebergQty?: number;
        stopClientOrderId?: string;
        stopPrice: number;
        stopLimitPrice?: number;
        stopIcebergQty?: number;
        stopLimitTimeInForce?: "GTC" | "FOK" | "IOC";
        newOrderRespType?: "ACK" | "RESULT" | "FULL";
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          orderListId?: number;
          contingencyType?: string;
          listStatusType?: string;
          listOrderStatus?: string;
          listClientOrderId?: string;
          transactionTime?: number;
          symbol?: string;
          orders?: { symbol?: string; orderId?: number; clientOrderId?: string }[];
          orderReports?: {
            symbol?: string;
            orderId?: number;
            orderListId?: number;
            clientOrderId?: string;
            transactTime?: number;
            price?: string;
            origQty?: string;
            executedQty?: string;
            cummulativeQuoteQty?: string;
            status?: string;
            timeInForce?: string;
            type?: string;
            side?: string;
            stopPrice?: string;
          }[];
        },
        Error
      >(`/api/v3/order/oco${this.addQueryParams(query)}`, "POST", params),

    /**
     * @description Retrieves a specific OCO based on provided optional parameters Weight: 1
     *
     * @tags Trade
     * @name V3OrderListList
     * @summary Query OCO (USER_DATA)
     * @request GET:/api/v3/orderList
     */
    v3OrderListList: (
      query: {
        orderListId?: number;
        origClientOrderId?: string;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<OCOOrder, Error>(`/api/v3/orderList${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Cancel an entire Order List Canceling an individual leg will cancel the entire OCO Weight: 1
     *
     * @tags Trade
     * @name V3OrderListDelete
     * @summary Cancel OCO (TRADE)
     * @request DELETE:/api/v3/orderList
     */
    v3OrderListDelete: (
      query: {
        symbol: string;
        orderListId?: number;
        listClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<OCOOrderReport, Error>(`/api/v3/orderList${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @description Retrieves all OCO based on provided optional parameters Weight: 10
     *
     * @tags Trade
     * @name V3AllOrderListList
     * @summary Query all OCO (USER_DATA)
     * @request GET:/api/v3/allOrderList
     */
    v3AllOrderListList: (
      query: {
        fromId?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<OCOOrder[], Error>(`/api/v3/allOrderList${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 2
     *
     * @tags Trade
     * @name V3OpenOrderListList
     * @summary Query Open OCO (USER_DATA)
     * @request GET:/api/v3/openOrderList
     */
    v3OpenOrderListList: (
      query: { recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<OCOOrder[], Error>(`/api/v3/openOrderList${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Get current account information. Weight: 5
     *
     * @tags Trade
     * @name V3AccountList
     * @summary Account Information (USER_DATA)
     * @request GET:/api/v3/account
     */
    v3AccountList: (query: { recvWindow?: number; timestamp: number; signature: string }, params?: RequestParams) =>
      this.request<Account, Error>(`/api/v3/account${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Get trades for a specific account and symbol. If fromId is set, it will get id >= that fromId. Otherwise most recent orders are returned. Weight: 5
     *
     * @tags Trade
     * @name V3MyTradesList
     * @summary Account Trade List (USER_DATA)
     * @request GET:/api/v3/myTrades
     */
    v3MyTradesList: (
      query: {
        symbol: string;
        startTime?: number;
        endTime?: number;
        fromId?: number;
        limit?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<MyTrade, Error>(`/api/v3/myTrades${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Start a new user data stream. The stream will close after 60 minutes unless a keepalive is sent. If the account has an active listenKey, that listenKey will be returned and its validity will be extended for 60 minutes. Weight: 1
     *
     * @tags Stream
     * @name V3UserDataStreamCreate
     * @summary Create a ListenKey (USER_STREAM)
     * @request POST:/api/v3/userDataStream
     */
    v3UserDataStreamCreate: (params?: RequestParams) =>
      this.request<{ listenKey?: string }, Error>(`/api/v3/userDataStream`, "POST", params),

    /**
     * @description Keepalive a user data stream to prevent a time out. User data streams will close after 60 minutes. It's recommended to send a ping about every 30 minutes. Weight: 1
     *
     * @tags Stream
     * @name V3UserDataStreamUpdate
     * @summary Ping/Keep-alive a ListenKey (USER_STREAM)
     * @request PUT:/api/v3/userDataStream
     */
    v3UserDataStreamUpdate: (query?: { listenKey?: string }, params?: RequestParams) =>
      this.request<object, Error>(`/api/v3/userDataStream${this.addQueryParams(query)}`, "PUT", params),

    /**
     * @description Close out a user data stream. Weight: 1
     *
     * @tags Stream
     * @name V3UserDataStreamDelete
     * @summary Close a ListenKey (USER_STREAM)
     * @request DELETE:/api/v3/userDataStream
     */
    v3UserDataStreamDelete: (query?: { listenKey?: string }, params?: RequestParams) =>
      this.request<object, Error>(`/api/v3/userDataStream${this.addQueryParams(query)}`, "DELETE", params),
  };
  sapi = {
    /**
     * @description Execute transfer between spot account and margin account. Weight: 1
     *
     * @tags Margin
     * @name V1MarginTransferCreate
     * @summary Margin Account Transfer (MARGIN)
     * @request POST:/sapi/v1/margin/transfer
     */
    v1MarginTransferCreate: (
      query: { asset: string; amount: number; type?: 1 | 2; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<Transaction, Error>(`/sapi/v1/margin/transfer${this.addQueryParams(query)}`, "POST", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginTransferList
     * @summary Get Transfer History (USER_DATA)
     * @request GET:/sapi/v1/margin/transfer
     */
    v1MarginTransferList: (
      query: {
        asset?: string;
        type?: "ROLL_IN" | "ROLL_OUT";
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<object, Error>(`/sapi/v1/margin/transfer${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Apply for a loan. Weight: 1
     *
     * @tags Margin
     * @name V1MarginLoanCreate
     * @summary Margin Account Borrow (MARGIN)
     * @request POST:/sapi/v1/margin/loan
     */
    v1MarginLoanCreate: (
      query: { asset: string; amount: number; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<Transaction, Error>(`/sapi/v1/margin/loan${this.addQueryParams(query)}`, "POST", params),

    /**
     * @description `txId` or `startTime` must be sent. txId takes precedence. Weight: 1
     *
     * @tags Margin
     * @name V1MarginLoanList
     * @summary Query Load Record (USER_DATA)
     * @request GET:/sapi/v1/margin/loan
     */
    v1MarginLoanList: (
      query: {
        asset: string;
        txId?: number;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<object, Error>(`/sapi/v1/margin/loan${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Repay loan for margin account. Weight: 1
     *
     * @tags Margin
     * @name V1MarginRepayCreate
     * @summary Margin Account Repay (MARGIN)
     * @request POST:/sapi/v1/margin/repay
     */
    v1MarginRepayCreate: (
      query: { asset: string; amount: number; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<Transaction, Error>(`/sapi/v1/margin/repay${this.addQueryParams(query)}`, "POST", params),

    /**
     * @description `txId` or `startTime` must be sent. txId takes precedence. Weight: 1
     *
     * @tags Margin
     * @name V1MarginRepayList
     * @summary Query Repay Record (USER_DATA)
     * @request GET:/sapi/v1/margin/repay
     */
    v1MarginRepayList: (
      query: {
        asset: string;
        txId?: number;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          rows?: {
            amount?: string;
            asset?: string;
            interest?: string;
            principal?: string;
            status?: string;
            timestamp?: number;
            txId?: number;
          }[];
          total?: number;
        },
        Error
      >(`/sapi/v1/margin/repay${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginAssetList
     * @summary Query Margin Asset (MARKET_DATA)
     * @request GET:/sapi/v1/margin/asset
     * @secure
     */
    v1MarginAssetList: (query: { asset: string }, params?: RequestParams) =>
      this.request<
        {
          assetFullName?: string;
          assetName?: string;
          isBorrowable?: boolean;
          isMortgageable?: boolean;
          userMinBorrow?: string;
          userMinRepay?: string;
        },
        Error
      >(`/sapi/v1/margin/asset${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginPairList
     * @summary Query Margin Pair (MARKET_DATA)
     * @request GET:/sapi/v1/margin/pair
     */
    v1MarginPairList: (query: { symbol: string }, params?: RequestParams) =>
      this.request<
        {
          id?: number;
          symbol?: string;
          base?: string;
          quote?: string;
          isMarginTrade?: boolean;
          isBuyAllowed?: boolean;
          isSellAllowed?: boolean;
        },
        Error
      >(`/sapi/v1/margin/pair${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginAllAssetsList
     * @summary Get All Margin Assets (MARKET_DATA)
     * @request GET:/sapi/v1/margin/allAssets
     * @secure
     */
    v1MarginAllAssetsList: (params?: RequestParams) =>
      this.request<
        {
          assetFullName?: string;
          assetName?: string;
          isBorrowable?: boolean;
          isMortgageable?: boolean;
          userMinBorrow?: string;
          userMinRepay?: string;
        }[],
        Error
      >(`/sapi/v1/margin/allAssets`, "GET", params, null, BodyType.Json, true),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginAllPairsList
     * @summary Get All Margin Pairs (MARKET_DATA)
     * @request GET:/sapi/v1/margin/allPairs
     * @secure
     */
    v1MarginAllPairsList: (params?: RequestParams) =>
      this.request<
        {
          base?: string;
          id?: number;
          isBuyAllowed?: boolean;
          isMarginTrade?: boolean;
          isSellAllowed?: boolean;
          quote?: string;
          symbol?: string;
        }[],
        Error
      >(`/sapi/v1/margin/allPairs`, "GET", params, null, BodyType.Json, true),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginPriceIndexList
     * @summary Query Margin PriceIndex (MARKET_DATA)
     * @request GET:/sapi/v1/margin/priceIndex
     * @secure
     */
    v1MarginPriceIndexList: (query: { symbol: string }, params?: RequestParams) =>
      this.request<{ calcTime?: number; price?: string; symbol?: string }, Error>(
        `/sapi/v1/margin/priceIndex${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description - Either `orderId` or `origClientOrderId` must be sent. - For some historical orders `cummulativeQuoteQty` will be < 0, meaning the data is not available at this time. Weight: 1
     *
     * @tags Margin
     * @name V1MarginOrderList
     * @summary Query Margin Account's Order (MARKET_DATA)
     * @request GET:/sapi/v1/margin/order
     */
    v1MarginOrderList: (
      query: {
        symbol: string;
        orderId?: number;
        origClientOrderId?: string;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<MarginOrderDetail, Error>(`/sapi/v1/margin/order${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Post a new order for margin account. Weight: 1
     *
     * @tags Margin
     * @name V1MarginOrderCreate
     * @summary Margin Account New Order (TRADE)
     * @request POST:/sapi/v1/margin/order
     */
    v1MarginOrderCreate: (
      query: {
        symbol: string;
        side: "SELL" | "BUY";
        type:
          | "LIMIT"
          | "MARKET"
          | "STOP_LOSS"
          | "STOP_LOSS_LIMIT"
          | "TAKE_PROFIT"
          | "TAKE_PROFIT_LIMIT"
          | "LIMIT_MAKER";
        quantity: number;
        price?: number;
        stopPrice?: number;
        newClientOrderId?: string;
        icebergQty?: number;
        newOrderRespType?: "ACK" | "RESULT" | "FULL";
        sideEffectType?: "NO_SIDE_EFFECT" | "MARGIN_BUY" | "AUTO_REPAY";
        timeInForce?: "GTC" | "IOC" | "FOK";
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<MarginOrderResponseAck | MarginOrderResponseResult | MarginOrderResponseFull, Error>(
        `/sapi/v1/margin/order${this.addQueryParams(query)}`,
        "POST",
        params,
      ),

    /**
     * @description Cancel an active order for margin account. Either orderId or origClientOrderId must be sent. Weight: 1
     *
     * @tags Margin
     * @name V1MarginOrderDelete
     * @summary Margin Account Cancel Order (TRADE)
     * @request DELETE:/sapi/v1/margin/order
     */
    v1MarginOrderDelete: (
      query: {
        symbol: string;
        orderId?: number;
        origClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<MarginOrder, Error>(`/sapi/v1/margin/order${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginInterestHistoryList
     * @summary Query Interest History (MARKET_DATA)
     * @request GET:/sapi/v1/margin/interestHistory
     */
    v1MarginInterestHistoryList: (
      query: {
        asset?: string;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          rows?: {
            asset?: string;
            interest?: string;
            interestAccuredTime?: number;
            interestRate?: string;
            principal?: string;
            type?: string;
          }[];
          total?: number;
        },
        Error
      >(`/sapi/v1/margin/interestHistory${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginForceLiquidationRecList
     * @summary Get Force Liquidation Record (USER_DATA)
     * @request GET:/sapi/v1/margin/forceLiquidationRec
     */
    v1MarginForceLiquidationRecList: (
      query: {
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<object, any>(`/sapi/v1/margin/forceLiquidationRec${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginAccountList
     * @summary Query Margin Account Details (USER_DATA)
     * @request GET:/sapi/v1/margin/account
     */
    v1MarginAccountList: (
      query: { recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<
        {
          borrowEnabled?: boolean;
          marginLevel?: string;
          totalAssetOfBtc?: string;
          totalLiabilityOfBtc?: string;
          totalNetAssetOfBtc?: string;
          tradeEnabled?: boolean;
          transferEnabled?: boolean;
          userAssets?: {
            asset?: string;
            borrowed?: string;
            free?: string;
            interest?: string;
            locked?: string;
            netAsset?: string;
          }[];
        },
        Error
      >(`/sapi/v1/margin/account${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description - If the symbol is not sent, orders for all symbols will be returned in an array. - When all symbols are returned, the number of requests counted against the rate limiter is equal to the number of symbols currently trading on the exchange Weight: 1
     *
     * @tags Margin
     * @name V1MarginOpenOrdersList
     * @summary Query Margin Account's Open Order (USER_DATA)
     * @request GET:/sapi/v1/margin/openOrders
     */
    v1MarginOpenOrdersList: (
      query: { symbol?: string; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<MarginOrderDetail[], Error>(
        `/sapi/v1/margin/openOrders${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description - If `orderId` is set, it will get orders >= that orderId. Otherwise most recent orders are returned. - For some historical orders `cummulativeQuoteQty` will be < 0, meaning the data is not available at this time. Weight: 1
     *
     * @tags Margin
     * @name V1MarginAllOrdersList
     * @summary Query Margin Account's All Order (USER_DATA)
     * @request GET:/sapi/v1/margin/allOrders
     */
    v1MarginAllOrdersList: (
      query: {
        symbol: string;
        orderId?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<MarginOrderDetail[], Error>(`/sapi/v1/margin/allOrders${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 1
     *
     * @tags Margin
     * @name V1MarginMyTradesList
     * @summary If fromId is set, it will get orders >= that fromId. Otherwise most recent orders are returned.
     * @request GET:/sapi/v1/margin/myTrades
     */
    v1MarginMyTradesList: (
      query: {
        symbol: string;
        startTime?: number;
        endTime?: number;
        fromId?: number;
        limit?: number;
        recvWindow?: number;
        timestamp: number;
        signature: string;
      },
      params?: RequestParams,
    ) => this.request<MarginTrade[], Error>(`/sapi/v1/margin/myTrades${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 5
     *
     * @tags Margin
     * @name V1MarginMaxBorrowableList
     * @summary Query Max Borrow (USER_DATA)
     * @request GET:/sapi/v1/margin/maxBorrowable
     */
    v1MarginMaxBorrowableList: (
      query: { symbol: string; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<object, Error>(`/sapi/v1/margin/maxBorrowable${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 5
     *
     * @tags Margin
     * @name V1MarginMaxTransferableList
     * @summary Query Max Transfer-Out Amount (USER_DATA)
     * @request GET:/sapi/v1/margin/maxTransferable
     */
    v1MarginMaxTransferableList: (
      query: { symbol: string; recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) => this.request<object, Error>(`/sapi/v1/margin/maxTransferable${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Get information of coins (available for deposit and withdraw) for user. Weight: 1
     *
     * @tags Wallet
     * @name V1CapitalConfigGetallList
     * @summary All Coins' Information (USER_DATA)
     * @request GET:/sapi/v1/capital/config/getall
     */
    v1CapitalConfigGetallList: (
      query: { recvWindow?: number; timestamp: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<
        {
          coin?: string;
          depositAllEnable?: boolean;
          free?: string;
          freeze?: string;
          ipoable?: string;
          ipoing?: string;
          isLegalMoney?: number;
          locked?: string;
          name?: string;
          networkList?: {
            addressRegex?: string;
            coin?: string;
            depositDesc?: string;
            depositEnable?: boolean;
            isDefault?: boolean;
            memoRegex?: string;
            minConfirm?: number;
            name?: string;
            resetAddressStatus?: boolean;
            specialTips?: string;
            unLockConfirm?: number;
            withdrawDesc?: string;
            withdrawEnable?: boolean;
            withdrawFee?: string;
            withdrawMin?: string;
          }[];
          storage?: string;
          trading?: boolean;
          withdrawAllEnable?: boolean;
          withdrawing?: string;
        },
        Error
      >(`/sapi/v1/capital/config/getall${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Weight: 1
     *
     * @tags Wallet
     * @name V1AccountSnapshotList
     * @summary Daily Account Snapshot (USER_DATA)
     * @request GET:/sapi/v1/accountSnapshot
     */
    v1AccountSnapshotList: (
      query: {
        type: "SPOT" | "MARGIN" | "FUTURES";
        startTime?: number;
        endTime?: number;
        limit: number;
        timestamp: number;
        recvWindow?: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          code?: number;
          msg?: string;
          snapshotVos?: {
            data?: { balances?: { asset?: string; free?: string; locked?: string }[]; totalAssetOfBtc?: string };
            type?: string;
            updateTime?: number;
          }[];
        },
        Error
      >(`/sapi/v1/accountSnapshot${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description This request will disable fastwithdraw switch under your account. You need to enable "trade" option for the api key which requests this endpoint. Weight: 1
     *
     * @tags Wallet
     * @name V1AccountDisableFastWithdrawSwitchCreate
     * @summary Disable Fast Withdraw Switch (USER_DATA)
     * @request POST:/sapi/v1/account/disableFastWithdrawSwitch
     */
    v1AccountDisableFastWithdrawSwitchCreate: (
      query: { timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<any, Error>(
        `/sapi/v1/account/disableFastWithdrawSwitch${this.addQueryParams(query)}`,
        "POST",
        params,
      ),

    /**
     * @description - This request will enable fastwithdraw switch under your account. You need to enable "trade" option for the api key which requests this endpoint. - When Fast Withdraw Switch is on, transferring funds to a Binance account will be done instantly. There is no on-chain transaction, no transaction ID and no withdrawal fee. Weight: 1
     *
     * @tags Wallet
     * @name V1AccountEnableFastWithdrawSwitchCreate
     * @summary Enable Fast Withdraw Switch (USER_DATA)
     * @request POST:/sapi/v1/account/enableFastWithdrawSwitch
     */
    v1AccountEnableFastWithdrawSwitchCreate: (
      query: { timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<any, Error>(
        `/sapi/v1/account/enableFastWithdrawSwitch${this.addQueryParams(query)}`,
        "POST",
        params,
      ),

    /**
     * @description Submit a withdraw request. - If network not send, return with default network of the coin. - You can get network and isDefault in networkList of a coin in the response of `Get /sapi/v1/capital/config/getall (HMAC SHA256)`. Weight: 1
     *
     * @tags Wallet
     * @name V1CapitalWithdrawApplyCreate
     * @summary Withdraw
     * @request POST:/sapi/v1/capital/withdraw/apply
     */
    v1CapitalWithdrawApplyCreate: (
      query: {
        coin: string;
        withdrawOrderId?: string;
        network?: string;
        address: string;
        addressTag?: string;
        amount: number;
        transactionFeeFlag?: boolean;
        name?: string;
        timestamp: number;
        recvWindow?: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<{ id?: string }, Error>(
        `/sapi/v1/capital/withdraw/apply${this.addQueryParams(query)}`,
        "POST",
        params,
      ),

    /**
     * @description Fetch deposit history. - Please notice the default startTime and endTime to make sure that time interval is within 0-90 days. - If both startTime and endTime are sent, time between startTime and endTime must be less than 90 days. Weight: 1
     *
     * @tags Wallet
     * @name V1CapitalDepositHisrecList
     * @summary Deposit History（supporting network） (USER_DATA)
     * @request GET:/sapi/v1/capital/deposit/hisrec
     */
    v1CapitalDepositHisrecList: (
      query: {
        coin?: string;
        status?: 0 | 6 | 1;
        startTime?: number;
        endTime?: number;
        offset?: number;
        limit?: number;
        timestamp: number;
        recvWindow?: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          address?: string;
          addressTag?: string;
          amount?: string;
          coin?: string;
          insertTime?: number;
          network?: string;
          status?: number;
          txId?: string;
        }[],
        any
      >(`/sapi/v1/capital/deposit/hisrec${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Fetch withdraw history. - network may not be in the response for old withdraw. - Please notice the default startTime and endTime to make sure that time interval is within 0-90 days. - If both startTime and endTime are sent, time between startTime and endTime must be less than 90 days Weight: 1
     *
     * @tags Wallet
     * @name V1CapitalWithdrawHistoryList
     * @summary Withdraw History (supporting network) (USER_DATA)
     * @request GET:/sapi/v1/capital/withdraw/history
     */
    v1CapitalWithdrawHistoryList: (
      query: {
        coin?: string;
        status?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        startTime?: number;
        endTime?: number;
        offset?: number;
        limit?: number;
        timestamp: number;
        recvWindow?: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          address?: string;
          amount?: string;
          applyTime?: string;
          coin?: string;
          id?: string;
          network?: string;
          status?: number;
          txId?: string;
        }[],
        Error
      >(`/sapi/v1/capital/withdraw/history${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Fetch withdraw history. - network may not be in the response for old withdraw. - Please notice the default startTime and endTime to make sure that time interval is within 0-90 days. - If both startTime and endTime are sent, time between startTime and endTime must be less than 90 days Weight: 1
     *
     * @tags Wallet
     * @name V1CapitalDepositAddressList
     * @summary Withdraw History (supporting network) (USER_DATA)
     * @request GET:/sapi/v1/capital/deposit/address
     */
    v1CapitalDepositAddressList: (
      query: { coin: string; network?: string; timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<{ address?: string; coin?: string; tag?: string; url?: string }, Error>(
        `/sapi/v1/capital/deposit/address${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description Convert dust assets to BNB. Weight: 1
     *
     * @tags Wallet
     * @name V1AssetDustCreate
     * @summary Dust Transfer
     * @request POST:/sapi/v1/asset/dust
     */
    v1AssetDustCreate: (
      query: { asset: string; timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<
        {
          totalServiceCharge?: string;
          totalTransfered?: string;
          transferResult?: {
            amount?: string;
            fromAsset?: string;
            operateTime?: number;
            serviceChargeAmount?: string;
            tranId?: number;
            transferedAmount?: string;
          }[];
        },
        Error
      >(`/sapi/v1/asset/dust${this.addQueryParams(query)}`, "POST", params),

    /**
     * @description Query asset Dividend Record Weight: 1
     *
     * @tags Wallet
     * @name V1AssetAssetDividendList
     * @summary Dust Transfer
     * @request GET:/sapi/v1/asset/assetDividend
     */
    v1AssetAssetDividendList: (
      query: {
        asset?: string;
        startTime?: number;
        endTime?: number;
        limit: string;
        timestamp: number;
        recvWindow?: number;
        signature: string;
      },
      params?: RequestParams,
    ) =>
      this.request<
        {
          rows?: { amount?: string; asset?: string; divTime?: number; enInfo?: string; tranId?: number }[];
          total?: number;
        },
        Error
      >(`/sapi/v1/asset/assetDividend${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Start a new user data stream. The stream will close after 60 minutes unless a keepalive is sent. If the account has an active listenKey, that listenKey will be returned and its validity will be extended for 60 minutes. Weight: 1
     *
     * @tags Margin Stream
     * @name V1UserDataStreamCreate
     * @summary Create a ListenKey (USER_STREAM)
     * @request POST:/sapi/v1/userDataStream
     */
    v1UserDataStreamCreate: (params?: RequestParams) =>
      this.request<{ listenKey?: string }, Error>(`/sapi/v1/userDataStream`, "POST", params),

    /**
     * @description Keepalive a user data stream to prevent a time out. User data streams will close after 60 minutes. It's recommended to send a ping about every 30 minutes. Weight: 1
     *
     * @tags Margin Stream
     * @name V1UserDataStreamUpdate
     * @summary Ping/Keep-alive a ListenKey (USER_STREAM)
     * @request PUT:/sapi/v1/userDataStream
     */
    v1UserDataStreamUpdate: (query?: { listenKey?: string }, params?: RequestParams) =>
      this.request<object, Error>(`/sapi/v1/userDataStream${this.addQueryParams(query)}`, "PUT", params),

    /**
     * @description Close out a user data stream. Weight: 1
     *
     * @tags Margin Stream
     * @name V1UserDataStreamDelete
     * @summary Close a ListenKey (USER_STREAM)
     * @request DELETE:/sapi/v1/userDataStream
     */
    v1UserDataStreamDelete: (query?: { listenKey?: string }, params?: RequestParams) =>
      this.request<object, Error>(`/sapi/v1/userDataStream${this.addQueryParams(query)}`, "DELETE", params),
  };
  wapi = {
    /**
     * @description Weight: 1
     *
     * @tags Wallet
     * @name V3SystemStatusHtmlList
     * @summary System Status (System)
     * @request GET:/wapi/v3/systemStatus.html
     */
    v3SystemStatusHtmlList: (params?: RequestParams) =>
      this.request<object, any>(`/wapi/v3/systemStatus.html`, "GET", params),

    /**
     * @description Fetch account status detail. Weight: 1
     *
     * @tags Wallet
     * @name V3AccountStatusHtmlList
     * @summary Account Status (USER_DATA)
     * @request GET:/wapi/v3/accountStatus.html
     */
    v3AccountStatusHtmlList: (
      query: { timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<{ msg?: string; success?: boolean }, Error>(
        `/wapi/v3/accountStatus.html${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @description Fetch account api trading status detail. Weight: 1
     *
     * @tags Wallet
     * @name V3ApiTradingStatusHtmlList
     * @summary Account API Trading Status (USER_DATA)
     * @request GET:/wapi/v3/apiTradingStatus.html
     */
    v3ApiTradingStatusHtmlList: (
      query: { timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<
        {
          success?: boolean;
          status?: {
            isLocked?: boolean;
            plannedRecoverTime?: number;
            triggerCondition?: { gcr?: number; ifer?: number; ufr?: number };
            indicators?: { BTCUSDT?: { i?: string; c?: number; v?: number; t?: number }[] };
            updateTime?: number;
          };
        },
        Error
      >(`/wapi/v3/apiTradingStatus.html${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Fetch small amounts of assets exchanged BNB records. Weight: 1
     *
     * @tags Wallet
     * @name V3UserAssetDribbletLogHtmlList
     * @summary DustLog (USER_DATA)
     * @request GET:/wapi/v3/userAssetDribbletLog.html
     */
    v3UserAssetDribbletLogHtmlList: (
      query: { timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<
        {
          success?: boolean;
          results?: {
            total?: number;
            rows?: {
              transfered_total?: string;
              service_charge_total?: string;
              tran_id?: number;
              logs?: {
                tranId?: number;
                serviceChargeAmount?: string;
                uid?: string;
                amount?: string;
                operateTime?: string;
                transferedAmount?: string;
                fromAsset?: string;
              }[];
              operate_item?: string;
            }[];
          };
        },
        Error
      >(`/wapi/v3/userAssetDribbletLog.html${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Fetch details of assets supported on Binance. Please get network and other deposit or withdraw details from `GET /sapi/v1/capital/config/getall`. Weight: 1
     *
     * @tags Wallet
     * @name V3AssetDetailHtmlList
     * @summary Asset Detail (USER_DATA)
     * @request GET:/wapi/v3/assetDetail.html
     */
    v3AssetDetailHtmlList: (
      query: { timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<
        {
          success?: boolean;
          assetDetail?: {
            CTR?: {
              minWithdrawAmount?: string;
              depositStatus?: boolean;
              withdrawFee?: string;
              withdrawStatus?: boolean;
            };
          };
        },
        Error
      >(`/wapi/v3/assetDetail.html${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description Fetch trade fee, values in percentage. Weight: 1
     *
     * @tags Wallet
     * @name V3TradeFeeHtmlList
     * @summary Trade Fee (USER_DATA)
     * @request GET:/wapi/v3/tradeFee.html
     */
    v3TradeFeeHtmlList: (
      query: { symbol?: string; timestamp: number; recvWindow?: number; signature: string },
      params?: RequestParams,
    ) =>
      this.request<{ success?: boolean; tradeFee?: { symbol?: string; maker?: number; taker?: number }[] }, Error>(
        `/wapi/v3/tradeFee.html${this.addQueryParams(query)}`,
        "GET",
        params,
      ),
  };
}
