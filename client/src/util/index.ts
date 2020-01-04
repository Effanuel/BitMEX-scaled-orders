/**
 * Round a number by inc
 * @param {number} number
 * @param {number} inc
 * @returns {number} rounded number
 */
const roundHalf = (number: number, inc: number): number => {
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
  return member1 * member2;
};

/**
 * Order generation of Uniform dsitribution
 * @param {object} Props is the inputs of the user
 * @param {number} START_CFG is a parameter for gaussian()
 * @param {number} END_CFG is a parameter for gaussian()
 * @param {number} mean of placed orders (not average)
 * @returns {array} Array of objects of orders
 */
const Uniform = (Props: Props): { orders: object[] } => {
  const { quantity, n_tp, start, end, side, symbol } = Props;
  //Determening spread of the ticker (currently only XBTUSD and ETHUSD)
  let inc = Props.symbol === "XBTUSD" ? 2 : 20;
  //Appropriate rounding, else the order is going to get rejected
  const start_ = roundHalf(start, inc);
  const end_ = roundHalf(end, inc);

  const mean = Math.floor(quantity / n_tp);
  // How much to increment the price of every order
  const increment = roundHalf((end_ - start_) / (n_tp - 1), inc);
  let orders: { orders: object[] } = { orders: [] };
  // Pushing orders to main array
  for (let i = 0; i < n_tp; i++) {
    //ROUND
    orders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: mean,
      price: parseFloat((start_ + i * increment).toFixed(3)),
      ordType: "Limit",
      execInst: "ParticipateDoNotInitiate",
      text: "order"
    });
  }

  return orders;
};
const Positive = (Props: Props): { orders: object[] } => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -1, 1, -1);
};
const Negative = (Props: Props): { orders: object[] } => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -1, 1, 1);
};
const Normal = (Props: Props): { orders: object[] } => {
  //You can change these parameters if you want to test
  return skewedDistribution(Props, -2, 2, 0);
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
  distribution,
  symbol // : XBTUSD, ETHUSD...
}: Props): { orders: object[] } => {
  switch (distribution) {
    case "Positive":
      return Positive({ quantity, n_tp, start, end, side, symbol });
    case "Negative":
      return Negative({ quantity, n_tp, start, end, side, symbol });
    case "Normal":
      return Normal({ quantity, n_tp, start, end, side, symbol });
    case "Uniform":
    default:
      return Uniform({ quantity, n_tp, start, end, side, symbol });
  }
};

/**
 * Order generation based on a distribution
 * @param {object} Props is the inputs of the user
 * @param {number} START_CFG is a parameter for gaussian()
 * @param {number} END_CFG is a parameter for gaussian()
 * @param {number} mean of placed orders (not average)
 * @returns {array} Array of objects of orders
 */
const skewedDistribution = (
  Props: Props,
  START_CFG: number,
  END_CFG: number,
  mean: number
): { orders: object[] } => {
  const { quantity, n_tp, start, end, side, symbol } = Props;
  //Determening spread of the ticker (currently only XBTUSD and ETHUSD)
  let inc = symbol === "XBTUSD" ? 2 : 20;
  //Appropriate rounding, else the order is going to get rejected
  const start_ = roundHalf(start, inc);
  const end_ = roundHalf(end, inc);

  const incrementQty = (END_CFG - START_CFG) / (n_tp - 1);

  const arr = [];
  for (let i = 0; i < n_tp; i++) {
    arr.push(gaussian(mean, START_CFG + i * incrementQty, 1)); //mean == 0
  }
  const summ = arr.reduce((a: number, b: number) => a + b, 0);
  // How much to increment the price of every order
  const increment = roundHalf((end_ - start_) / (n_tp - 1), inc);
  let orders: { orders: object[] } = { orders: [] };
  // Pushing orders to main array
  for (let i = 0; i < n_tp; i++) {
    //ROUND
    orders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: Math.floor((arr[i] / summ) * quantity),
      price: parseFloat((start_ + i * increment).toFixed(3)),
      ordType: "Limit",
      execInst: "ParticipateDoNotInitiate",
      text: "order"
    });
  }

  return orders;
};

interface Props {
  quantity: number;
  n_tp: number;
  start: number;
  end: number;
  side: string;
  symbol: string;
  distribution?: string | number;
}
