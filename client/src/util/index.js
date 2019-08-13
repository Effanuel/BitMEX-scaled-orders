const startEndPutOrders = (obj, start, end, amount, side) => {
  obj.push({
    symbol: "XBTUSD",
    side: side,
    orderQty: amount,
    price: start,
    ordType: "Limit",
    execInst: "ParticipateDoNotInitiate",
    text: "order"
  });
  obj.push({
    symbol: "XBTUSD",
    side: side,
    orderQty: amount,
    price: end,
    ordType: "Limit",
    execInst: "ParticipateDoNotInitiate",
    text: "order"
  });
};

const Uniform = (amount, n_tp, start, end, side) => {
  let orders = { orders: [] };
  const increment = Math.round((end - start) / (n_tp - 1));
  console.log(increment, "INCREMENTS");
  const q = Math.floor(amount / n_tp);
  startEndPutOrders(orders.orders, start, end, q, side);
  for (let i = 1; i < n_tp - 1; i++) {
    //ROUND TO NEAREST 0.5
    //i = 0 places at the start of the range
    orders.orders.push({
      symbol: "XBTUSD",
      side: side,
      orderQty: q,
      price: start + i * increment,
      ordType: "Limit",
      execInst: "ParticipateDoNotInitiate",
      text: "order"
    });
  }

  return orders;
};
const Positive = (amount, n_tp, start, end, side) => {
  let orders = { orders: [] };
  const increment = Math.round((end - start) / n_tp);

  return orders;
};
const Negative = (amount, n_tp, start, end, side) => {
  let orders = { orders: [] };
  const increment = Math.round((end - start) / n_tp);

  return orders;
};
const Normal = (amount, n_tp, start, end, side) => {
  let orders = { orders: [] };
  const increment = Math.round((end - start) / n_tp);
  startEndPutOrders(orders.orders, start, end, amount, side);
  return orders;
};

export const orderBulk = ({
  quantity,
  n_tp,
  start,
  end,
  side,
  distribution
}) => {
  switch (distribution) {
    case "Positive":
      return Positive(quantity, n_tp, start, end, side);
    case "Negative":
      return Negative(quantity, n_tp, start, end, side);
    case "Normal":
      return Normal(quantity, n_tp, start, end, side);
    case "Uniform":
    default:
      return Uniform(quantity, n_tp, start, end, side);
  }
};
