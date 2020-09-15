import {defaultState as websocketDefaultState} from 'redux/modules/websocket/websocketModule';
import {defaultState as previewDefaultState} from 'redux/modules/preview/previewModule';
import {defaultState as trailingDefaultState} from 'redux/modules/trailing/trailingModule';
import {defaultState as crossDefaultState} from 'redux/modules/cross/crossModule';
import {WebsocketState, Instrument} from 'redux/modules/websocket/types';
import {PreviewState} from 'redux/modules/preview/types';
import {TrailingState} from 'redux/modules/trailing/types';
import {SYMBOLS, SIDE, ORD_TYPE} from 'util/BitMEX-types';
import {Order, ScaledOrders} from 'util/index';
import {CrossState} from 'redux/modules/cross/types';

export const mockWebsocketState = (overrides?: Partial<WebsocketState>) => ({...websocketDefaultState, ...overrides});
export const mockPreviewState = (overrides?: Partial<PreviewState>) => ({...previewDefaultState, ...overrides});
export const mockTrailingState = (overrides?: Partial<TrailingState>) => ({...trailingDefaultState, ...overrides});
export const mockCrossState = (overrides?: Partial<CrossState>) => ({...crossDefaultState, ...overrides});

export const mockCreateOrder = (overrides?: Partial<Order>): Order => ({
  symbol: SYMBOLS.XBTUSD,
  price: 8000,
  orderQty: 500,
  side: SIDE.SELL,
  ordType: ORD_TYPE.Limit,
  text: 'text',
  ...overrides,
});

export const mockInstrumentData: Partial<Instrument>[] = [
  {symbol: 'XBTUSD', askPrice: 8011, bidPrice: 8001},
  {symbol: 'ETHUSD', askPrice: 222, bidPrice: 111.15},
  {symbol: 'XRPUSD', askPrice: 0.2371, bidPrice: 0.1988},
];

export const mockScaledOrders: ScaledOrders = {
  orders: [
    mockCreateOrder({orderQty: 10000, price: 1000}),
    mockCreateOrder({orderQty: 10000, price: 2000}),
    mockCreateOrder({orderQty: 10000, price: 3000}),
    mockCreateOrder({orderQty: 10000, price: 4000}),
    mockCreateOrder({orderQty: 10000, price: 5000}),
    mockCreateOrder({orderQty: 10000, price: 6000}),
  ],
  stop: {symbol: SYMBOLS.XBTUSD, stopPx: 10000, orderQty: 60_000},
};

const orderStop = {
  execInst: 'LastPrice,ReduceOnly',
  ordType: 'Stop',
  orderQty: 500,
  side: 'Buy',
  stopPx: 8000,
  symbol: 'XBTUSD',
  text: 'stop',
};

export default function mockDistributionOrders(stop: any = orderStop) {
  const orderData = (uniqueFields: Partial<Order> = {}) => {
    const execInst = 'ParticipateDoNotInitiate';
    const commonFields = {execInst, ordType: ORD_TYPE.Limit, side: SIDE.SELL, symbol: SYMBOLS.XBTUSD};
    return mockCreateOrder({...commonFields, ...uniqueFields});
  };

  return {
    orders_uniform: {
      orders: [
        orderData({orderQty: 166, price: 7500, text: 'order_1'}),
        orderData({orderQty: 166, price: 7600, text: 'order_2'}),
        orderData({orderQty: 168, price: 7700, text: 'order_3'}),
      ],
      stop,
    },
    orders_normal: {
      orders: [
        orderData({orderQty: 53, price: 7500, text: 'order_1'}),
        orderData({orderQty: 393, price: 7600, text: 'order_2'}),
        orderData({orderQty: 54, price: 7700, text: 'order_3'}),
      ],
      stop,
    },
    orders_positive: {
      orders: [
        orderData({orderQty: 287, price: 7500, text: 'order_1'}),
        orderData({orderQty: 174, price: 7600, text: 'order_2'}),
        orderData({orderQty: 39, price: 7700, text: 'order_3'}),
      ],
      stop,
    },
    orders_negative: {
      orders: [
        orderData({orderQty: 38, price: 7500, text: 'order_1'}),
        orderData({orderQty: 174, price: 7600, text: 'order_2'}),
        orderData({orderQty: 288, price: 7700, text: 'order_3'}),
      ],
      stop,
    },
  };
}
