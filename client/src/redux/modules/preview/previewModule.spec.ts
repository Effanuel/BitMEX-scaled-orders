import {createStore} from '../../store';
import {previewOrders} from 'redux/modules/preview/previewModule';
import {DISTRIBUTION} from 'utils';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import mockDistributionOrders from 'tests/mockData/orders';

describe('Preview actions', () => {
  const distributionParams = (stop = 8000) => {
    return {orderQty: 500, n_tp: 3, start: 7500, end: 7700, stop: stop, side: SIDE.SELL, symbol: SYMBOL.ETHUSD};
  };

  const store = createStore();

  it('should generate orders on preview', () => {
    const {orders_uniform, orders_normal, orders_positive, orders_negative} = mockDistributionOrders();

    expect(store.getState().preview.showPreview).toEqual(false);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTION.Uniform));
    expect(store.getState().preview.orders).toEqual(orders_uniform);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTION.Normal));
    expect(store.getState().preview.orders).toEqual(orders_normal);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTION.Positive));
    expect(store.getState().preview.orders).toEqual(orders_positive);

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTION.Negative));
    expect(store.getState().preview.orders).toEqual(orders_negative);

    expect(store.getState().preview.showPreview).toEqual(true);
  });

  it('should generate orders without stop-loss', () => {
    const {orders_uniform} = mockDistributionOrders(null);

    store.dispatch(previewOrders(distributionParams(0), DISTRIBUTION.Uniform));
    expect(store.getState().preview.orders).toEqual(orders_uniform);
  });

  it('should have a stop with specific parameters', () => {
    const {orders_negative} = mockDistributionOrders();

    store.dispatch(previewOrders(distributionParams(), DISTRIBUTION.Negative));
    expect(store.getState().preview.orders).toEqual(orders_negative);

    //@ts-ignore
    expect(store.getState().preview.orders[3].execInst).toEqual('LastPrice,ReduceOnly');
  });
});
