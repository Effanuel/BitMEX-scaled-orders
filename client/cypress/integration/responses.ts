import {EXCHANGES, ExchangeClasses} from '../exchangeMocks/index';

export const ResponseBuilder = (ExchangeClass: EXCHANGES) => {
  return new (class Extended extends ExchangeClasses[ExchangeClass] {
    getBalance(balance = 2000000) {
      return super.getBalance(balance);
    }
    bulkOrders() {
      return super.bulkOrders();
    }
  })();
};
