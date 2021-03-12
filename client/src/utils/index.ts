import _ from 'lodash/fp';
import {SYMBOL, SIDE, ORD_TYPE, EXEC_INST} from 'redux/api/bitmex/types';
import {skewedProbabilityMap, uniformProbabilityMap} from './mathHelpers';
import {tickerRound, parseNumber} from '../general/formatting';
import {Order} from 'redux/api/bitmex/types';

export enum DISTRIBUTION {
  Uniform = 'Uniform',
  Normal = 'Normal',
  Positive = 'Positive',
  Negative = 'Negative',
}

export const INSTRUMENT_PARAMS: {[key in SYMBOL]: {decimal_rounding: number; ticksize: number}} = {
  XBTUSD: {decimal_rounding: 1, ticksize: 2},
  ETHUSD: {decimal_rounding: 1, ticksize: 20},
  XRPUSD: {decimal_rounding: 4, ticksize: 10000},
};

export interface DistributionProps {
  orderQty: number;
  n_tp: number;
  start: number;
  end: number;
  stop: number;
  side: SIDE;
  symbol: SYMBOL;
}

export type ScaledOrder = RegularOrder | StopLoss; //Partial<RegularOrder & StopLoss>;

export interface ScaledOrdersProps {
  ordersProps: DistributionProps;
  distribution: DISTRIBUTION;
}

export const createScaledOrders = ({ordersProps, distribution}: ScaledOrdersProps): ScaledOrder[] => {
  switch (distribution) {
    case DISTRIBUTION.Positive:
      return Positive(ordersProps);
    case DISTRIBUTION.Negative:
      return Negative(ordersProps);
    case DISTRIBUTION.Normal:
      return Normal(ordersProps);
    case DISTRIBUTION.Uniform:
    default:
      return Uniform(ordersProps);
  }
};

const Uniform = (distrProps: DistributionProps): ScaledOrder[] => skewedDistribution(distrProps, -1, 1, -1, false);
const Positive = (distrProps: DistributionProps): ScaledOrder[] => skewedDistribution(distrProps, -1, 1, -1);
const Negative = (distrProps: DistributionProps): ScaledOrder[] => skewedDistribution(distrProps, -1, 1, 1);
const Normal = (distrProps: DistributionProps): ScaledOrder[] => skewedDistribution(distrProps, -2, 2, 0);

/**
 * Order generation based on a distribution
 * @param {object} distributionProps is the inputs of the user
 * @param {number} START_CFG is a parameter for gaussian()
 * @param {number} END_CFG is a parameter for gaussian()
 * @param {number} mean of placed orders (not average)
 * @param {boolean} isSkewed indicates if its Uniform or not
 * @returns {object} Object of orders array and optional stop
 */
const skewedDistribution = (
  distributionProps: DistributionProps,
  START_CFG: number,
  END_CFG: number,
  mean: number,
  isSkewed = true,
): ScaledOrder[] => {
  const {orderQty, n_tp, start, end, side, symbol, stop} = distributionProps;
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];

  const probabilityDistribution = isSkewed
    ? skewedProbabilityMap(n_tp, START_CFG, END_CFG, mean)
    : uniformProbabilityMap(n_tp);
  const totalProbability = _.sum(probabilityDistribution);

  const start_ = tickerRound(start, symbol);
  const end_ = tickerRound(end, symbol);

  const incrPrice = tickerRound((end_ - start_) / (n_tp - 1), symbol);

  const totalOrders: RegularOrder[] = [];

  for (let i = 0; i < n_tp; i++) {
    totalOrders.push(
      createOrder({
        symbol: symbol,
        side: side,
        orderQty: Math.floor((probabilityDistribution[i] / totalProbability) * orderQty),
        price: parseNumber(start_ + i * incrPrice, decimal_rounding),
        ordType: ORD_TYPE.Limit,
        text: `order_${i + 1}`,
      }),
    );
  }

  // Price never goes above "Range end"
  if (totalOrders[totalOrders.length - 1].price > end) {
    totalOrders[totalOrders.length - 1].price = end;
  }

  const totalQuantity = _.sumBy('orderQty', totalOrders);
  // Quantity always stays the same
  if (totalQuantity < orderQty) totalOrders[totalOrders.length - 1].orderQty += orderQty - totalQuantity;

  if (stop > 0) totalOrders.push(createStopLoss({orderQty, stop, symbol, side}) as Order);

  return totalOrders;
};

type StopLossProps = Pick<Order, 'symbol' | 'orderQty' | 'side'> & {stop: number};
export type StopLoss = Pick<Order, 'symbol' | 'orderQty' | 'side' | 'stopPx' | 'ordType' | 'execInst'>;

const createStopLoss = ({orderQty, stop, symbol, side}: StopLossProps) => {
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];
  const stopPx = parseNumber(tickerRound(stop, symbol), decimal_rounding);
  const execInst = [EXEC_INST.LastPrice, EXEC_INST.ReduceOnly].join(',');
  const stopSide = side === SIDE.BUY ? SIDE.SELL : SIDE.BUY;

  return {symbol, side: stopSide, orderQty, stopPx, ordType: ORD_TYPE.Stop, execInst, text: 'stop'};
};

export type MarketOrderProps = Pick<Order, 'symbol' | 'orderQty' | 'side'>;

export type RegularOrder = Pick<Order, 'symbol' | 'price' | 'orderQty' | 'side' | 'ordType' | 'text'>;
const createOrder = (props: RegularOrder) => ({...props, execInst: EXEC_INST.ParticipateDoNotInitiate});

export type ProfitTargetProps = Pick<Order, 'orderID' | 'symbol' | 'orderQty' | 'side' | 'price'> & {stop: number};
export type ProfitTarget = ReturnType<typeof createProfitTarget>;
export const createProfitTarget = ({orderQty, symbol, stop, price, side, orderID}: ProfitTargetProps) => {
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];
  const stopPx = parseNumber(tickerRound(stop, symbol), decimal_rounding);
  const stopSide = side === SIDE.BUY ? SIDE.SELL : SIDE.BUY;

  return {
    symbol,
    orderQty,
    stopPx,
    price,
    side: stopSide,
    ordType: ORD_TYPE.StopLimit,
    text: `profit-target.${orderID}`,
  };
};
