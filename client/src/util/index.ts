import * as _ from 'lodash/fp';
import {orderType, SYMBOLS, SIDE, ORD_TYPE, EXEC_INST} from './BitMEX-types';
import {skewedProbabilityMap, uniformProbabilityMap} from './mathHelpers';

type InstrumentParams = {
  [K in SYMBOLS]: {
    decimal_rounding: number;
    ticksize: number;
  };
};

export enum DISTRIBUTIONS {
  Uniform = 'Uniform',
  Normal = 'Normal',
  Positive = 'Positive',
  Negative = 'Negative',
}

const INSTRUMENT_PARAMS: InstrumentParams = {
  XBTUSD: {decimal_rounding: 3, ticksize: 2},
  ETHUSD: {decimal_rounding: 3, ticksize: 20},
  XRPUSD: {decimal_rounding: 4, ticksize: 10000},
};

export interface ScaledOrdersProps {
  orderQty: number;
  n_tp: number;
  start: number;
  end: number;
  stop: number;
  side: SIDE;
  symbol: SYMBOLS;
}

export interface ScaledOrders {
  orders: Order[];
  stop: Partial<StopLoss>;
}

export const createScaledOrders = (ordersProps: ScaledOrdersProps, distribution: DISTRIBUTIONS): ScaledOrders => {
  switch (distribution) {
    case DISTRIBUTIONS.Positive:
      return Positive(ordersProps);
    case DISTRIBUTIONS.Negative:
      return Negative(ordersProps);
    case DISTRIBUTIONS.Normal:
      return Normal(ordersProps);
    case DISTRIBUTIONS.Uniform:
    default:
      return Uniform(ordersProps);
  }
};

const Uniform = (ordersProps: ScaledOrdersProps): ScaledOrders => skewedDistribution(ordersProps, -1, 1, -1, false);
const Positive = (ordersProps: ScaledOrdersProps): ScaledOrders => skewedDistribution(ordersProps, -1, 1, -1);
const Negative = (ordersProps: ScaledOrdersProps): ScaledOrders => skewedDistribution(ordersProps, -1, 1, 1);
const Normal = (ordersProps: ScaledOrdersProps): ScaledOrders => skewedDistribution(ordersProps, -2, 2, 0);

/**
 * Order generation based on a distribution
 * @param {object} ordersProps is the inputs of the user
 * @param {number} START_CFG is a parameter for gaussian()
 * @param {number} END_CFG is a parameter for gaussian()
 * @param {number} mean of placed orders (not average)
 * @param {boolean} isSkewed indicates if its Uniform or not
 * @returns {object} Object of orders array and stop(if any)
 */
const skewedDistribution = (
  ordersProps: ScaledOrdersProps,
  START_CFG: number,
  END_CFG: number,
  mean: number,
  isSkewed = true,
): ScaledOrders => {
  const {orderQty, n_tp, start, end, side, symbol, stop} = ordersProps;
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];

  const probabilityDistribution = isSkewed
    ? skewedProbabilityMap(n_tp, START_CFG, END_CFG, mean)
    : uniformProbabilityMap(n_tp);
  const totalProbability = _.sum(probabilityDistribution);

  const start_ = tickerRound(start, symbol);
  const end_ = tickerRound(end, symbol);

  const incrPrice = tickerRound((end_ - start_) / (n_tp - 1), symbol);

  const totalOrders: ScaledOrders = {orders: [], stop: {}};

  for (let i = 0; i < n_tp; i++) {
    //ROUND
    totalOrders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: Math.floor((probabilityDistribution[i] / totalProbability) * orderQty),
      price: parseFloat((start_ + i * incrPrice).toFixed(decimal_rounding)),
      ordType: ORD_TYPE.Limit,
      execInst: EXEC_INST.ParticipateDoNotInitiate,
      text: `order_${i + 1}`,
    });
  }
  // Add stop loss order
  if (stop > 0) {
    const __stop = createStopLoss({orderQty, stop, symbol, side});
    totalOrders.stop = __stop;
  }
  // Price never goes above "Range end"
  if (totalOrders.orders[totalOrders.orders.length - 1].price > end) {
    totalOrders.orders[totalOrders.orders.length - 1].price = end;
  }

  const totalQuantity = _.sumBy('orderQty', totalOrders.orders);

  // Quantity always stays the same
  if (totalQuantity < orderQty) {
    totalOrders.orders[totalOrders.orders.length - 1].orderQty =
      totalOrders.orders[totalOrders.orders.length - 1].orderQty + orderQty - totalQuantity;
  }
  return totalOrders;
};

type StopLossProps = Pick<orderType, 'symbol' | 'orderQty' | 'side'> & {text_index?: number; stop: number};
type StopLoss = Pick<orderType, 'symbol' | 'side' | 'orderQty' | 'stopPx' | 'ordType' | 'execInst' | 'text'>;

const createStopLoss = ({orderQty, stop, symbol, side, text_index = 1}: StopLossProps): StopLoss => {
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];
  const price = tickerRound(stop, symbol);

  return {
    symbol,
    side: side === SIDE.BUY ? SIDE.SELL : SIDE.BUY,
    orderQty,
    stopPx: parseFloat(price.toFixed(decimal_rounding)),
    ordType: ORD_TYPE.Stop,
    execInst: EXEC_INST.LastPrice + ',' + EXEC_INST.ReduceOnly,
    text: `stop_${text_index}`,
  };
};

type MarketOrderProps = Pick<orderType, 'symbol' | 'orderQty' | 'side'>;
type MarketOrder = Pick<orderType, 'symbol' | 'orderQty' | 'side' | 'ordType'>;

export const createMarketOrder = ({symbol, orderQty, side}: MarketOrderProps): MarketOrder => {
  return {symbol, orderQty, side, ordType: ORD_TYPE.Market};
};

type OrderText = {text_index?: number; text_prefix?: string};
type OrderProps = OrderText & Pick<orderType, 'symbol' | 'price' | 'orderQty' | 'side' | 'ordType'>;
export type Order = Pick<orderType, 'symbol' | 'price' | 'orderQty' | 'side' | 'ordType' | 'text' | 'execInst'>;

export const createOrder = (props: OrderProps): Order => {
  const {symbol, price, orderQty, side, ordType, text_index = 0, text_prefix = 'order'} = props;

  const text = `${text_prefix}_${text_index}`;
  const execInst = EXEC_INST.ParticipateDoNotInitiate;

  return {symbol, price, orderQty, side, ordType, text, execInst};
};

type AmendOrderProps = Pick<orderType, 'orderID' | 'price'>;
type AmendOrder = Pick<orderType, 'orderID' | 'price'>;

export const amendOrder = ({orderID, price}: AmendOrderProps): AmendOrder => {
  return {orderID, price};
};

const tickerRound = (number: number, symbol: SYMBOLS): number => {
  // Ticksize - 1 divided by this number
  const {ticksize} = INSTRUMENT_PARAMS[symbol];
  return Math.round(number * ticksize) / ticksize;
};
