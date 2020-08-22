const orderStop = {
  execInst: 'LastPrice,ReduceOnly',
  ordType: 'Stop',
  orderQty: 500,
  side: 'Buy',
  stopPx: 8000,
  symbol: 'XBTUSD',
  text: 'stop',
};

const execInst = 'ParticipateDoNotInitiate';

export default function mockOrders(stop: any = orderStop) {
  return {
    orders_uniform: {
      orders: [
        {execInst, ordType: 'Limit', orderQty: 166, price: 7500, side: 'Sell', symbol: 'XBTUSD', text: 'order_1'},
        {execInst, ordType: 'Limit', orderQty: 166, price: 7600, side: 'Sell', symbol: 'XBTUSD', text: 'order_2'},
        {execInst, ordType: 'Limit', orderQty: 168, price: 7700, side: 'Sell', symbol: 'XBTUSD', text: 'order_3'},
      ],
      stop,
    },
    orders_normal: {
      orders: [
        {execInst, ordType: 'Limit', orderQty: 53, price: 7500, side: 'Sell', symbol: 'XBTUSD', text: 'order_1'},
        {execInst, ordType: 'Limit', orderQty: 393, price: 7600, side: 'Sell', symbol: 'XBTUSD', text: 'order_2'},
        {execInst, ordType: 'Limit', orderQty: 54, price: 7700, side: 'Sell', symbol: 'XBTUSD', text: 'order_3'},
      ],
      stop,
    },
    orders_positive: {
      orders: [
        {execInst, ordType: 'Limit', orderQty: 287, price: 7500, side: 'Sell', symbol: 'XBTUSD', text: 'order_1'},
        {execInst, ordType: 'Limit', orderQty: 174, price: 7600, side: 'Sell', symbol: 'XBTUSD', text: 'order_2'},
        {execInst, ordType: 'Limit', orderQty: 39, price: 7700, side: 'Sell', symbol: 'XBTUSD', text: 'order_3'},
      ],
      stop,
    },
    orders_negative: {
      orders: [
        {execInst, ordType: 'Limit', orderQty: 38, price: 7500, side: 'Sell', symbol: 'XBTUSD', text: 'order_1'},
        {execInst, ordType: 'Limit', orderQty: 174, price: 7600, side: 'Sell', symbol: 'XBTUSD', text: 'order_2'},
        {execInst, ordType: 'Limit', orderQty: 288, price: 7700, side: 'Sell', symbol: 'XBTUSD', text: 'order_3'},
      ],
      stop,
    },
  };
}
