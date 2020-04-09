import { orderType } from "./BitMEX-types";

const INSTRUMENT_PARAMS: any = {
  XBTUSD: { decimal_rounding: 3, ticksize: 2 },
  ETHUSD: { decimal_rounding: 3, ticksize: 20 },
  XRPUSD: { decimal_rounding: 4, ticksize: 10000 },
};

/**
 * Setting one of the distributions
 */
export const orderBulk = ({
  quantity,
  n_tp,
  start,
  end,
  side,
  stop,
  distribution,
  symbol, // : XBTUSD, ETHUSD...
}: Props): ordersProps => {
  switch (distribution) {
    case "Positive":
      return Positive({ quantity, n_tp, start, end, side, symbol, stop });
    case "Negative":
      return Negative({ quantity, n_tp, start, end, side, symbol, stop });
    case "Normal":
      return Normal({ quantity, n_tp, start, end, side, symbol, stop });
    case "Uniform":
    default:
      return Uniform({ quantity, n_tp, start, end, side, symbol, stop });
  }
};

const Uniform = (Props: Props): ordersProps => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -1, 1, -1, true);
};
const Positive = (Props: Props): ordersProps => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -1, 1, -1);
};
const Negative = (Props: Props): ordersProps => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -1, 1, 1);
};
const Normal = (Props: Props): ordersProps => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -2, 2, 0);
};

/**
 * Order generation based on a distribution
 * @param {object} Props is the inputs of the user
 * @param {number} START_CFG is a parameter for gaussian()
 * @param {number} END_CFG is a parameter for gaussian()
 * @param {number} mean of placed orders (not average)
 * @param {boolean} isUniform indicates if its Uniform or not
 * @returns {object} Object of orders array and stop(if any)
 */
const skewedDistribution = (
  Props: Props,
  START_CFG: number,
  END_CFG: number,
  mean: number,
  isUniform: boolean = false
): ordersProps => {
  const { quantity, n_tp, start, end, side, symbol, stop } = Props;
  const { decimal_rounding } = INSTRUMENT_PARAMS[symbol];

  //Determening spread of the ticker
  //Appropriate rounding, else the order is going to get rejected
  const start_ = roundHalf(start, symbol);
  const end_ = roundHalf(end, symbol);

  const probability_distribution: number[] = [];
  // Handling whether the distribution is skewed or not\
  // This part can be written simpler by substituting gaussian
  // middle parameter.
  if (!isUniform) {
    const incrementQty = (END_CFG - START_CFG) / (n_tp - 1);
    for (let i = 0; i < n_tp; i++) {
      probability_distribution.push(
        gaussian(mean, START_CFG + i * incrementQty, 1)
      ); //mean == 0
    }
  } else {
    //If its uniform distribution,
    //fill array with a random number.
    probability_distribution.push(...Array(n_tp).fill(1));
  }

  const total_probability = probability_distribution.reduce(
    (total: number, number: number) => total + number,
    0
  );
  // How much to increment the price of every order
  const incrPrice = roundHalf((end_ - start_) / (n_tp - 1), symbol);

  let totalOrders: totalOrdersType = { orders: [], stop: {} };

  // Pushing orders to main array
  for (let i = 0; i < n_tp; i++) {
    //ROUND
    totalOrders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: Math.floor(
        (probability_distribution[i] / total_probability) * quantity
      ),
      price: parseFloat((start_ + i * incrPrice).toFixed(decimal_rounding)),
      ordType: "Limit",
      execInst: "ParticipateDoNotInitiate",
      text: `order_${i + 1}`,
    });
  }
  // Add stop loss order
  if (stop && stop !== "") {
    const __stop = stopLoss(quantity, stop, symbol, side);
    totalOrders.stop = __stop;
  }
  // Price never goes above "Range end"
  if (totalOrders.orders[totalOrders.orders.length - 1].price > end) {
    totalOrders.orders[totalOrders.orders.length - 1].price = end;
  }
  const total_quantity = totalOrders.orders.reduce(
    (total: number, order: order): number => total + order.orderQty,
    0
  );
  // Quantity always stays the same
  if (total_quantity < quantity) {
    totalOrders.orders[totalOrders.orders.length - 1].orderQty =
      totalOrders.orders[totalOrders.orders.length - 1].orderQty +
      quantity -
      total_quantity;
  }
  return totalOrders;
};

const stopLoss = (
  quantity: any,
  stop: any,
  symbol: any, // : XBTUSD, ETHUSD...
  side: any,
  text_index = 1
): stopLoss => {
  const { decimal_rounding } = INSTRUMENT_PARAMS[symbol];
  const price = roundHalf(stop, symbol);
  const stop_side = side === "Buy" ? "Sell" : "Buy";

  return {
    symbol: symbol,
    side: stop_side,
    orderQty: quantity,
    stopPx: parseFloat(price.toFixed(decimal_rounding)),
    ordType: "Stop",
    execInst: "LastPrice,ReduceOnly",
    text: `stop_${text_index}`,
  };
};

interface markets {
  symbol: string;
  quantity: any;
  side: any;
}
export const marketOrder = ({
  symbol,
  quantity,
  side,
}: markets): marketOrder => {
  return {
    symbol: symbol,
    orderQty: quantity,
    side: side,
    ordType: "Market",
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

export const order = ({
  symbol,
  price,
  quantity,
  side,
  ordType,
  text_index = 0,
  text_prefix = "order",
}: any): order => {
  console.log("call order");
  return {
    symbol: symbol,
    price: price,
    orderQty: quantity,
    side: side,
    ordType: ordType,
    text: `${text_prefix}_${text_index}`,
    execInst: "ParticipateDoNotInitiate",
  };
};

// ------ UTILS ------
/**
 * Round a number by inc
 * @param {number} number
 * @param {number} inc
 * @returns {number} rounded number
 */
const roundHalf = (number: number, symbol: string): number => {
  // Ticksize - 1 divided by this number
  const { ticksize } = INSTRUMENT_PARAMS[symbol];
  return Math.round(number * ticksize) / ticksize;
};

/**
 * Probability density function
 * @param {number} mean of the distribution
 * @param {number} x is a point in that distribution
 * @param {number} delta is a variance parameter
 * @returns {number} location probability of that x
 */
const gaussian = (mean: number, x: number, delta: number): number => {
  const member1 = 1 / (delta * Math.sqrt(2 * Math.PI));
  const member2 = Math.pow(Math.E, -((x - mean) ** 2) / (2 * delta ** 2));
  return member1 * member2; // this number can be normalized (ex. dividing by 100)
};

interface Props {
  quantity: number;
  n_tp: number;
  start: number;
  end: number;
  stop: any;
  side: string;
  symbol: string;
  distribution?: string | number;
}

interface StopProps {
  quantity: number;
  stop: number;
  symbol: string;
  side: string;
}

type ordersProps = { orders: object[]; stop: object };
//===
type marketOrder = Pick<orderType, "symbol" | "orderQty" | "side" | "ordType">;
type order = Pick<
  orderType,
  "symbol" | "price" | "orderQty" | "side" | "ordType" | "text" | "execInst"
>;
type stopLoss = Pick<
  orderType,
  "symbol" | "side" | "orderQty" | "stopPx" | "ordType" | "execInst" | "text"
>;
interface totalOrdersType {
  orders: order[];
  stop: Partial<stopLoss>;
}
//===
export const BitMEX_ws_send = () => {
  return;
};
