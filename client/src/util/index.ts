import {orderType, SYMBOLS, SIDE} from './BitMEX-types';
import {gaussian} from './mathHelpers';

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

/**
 * Setting one of the distributions
 */
// TOOD ADD DISTRIBUTION AS ENUM
export const createScaledOrders = ({
  quantity,
  n_tp,
  start,
  end,
  side,
  stop,
  distribution,
  symbol,
}: ScaledOrdersProps): ScaledOrders => {
  switch (distribution) {
    case DISTRIBUTIONS.Positive:
      return Positive({quantity, n_tp, start, end, side, symbol, stop});
    case DISTRIBUTIONS.Negative:
      return Negative({quantity, n_tp, start, end, side, symbol, stop});
    case DISTRIBUTIONS.Normal:
      return Normal({quantity, n_tp, start, end, side, symbol, stop});
    case DISTRIBUTIONS.Uniform:
    default:
      return Uniform({quantity, n_tp, start, end, side, symbol, stop});
  }
};

const Uniform = (Props: DistributionProps): ScaledOrders => skewedDistribution(Props, -1, 1, -1, false);

const Positive = (Props: DistributionProps): ScaledOrders => skewedDistribution(Props, -1, 1, -1);

const Negative = (Props: DistributionProps): ScaledOrders => skewedDistribution(Props, -1, 1, 1);

const Normal = (Props: DistributionProps): ScaledOrders => skewedDistribution(Props, -2, 2, 0);

/**
 * Order generation based on a distribution
 * @param {object} Props is the inputs of the user
 * @param {number} START_CFG is a parameter for gaussian()
 * @param {number} END_CFG is a parameter for gaussian()
 * @param {number} mean of placed orders (not average)
 * @param {boolean} isSkewed indicates if its Uniform or not
 * @returns {object} Object of orders array and stop(if any)
 */
const skewedDistribution = (
  Props: DistributionProps,
  START_CFG: number,
  END_CFG: number,
  mean: number,
  isSkewed = true,
): ScaledOrders => {
  const {quantity, n_tp, start, end, side, symbol, stop} = Props;
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];

  //Determening spread of the ticker
  //Appropriate rounding, else the order is going to get rejected
  const start_ = tickerRound(start, symbol);
  const end_ = tickerRound(end, symbol);

  const incrementQty = (END_CFG - START_CFG) / (n_tp - 1);

  const probability_distribution: number[] = isSkewed
    ? Array.from(Array(n_tp).keys()).map((_, index) => gaussian(mean, START_CFG + index * incrementQty, 1))
    : Array(n_tp).fill(1);

  const total_probability = probability_distribution.reduce((total: number, number: number) => total + number, 0);
  // How much to increment the price of every order
  const incrPrice = tickerRound((end_ - start_) / (n_tp - 1), symbol);

  const totalOrders: ScaledOrders = {orders: [], stop: {}};

  // Pushing orders to main array
  for (let i = 0; i < n_tp; i++) {
    //ROUND
    totalOrders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: Math.floor((probability_distribution[i] / total_probability) * quantity),
      price: parseFloat((start_ + i * incrPrice).toFixed(decimal_rounding)),
      ordType: 'Limit',
      execInst: 'ParticipateDoNotInitiate',
      text: `order_${i + 1}`,
    });
  }
  // Add stop loss order
  if (stop > 0) {
    const __stop = createStopLoss(quantity, stop, symbol, side);
    totalOrders.stop = __stop;
  }
  // Price never goes above "Range end"
  if (totalOrders.orders[totalOrders.orders.length - 1].price > end) {
    totalOrders.orders[totalOrders.orders.length - 1].price = end;
  }

  const total_quantity = totalOrders.orders.reduce((total, order): number => total + order.orderQty, 0);

  // Quantity always stays the same
  if (total_quantity < quantity) {
    totalOrders.orders[totalOrders.orders.length - 1].orderQty =
      totalOrders.orders[totalOrders.orders.length - 1].orderQty + quantity - total_quantity;
  }
  return totalOrders;
};

const createStopLoss = (quantity: number, stop: number, symbol: SYMBOLS, side: SIDE, text_index = 1): StopLoss => {
  const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];
  const price = tickerRound(stop, symbol);

  return {
    symbol: symbol,
    side: side === SIDE.BUY ? SIDE.SELL : SIDE.BUY,
    orderQty: quantity,
    stopPx: parseFloat(price.toFixed(decimal_rounding)),
    ordType: 'Stop',
    execInst: 'LastPrice,ReduceOnly',
    text: `stop_${text_index}`,
  };
};

interface markets {
  symbol: SYMBOLS;
  quantity: any;
  side: SIDE;
}

export const createMarketOrder = ({symbol, quantity, side}: markets): MarketOrder => {
  return {
    symbol: symbol,
    orderQty: quantity,
    side: side,
    ordType: 'Market',
  };
};

// interface markets {
//   symbol: string;
//   quantity: any;
//   side: any;
// }
// type marketOrderType = (arg0: markets) => marketOrder;
// export const marketOrder: marketOrderType = ({ symbol, quantity, side }) => {
//   return {
//     symbol: symbol,
//     orderQty: quantity,
//     side: side,
//     ordType: "Market",
//   };
// };

export const createOrder = ({
  symbol,
  price,
  quantity,
  side,
  ordType,
  text_index = 0,
  text_prefix = 'order',
}: any): Order => {
  console.log('call order');
  return {
    symbol: symbol,
    price: price,
    orderQty: quantity,
    side: side,
    ordType: ordType,
    text: `${text_prefix}_${text_index}`,
    execInst: 'ParticipateDoNotInitiate',
  };
};

export const amendOrder = ({orderID, price}: any) => {
  return {
    orderID,
    price,
  };
};

const tickerRound = (number: number, symbol: SYMBOLS): number => {
  // Ticksize - 1 divided by this number
  const {ticksize} = INSTRUMENT_PARAMS[symbol];
  return Math.round(number * ticksize) / ticksize;
};

export interface ScaledOrdersProps extends DistributionProps {
  distribution: DISTRIBUTIONS;
  stop: Partial<StopLoss>;
}

interface DistributionProps {
  quantity: number;
  n_tp: number;
  start: number;
  end: number;
  stop: any;
  side: SIDE;
  symbol: SYMBOLS;
}

interface StopProps {
  quantity: number;
  stop: number;
  symbol: string;
  side: SIDE;
}

// type ordersProps = { orders: object[]; stop: object };
//===
type MarketOrder = Pick<orderType, 'symbol' | 'orderQty' | 'side' | 'ordType'>;

export type Order = Pick<orderType, 'symbol' | 'price' | 'orderQty' | 'side' | 'ordType' | 'text' | 'execInst'>;
type StopLoss = Pick<
  orderType,
  'symbol' | 'side' | 'orderQty' | 'stopPx' | 'ordType' | 'execInst' | 'text'
  // | "price"
>;
export interface ScaledOrders {
  orders: Order[];
  stop: Partial<StopLoss>;
}
