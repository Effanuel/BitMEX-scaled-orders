import {store} from '../../store';
import mockOrders from './test-orders-data';
import {previewOrders} from 'redux/modules/preview';
import {DISTRIBUTIONS} from 'util/index';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';

const distributionParams = (stop = '8000'): any => {
  return {
    orderQty: 500,
    n_tp: 3,
    start: 7500,
    end: 7700,
    stop: stop,
    side: SIDE.SELL,
    symbol: SYMBOLS.XBTUSD,
  };
};

describe('Preview actions', () => {
  it('should generate orders on preview', () => {
    // Action tested: previewOrders
    const {orders_uniform, orders_normal, orders_positive, orders_negative} = mockOrders();

    expect(store.getState().preview.showPreview).toEqual(false);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTIONS.Uniform));
    expect(store.getState().preview.orders).toEqual(orders_uniform);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTIONS.Normal));
    expect(store.getState().preview.orders).toEqual(orders_normal);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTIONS.Positive));
    expect(store.getState().preview.orders).toEqual(orders_positive);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTIONS.Negative));
    expect(store.getState().preview.orders).toEqual(orders_negative);

    expect(store.getState().preview.showPreview).toEqual(true);
  });

  it('should generate orders without stop-loss', () => {
    const {orders_uniform} = mockOrders({});

    store.dispatch(previewOrders(distributionParams(''), DISTRIBUTIONS.Uniform));
    expect(store.getState().preview.orders).toEqual(orders_uniform);
  });

  it('should have a stop with specific parameters', () => {
    const {orders_negative} = mockOrders();

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTIONS.Negative));
    expect(store.getState().preview.orders).toEqual(orders_negative);

    expect(store.getState().preview.orders.stop.execInst).toEqual('LastPrice,ReduceOnly');
  });
});
