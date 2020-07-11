import {
  ordersRiskSelector,
  ordersRiskPercSelector,
  getBalance,
  ordersAverageEntrySelector,
  getShowPreview,
  getOrders,
  table_instrument,
  getWsSymbol,
  websocketBidAskPrices,
  websocketCurrentPrice,
  balanceSelector,
} from './index';
import {ScaledOrders} from '../../util';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';

describe('Selectors', () => {
  const mockState: any = {
    websocket: {
      __keys: {},
      instrument: {
        0: {
          symbol: 'XBTUSD',
          askPrice: 8000,
          bidPrice: 8001,
        },
        1: {
          symbol: 'ETHUSD',
          askPrice: 111,
          bidPrice: 8001,
        },
        2: {
          symbol: 'XRPUSD',
          askPrice: 0.2,
          bidPrice: 8001,
        },
      },
      trade: {},
      order: {},
      connected: false,
      loading: false,
      message: 'Websocket is offline.',
      symbol: 'XBTUSD',
    },
    preview: {
      orders: {
        orders: [
          {orderQty: 10000, price: 1000},
          {orderQty: 10000, price: 2000},
          {orderQty: 10000, price: 3000},
          {orderQty: 10000, price: 4000},
          {orderQty: 10000, price: 5000},
          {orderQty: 10000, price: 6000},
        ],
        stop: {
          symbol: 'XBTUSD',
          stopPx: 10000,
          orderQty: 60_000,
        },
      },
      balance: 12_345_678_993_321,
      showPreview: true,
    },
    best_price: {
      side: SIDE.SELL,
    },
  };
  let result;
  describe('websocketBidAskPrices', () => {
    it('should return askPrice of current symbol', () => {
      const instrument = table_instrument(mockState);
      const wsSymbol = getWsSymbol(mockState);
      const result = websocketBidAskPrices.resultFunc(instrument, wsSymbol);
      expect(result!.askPrice).toEqual(8000);
      expect(result!.bidPrice).toEqual(8001);
    });

    it('returns undefined if no data for symbol was found', () => {
      const payload = {
        ...mockState,
        websocket: {...mockState.websocket, symbol: 'HELLO'},
      };
      const instrument = table_instrument(payload);
      const wsSymbol = getWsSymbol(payload);
      const result = websocketBidAskPrices.resultFunc(instrument, wsSymbol);
      expect(result).toEqual(undefined);
    });
  });

  describe('wsCurrentPrice', () => {
    const mockBidPrices = {
      askPrice: 1234,
      bidPrice: 4567,
    };

    it('should return `askPrice` if side is `Sell`', () => {
      const price = websocketCurrentPrice.resultFunc(mockBidPrices, SIDE.SELL);
      expect(price!).toEqual(mockBidPrices.askPrice);
    });

    it('should return `bidPrice` if side is `Buy`', () => {
      const price = websocketCurrentPrice.resultFunc(mockBidPrices, SIDE.BUY);
      expect(price!).toEqual(mockBidPrices.bidPrice);
    });
  });

  describe('balanceSelector', () => {
    it('divides and rounds the balance to 4th digit', () => {
      const balance = getBalance(mockState);
      const result = balanceSelector.resultFunc(balance);
      expect(result).toEqual(123456.7899);
    });
  });

  describe('ordersRiskSelector', () => {
    it('calculates risk based on average entry for XBTUSD', () => {
      const showPreview = getShowPreview(mockState);
      const orders = getOrders(mockState);
      orders.stop['symbol'] = SYMBOLS.XBTUSD;

      const averageEntry = ordersAverageEntrySelector.resultFunc(orders, showPreview);

      result = ordersRiskSelector.resultFunc(orders, averageEntry, showPreview);
      expect(result).toEqual(18.5);
    });

    it('calculates risk based on average entry for ETHUSD', () => {
      const showPreview = getShowPreview(mockState);
      const orders = getOrders(mockState);
      orders.stop['symbol'] = SYMBOLS.ETHUSD;

      const averageEntry = ordersAverageEntrySelector.resultFunc(orders, showPreview);

      result = ordersRiskSelector.resultFunc(orders, averageEntry, showPreview);
      expect(result).toEqual(110.95377);
    });

    it('calculates risk based on average entry for XRPUSD', () => {
      const showPreview = getShowPreview(mockState);
      const orders = getOrders(mockState);
      orders.stop['symbol'] = SYMBOLS.XRPUSD;

      const averageEntry = ordersAverageEntrySelector.resultFunc(orders, showPreview);

      result = ordersRiskSelector.resultFunc(orders, averageEntry, showPreview);
      expect(result).toEqual(22190.7539);
    });
  });

  describe('ordersRiskPercSelector', () => {
    it('calculates risk percentage based on risk amount and balance', () => {
      const balance = getBalance(mockState);

      result = ordersRiskPercSelector.resultFunc(balance, 12_345_678_993_321);
      expect(result).toEqual(100);
      result = ordersRiskPercSelector.resultFunc(balance, 12_345_678_990_000);
      expect(result).toEqual(100);
      result = ordersRiskPercSelector.resultFunc(balance, 2_211_000_993_321);
      expect(result).toEqual(17.91);
    });

    it('returns 0 if balance is 0', () => {
      const balance = 0;
      result = ordersRiskPercSelector.resultFunc(balance, 12_345_678_993_321);
      expect(result).toEqual(0);
    });
  });

  describe('ordersAveragePriceSelectore', () => {
    it('returns average price of the orders', () => {
      const orders = getOrders(mockState);
      const showPreview = getShowPreview(mockState);

      result = ordersAverageEntrySelector.resultFunc(orders, showPreview);
      expect(result).toEqual(2448.9796);
    });

    it('returns undefined if (showPreview is false) or (orderList is undefined)', () => {
      const orders = getOrders(mockState);

      result = ordersAverageEntrySelector.resultFunc(orders, false);
      expect(result).toEqual(undefined);

      result = ordersAverageEntrySelector.resultFunc({} as ScaledOrders, true);
      expect(result).toEqual(undefined);
    });
  });
});
