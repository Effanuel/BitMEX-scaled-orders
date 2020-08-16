import {defaultState as websocketDefaultState} from 'redux/modules/websocket';
import {defaultState as previewDefaultState} from 'redux/modules/preview';
import {defaultState as trailingDefaultState} from 'redux/modules/trailing';
import {WebsocketState, Instrument} from 'redux/modules/websocket/types';
import {PreviewState} from 'redux/modules/preview/types';
import {TrailingState} from 'redux/modules/trailing/types';
import {orderType, SYMBOLS, SIDE, ORD_TYPE} from 'util/BitMEX-types';
import {ScaledOrders} from 'util/index';

type Order = Pick<orderType, 'symbol' | 'price' | 'orderQty' | 'side' | 'ordType' | 'text'>;

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
  {symbol: 'XBTUSD', askPrice: 8000, bidPrice: 8001},
  {symbol: 'ETHUSD', askPrice: 111, bidPrice: 8001},
  {symbol: 'XRPUSD', askPrice: 0.2, bidPrice: 8001},
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

export const mockWebsocketState = (overrides?: Partial<WebsocketState>) => ({...websocketDefaultState, ...overrides});
export const mockPreviewState = (overrides?: Partial<PreviewState>) => ({...previewDefaultState, ...overrides});
export const mockTrailingState = (overrides?: Partial<TrailingState>) => ({...trailingDefaultState, ...overrides});
