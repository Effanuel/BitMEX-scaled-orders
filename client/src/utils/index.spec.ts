import {Chance} from 'chance';
import _ from 'lodash/fp';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {createScaledOrders, DISTRIBUTION, RegularOrder, StopLoss} from 'utils';

function generateAllPossibleCombinations(variants: [SIDE[], SYMBOL[], DISTRIBUTION[]]): [SIDE, SYMBOL, DISTRIBUTION][] {
  // TODO: use recursion instead
  const result: [SIDE, SYMBOL, DISTRIBUTION][] = [];

  const variant1 = variants[0];
  const variant2 = variants[1];
  const variant3 = variants[2];

  for (let i = 0; i < variant1.length; i++) {
    const b = variant1[i];
    const bb: [SIDE, SYMBOL][] = variant2.map((item) => [b, item]);
    const bbb: any = variant3.flatMap((item) => bb.map((b) => [...b, item]));
    result.push(...bbb);
  }

  return result;
}

const chance = new Chance();

describe('createScaledOrders()', () => {
  describe('XBTUSD', () => {
    const createOrdersProps = (params: {side: SIDE; symbol: SYMBOL}) => {
      const randomInteger = chance.integer({min: 1000, max: 20e5});
      const quantity = randomInteger - (randomInteger % 100);

      const n_tp = chance.integer({min: 2, max: 3});
      const orderQty = Math.round(quantity - ((quantity / n_tp) % 100) * n_tp);
      const start = chance.integer({min: 1000, max: 10e6});
      const end = start + chance.integer({min: 0, max: 10e6});

      const stop = chance.integer({min: 1000, max: 10e6});

      return {orderQty, n_tp, start, end, stop, side: params.side, symbol: params.symbol};
    };

    const testCases = generateAllPossibleCombinations([
      [SIDE.SELL, SIDE.BUY],
      [SYMBOL.XBTUSD],
      [DISTRIBUTION.Uniform, DISTRIBUTION.Negative, DISTRIBUTION.Positive, DISTRIBUTION.Normal],
    ]);

    it.each(testCases)(
      'should create orders with the same quantity for %s side, %s, %s distribution',
      (side, symbol, distribution) => {
        const testCases = [...Array(100).keys()].map(() => createOrdersProps({side, symbol}));

        testCases.forEach((testCase) => {
          const orders = createScaledOrders({ordersProps: testCase, distribution});
          const order = orders[orders.length - 2] as RegularOrder;
          const stopOrder = orders[orders.length - 1] as StopLoss;
          const sumResult = _.sum(orders.map((order) => order.orderQty)) - stopOrder.orderQty;

          expect(sumResult).toEqual(testCase.orderQty);
          expect(stopOrder.orderQty).toEqual(testCase.orderQty);
          expect(order.price).toEqual(testCase.end);
        });
      },
    );
  });

  describe('ETHUSD, XRPUSD', () => {
    const createOrdersProps = (params: {side: SIDE; symbol: SYMBOL}) => {
      const n_tp = chance.integer({min: 2, max: 20});
      const orderQty = chance.integer({min: 1000, max: 20e5});
      const start = chance.integer({min: 10, max: 10e6});
      const end = start + chance.integer({min: -1000, max: 10e6});
      const stop = chance.integer({min: 1000, max: 10e6});

      return {orderQty, n_tp, start, end, stop, side: params.side, symbol: params.symbol};
    };

    const testCases = generateAllPossibleCombinations([
      [SIDE.SELL, SIDE.BUY],
      [SYMBOL.XRPUSD, SYMBOL.ETHUSD],
      [DISTRIBUTION.Uniform, DISTRIBUTION.Negative, DISTRIBUTION.Positive, DISTRIBUTION.Normal],
    ]);

    it.each(testCases)(
      'should create orders with the same quantity for %s side, %s, %s distribution',
      (side, symbol, distribution) => {
        const testCases = [...Array(100).keys()].map(() => createOrdersProps({side, symbol}));

        testCases.forEach((testCase) => {
          const orders = createScaledOrders({ordersProps: testCase, distribution});
          const sumResult = _.sum(orders.map((order) => order.orderQty)) - testCase.orderQty;
          const order = orders[orders.length - 2] as RegularOrder;
          const stopOrder = orders[orders.length - 1] as StopLoss;

          expect(sumResult).toEqual(testCase.orderQty);
          expect(stopOrder.orderQty).toEqual(testCase.orderQty);
          expect(order.price).toEqual(testCase.end);
        });
      },
    );
  });
});
