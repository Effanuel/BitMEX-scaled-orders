import {Chance} from 'chance';
import _ from 'lodash/fp';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {createScaledOrders, DISTRIBUTION} from 'utils';

const chance = new Chance();

describe('createScaledOrders()', () => {
  describe('XBTUSD', () => {
    const createOrdersProps = (params: {side: SIDE; symbol: SYMBOL}) => {
      const randomInteger = chance.integer({min: 1000, max: 20e5});
      const quantity = randomInteger - (randomInteger % 100);

      const n_tp = chance.integer({min: 2, max: 10});
      const orderQty = Math.round(quantity - ((quantity / n_tp) % 100) * n_tp);
      const start = chance.integer({min: 1000, max: 10e6});
      const end = start + chance.integer({min: 0, max: 10e6});

      const stop = chance.integer({min: 1000, max: 10e6});

      return {orderQty, n_tp, start, end, stop, side: params.side, symbol: params.symbol};
    };

    it.each([SIDE.SELL, SIDE.BUY])('should create orders with the same quantity for %s side, XBTUSD', (side) => {
      const testCases = [...Array(100).keys()].map(() => createOrdersProps({side, symbol: SYMBOL.XBTUSD}));

      testCases.forEach((testCase) => {
        const orders = createScaledOrders({ordersProps: testCase, distribution: DISTRIBUTION.Uniform});
        const sumResult = _.sum(orders.map((order) => order.orderQty)) - testCase.orderQty;
        expect(sumResult).toEqual(testCase.orderQty);
        expect(orders[orders.length - 1].orderQty).toEqual(testCase.orderQty);
      });
    });
  });

  describe('ETHUSD, XRPUSD', () => {
    const createOrdersProps = (params: {side: SIDE; symbol: SYMBOL}) => {
      const n_tp = chance.integer({min: 2, max: 20});
      const orderQty = chance.integer({min: 1000, max: 20e5});
      const start = chance.integer({min: 1000, max: 10e6});
      const end = start + chance.integer({min: -1000, max: 10e6});
      const stop = chance.integer({min: 1000, max: 10e6});

      return {orderQty, n_tp, start, end, stop, side: params.side, symbol: params.symbol};
    };

    it.each([
      [SIDE.SELL, SYMBOL.ETHUSD],
      [SIDE.SELL, SYMBOL.XRPUSD],
      [SIDE.BUY, SYMBOL.ETHUSD],
      [SIDE.BUY, SYMBOL.XRPUSD],
    ])('should create orders with the same quantity for %s side, %s', (side, symbol) => {
      const testCases = [...Array(100).keys()].map(() => createOrdersProps({side, symbol}));

      testCases.forEach((testCase) => {
        const orders = createScaledOrders({ordersProps: testCase, distribution: DISTRIBUTION.Uniform});
        const sumResult = _.sum(orders.map((order) => order.orderQty)) - testCase.orderQty;
        expect(sumResult).toEqual(testCase.orderQty);
        expect(orders[orders.length - 1].orderQty).toEqual(testCase.orderQty);
      });
    });
  });
});
