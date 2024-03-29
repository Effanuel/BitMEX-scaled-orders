import {SYMBOL} from 'redux/api/bitmex/types';

interface Instrument {
  symbol: SYMBOL;
  askPrice: number;
  bidPrice: number;
}

export const partialInstrument = ({askPrice, bidPrice, symbol}: Instrument) => ({
  table: 'instrument',
  action: 'partial',
  keys: ['symbol'],
  data: [{bidPrice, askPrice, symbol, ...commonData}],
});

export const updateInstrument = ({askPrice, bidPrice, symbol}: Instrument) => ({
  table: 'instrument',
  action: 'update',
  keys: ['symbol'],
  data: [{bidPrice, askPrice, symbol, ...commonData}],
});

const commonData = {
  rootSymbol: 'XBT',
  state: 'Open',
  typ: 'FFWCSX',
  listing: '2016-05-04T12:00:00.000Z',
  front: '2016-05-04T12:00:00.000Z',
  expiry: null,
  settle: null,
  relistInterval: null,
  inverseLeg: '',
  sellLeg: '',
  buyLeg: '',
  optionStrikePcnt: null,
  optionStrikeRound: null,
  optionStrikePrice: null,
  optionMultiplier: null,
  positionCurrency: 'USD',
  underlying: 'XBT',
  quoteCurrency: 'USD',
  underlyingSymbol: 'XBT=',
  reference: 'BMEX',
  referenceSymbol: '.BXBT',
  calcInterval: null,
  publishInterval: null,
  publishTime: null,
  maxOrderQty: 10000000,
  maxPrice: 1000000,
  lotSize: 1,
  tickSize: 0.5,
  multiplier: -100000000,
  settlCurrency: 'XBt',
  underlyingToPositionMultiplier: null,
  underlyingToSettleMultiplier: -100000000,
  quoteToSettleMultiplier: null,
  isQuanto: false,
  isInverse: true,
  initMargin: 0.01,
  maintMargin: 0.0035,
  riskLimit: 20000000000,
  riskStep: 10000000000,
  limit: null,
  capped: false,
  taxed: true,
  deleverage: true,
  makerFee: -0.00025,
  takerFee: 0.00075,
  settlementFee: 0,
  insuranceFee: 0,
  fundingBaseSymbol: '.XBTBON8H',
  fundingQuoteSymbol: '.USDBON8H',
  fundingPremiumSymbol: '.XBTUSDPI8H',
  fundingTimestamp: '2020-09-14T04:00:00.000Z',
  fundingInterval: '2000-01-01T08:00:00.000Z',
  fundingRate: 0.004036,
  indicativeFundingRate: 0.002536,
  rebalanceTimestamp: null,
  rebalanceInterval: null,
  openingTimestamp: '2020-09-13T20:00:00.000Z',
  closingTimestamp: '2020-09-13T21:00:00.000Z',
  sessionInterval: '2000-01-01T01:00:00.000Z',
  prevClosePrice: 10332.31,
  limitDownPrice: null,
  limitUpPrice: null,
  bankruptLimitDownPrice: null,
  bankruptLimitUpPrice: null,
  prevTotalVolume: 135243694699,
  totalVolume: 135243781116,
  volume: 86417,
  volume24h: 5784474,
  prevTotalTurnover: 1917928783187250,
  totalTurnover: 1917929620452887,
  turnover: 837265637,
  turnover24h: 55265247218,
  homeNotional24h: 552.6524721799997,
  foreignNotional24h: 5784474,
  prevPrice24h: 10446.5,
  vwap: 10466.8202,
  highPrice: 10679,
  lowPrice: 10268,
  lastPrice: 10322,
  lastPriceProtected: 10322,
  lastTickDirection: 'ZeroPlusTick',
  lastChangePcnt: -0.0119,

  midPrice: 10321.75,
  impactBidPrice: 10272.2137,
  impactMidPrice: 10297.25,
  impactAskPrice: 10322.0479,
  hasLiquidity: false,
  openInterest: 64290545,
  openValue: 622268185055,
  fairMethod: 'FundingRate',
  fairBasisRate: 4.41942,
  fairBasis: 39.21,
  fairPrice: 10332.16,
  markMethod: 'FairPrice',
  markPrice: 10332.16,
  indicativeTaxRate: 0,
  indicativeSettlePrice: 10292.95,
  optionUnderlyingPrice: null,
  settledPrice: null,
  timestamp: '2020-09-13T20:27:10.000Z',
};
