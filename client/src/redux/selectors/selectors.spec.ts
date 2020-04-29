import {
  ordersRiskSelector,
  ordersRiskPercSelector,
  getBalance,
  ordersAveragePriceSelector,
  getShowPreview,
  getOrders,
  table_instrument,
  getWsSymbol,
  websocketCurrentPrice,
  balanceSelector,
} from "./index";

describe("Selectors", () => {
  const mockState: any = {
    websocket: {
      __keys: {},
      instrument: {
        0: {
          symbol: "XBTUSD",
          askPrice: 8000,
        },
        1: {
          symbol: "ETHUSD",
          askPrice: 111,
        },
        2: {
          symbol: "XRPUSD",
          askPrice: 0.2,
        },
      },
      trade: {},
      order: {},
      connected: false,
      loading: false,
      message: "Websocket is offline.",
      symbol: "XBTUSD",
    },
    preview: {
      orders: {
        orders: [
          { orderQty: 10000, price: 1000 },
          { orderQty: 10000, price: 2000 },
          { orderQty: 10000, price: 3000 },
          { orderQty: 10000, price: 4000 },
          { orderQty: 10000, price: 5000 },
          { orderQty: 10000, price: 6000 },
        ],
        stop: {
          symbol: "XBTUSD",
          stopPx: 10000,
          orderQty: 60_000,
        },
      },
      balance: 12_345_678_993_321,
      showPreview: true,
    },
  };

  let result;
  describe("websocketCurrentPrice", () => {
    it("gets askPrice of current symbol", () => {
      const wsSymbol = getWsSymbol(mockState);
      const instrumentData = table_instrument(mockState);

      result = websocketCurrentPrice.resultFunc(instrumentData, wsSymbol);
      expect(result).toEqual(8000);
    });

    it("returns 'Loading' if no data for symbol was found", () => {
      const instrumentData = table_instrument(mockState);

      result = websocketCurrentPrice.resultFunc(instrumentData, "HELLO");
      expect(result).toEqual("Loading...");
    });
  });

  describe("balanceSelector", () => {
    it("divides and rounds the balance to 4th digit", () => {
      const balance = getBalance(mockState);
      result = balanceSelector.resultFunc(balance);
      expect(result).toEqual(123456.7899);
    });
  });

  describe("ordersRiskSelector", () => {
    it("calculates risk based on average entry for XBTUSD", () => {
      const showPreview = getShowPreview(mockState);
      let orders = getOrders(mockState);
      orders.stop["symbol"] = "XBTUSD";

      const averageEntry = ordersAveragePriceSelector.resultFunc(
        orders,
        showPreview
      );

      result = ordersRiskSelector.resultFunc(orders, averageEntry, showPreview);
      expect(result).toEqual(18.5);
    });
    it("calculates risk based on average entry for ETHUSD", () => {
      const showPreview = getShowPreview(mockState);
      let orders = getOrders(mockState);
      orders.stop["symbol"] = "ETHUSD";

      const averageEntry = ordersAveragePriceSelector.resultFunc(
        orders,
        showPreview
      );

      result = ordersRiskSelector.resultFunc(orders, averageEntry, showPreview);
      expect(result).toEqual(110.95377);
    });

    it("calculates risk based on average entry for XRPUSD", () => {
      const showPreview = getShowPreview(mockState);
      let orders = getOrders(mockState);
      orders.stop["symbol"] = "XRPUSD";

      const averageEntry = ordersAveragePriceSelector.resultFunc(
        orders,
        showPreview
      );

      result = ordersRiskSelector.resultFunc(orders, averageEntry, showPreview);
      expect(result).toEqual(22190.7539);
    });
  });

  describe("ordersRiskPercSelector", () => {
    it("calculates risk percentage based on risk amount and balance", () => {
      const balance = getBalance(mockState);

      result = ordersRiskPercSelector.resultFunc(balance, 12_345_678_993_321);
      expect(result).toEqual(100);
      result = ordersRiskPercSelector.resultFunc(balance, 12_345_678_990_000);
      expect(result).toEqual(100);
      result = ordersRiskPercSelector.resultFunc(balance, 2_211_000_993_321);
      expect(result).toEqual(17.91);
    });

    it("returns 0 if balance is 0", () => {
      const balance = 0;
      result = ordersRiskPercSelector.resultFunc(balance, 12_345_678_993_321);
      expect(result).toEqual(0);
    });
  });

  describe("ordersAveragePriceSelectore", () => {
    it("returns average price the orders", () => {
      const orders = getOrders(mockState);
      const showPreview = getShowPreview(mockState);

      result = ordersAveragePriceSelector.resultFunc(orders, showPreview);
      expect(result).toEqual(2448.9796);
    });

    it("returns undefined if showPreview is false or orderList is undefined", () => {
      const orders = getOrders(mockState);

      result = ordersAveragePriceSelector.resultFunc(orders, false);
      expect(result).toEqual(undefined);

      result = ordersAveragePriceSelector.resultFunc({}, true);
      expect(result).toEqual(undefined);
    });
  });
});
