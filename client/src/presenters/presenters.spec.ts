import buildTrailingLabel from './trailing-label-presenter';
import buildCrossLabel from './cross-label-presenter';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';

describe('Trailing Label presenter', () => {
  it('should match label when - not connected or current price is undefined', () => {
    const test1 = buildTrailingLabel(false, 300, '', '123123123', SYMBOL.XBTUSD);
    expect(test1.label).toEqual('Not subscribed to order');

    const test2 = buildTrailingLabel(true, undefined, '', '123123123', SYMBOL.XBTUSD);
    expect(test2.label).toEqual('Not subscribed to order');
  });

  it('should match label when - order is placed', () => {
    const test1 = buildTrailingLabel(true, 3333, '', 'Order placed.', SYMBOL.XBTUSD);
    expect(test1).toEqual({label: 'Order is already placed', disabled: true});
  });

  it('should match label when - connected but order is not placed', () => {
    const test1 = buildTrailingLabel(true, 3333, '', '123123635', SYMBOL.XBTUSD);
    expect(test1).toEqual({label: 'Submit order at 3,333.0', disabled: false});
  });
});

describe('Cross Label presenter', () => {
  const crossOrderPrice = 999;
  it('should match label when - not connected or current price is undefined', () => {
    const test1 = buildCrossLabel(false, SIDE.SELL, 300, 0, SYMBOL.XBTUSD);
    expect(test1.label).toEqual('Not subscribed to order');

    const test2 = buildCrossLabel(false, SIDE.SELL, undefined, 0, SYMBOL.XBTUSD);
    expect(test2.label).toEqual('Not subscribed to order');
  });

  it('should match label when - connected and order is created', () => {
    const test1 = buildCrossLabel(true, SIDE.SELL, 300, crossOrderPrice, SYMBOL.XBTUSD);
    expect(test1.label).toEqual('Cross order is already placed at 999.0');

    const test2 = buildCrossLabel(true, SIDE.SELL, 300, crossOrderPrice, SYMBOL.XBTUSD);
    expect(test2.label).toEqual('Cross order is already placed at 999.0');
  });

  it('should match label when - order is not placed', () => {
    const test1 = buildCrossLabel(true, SIDE.SELL, 300, 0, SYMBOL.XBTUSD);
    expect(test1.label).toEqual('Place a crossunder-market sell order');

    const test2 = buildCrossLabel(true, SIDE.BUY, 300, 0, SYMBOL.XBTUSD);
    expect(test2.label).toEqual('Place a crossover-market buy order');
  });
});
