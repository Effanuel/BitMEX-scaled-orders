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
  symbol // : XBTUSD, ETHUSD...
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

  const decimal_rounding: any = {
    XBTUSD: 3,
    ETHUSD: 3,
    XRPUSD: 4
  };
  //Determening spread of the ticker (currently only XBTUSD and ETHUSD)
  //Appropriate rounding, else the order is going to get rejected
  const start_ = roundHalf(start, symbol);
  const end_ = roundHalf(end, symbol);

  const arr = [];
  // Handling whether the distribution is skewed or not\
  // This part can be written simpler by substituting gaussian
  // middle parameter.
  if (!isUniform) {
    const incrementQty = (END_CFG - START_CFG) / (n_tp - 1);
    for (let i = 0; i < n_tp; i++) {
      arr.push(gaussian(mean, START_CFG + i * incrementQty, 1)); //mean == 0
    }
  } else {
    //If its uniform distribution,
    //fill array with a random number.
    arr.push(...Array(n_tp).fill(1));
  }

  const summ = arr.reduce((a: number, b: number) => a + b, 0);
  // How much to increment the price of every order
  const increment = roundHalf((end_ - start_) / (n_tp - 1), symbol);
  let orders: any = { orders: [], stop: {} };

  // Pushing orders to main array
  for (let i = 0; i < n_tp; i++) {
    //ROUND
    orders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: Math.floor((arr[i] / summ) * quantity),
      price: parseFloat(
        (start_ + i * increment).toFixed(decimal_rounding[symbol])
      ),
      ordType: "Limit",
      execInst: "ParticipateDoNotInitiate",
      text: `order_${i + 1}`
    });
  }
  // Add stop loss order
  if (stop && stop !== "") {
    const __stop = stopLoss(quantity, stop, symbol, side);
    orders.stop = __stop;
  }
  // Price never goes above "Range end"
  if (orders.orders[orders.orders.length - 1].price > end) {
    orders.orders[orders.orders.length - 1].price = end;
  }
  const total_quantity = orders.orders.reduce(
    (total: number, n: any): number => total + n.orderQty,
    0
  );
  // Quantity always stays the same
  if (total_quantity < quantity) {
    orders.orders[orders.orders.length - 1].orderQty =
      orders.orders[orders.orders.length - 1].orderQty +
      quantity -
      total_quantity;
  }
  return orders;
};

const stopLoss = (
  quantity: any,
  stop: any,
  symbol: any, // : XBTUSD, ETHUSD...
  side: any,
  text_index = 1
) => {
  const price = roundHalf(stop, symbol);
  const stop_side = side === "Buy" ? "Sell" : "Buy";
  return {
    symbol: symbol,
    side: stop_side,
    orderQty: quantity,
    stopPx: parseFloat(price.toFixed(3)),
    ordType: "Stop",
    execInst: "LastPrice,ReduceOnly",
    text: `stop_${text_index}`
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
  const increment: any = {
    XBTUSD: 2, // 0.5
    ETHUSD: 20, // 0.05
    XRPUSD: 10000 // 0.0001
  };
  const inc = increment[symbol];
  return Math.round(number * inc) / inc;
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
