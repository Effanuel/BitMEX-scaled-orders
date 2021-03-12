import {Order} from 'redux/api/bitmex/types';
import {LimitOrder, MethodNames, MockedMethods, OrderAmend, OrderBulk, OrderCancel} from 'redux/api/api';
import {createProfitTarget, MarketOrderProps, ProfitTargetProps} from 'utils';

abstract class Builder {
  protected constructor(protected mockedMethods: Partial<MockedMethods> = {}) {}
}

export class ResponseBuilder extends Builder {
  constructor() {
    super();
  }

  private add(mockedMethod: Partial<MockedMethods>) {
    const methodName = Object.keys(mockedMethod)[0] as MethodNames;
    const {props, result} = mockedMethod[methodName] as any;
    Object.assign(this.mockedMethods, {
      [methodName]: {props, result: {data: {data: JSON.stringify(result), statusCode: 200}}},
    });
    return this;
  }

  marketOrder({symbol, side, orderQty}: MarketOrderProps) {
    return this.add({
      marketOrder: {
        props: {symbol, side, orderQty},
        result: {orderQty},
      },
    });
  }

  limitOrder(props: LimitOrder, orderID: string) {
    return this.add({
      limitOrder: {
        //@ts-ignore
        props: props,
        result: {...props, orderID},
      },
    });
  }

  orderAmend(props: OrderAmend) {
    return this.add({
      orderAmend: {
        props,
        result: props,
      },
    });
  }

  orderBulk(orders: OrderBulk[]) {
    return this.add({
      orderBulk: {
        props: orders,
        result: orders,
      },
    });
  }

  orderCancel(props: OrderCancel) {
    return this.add({
      orderCancel: {
        props,
        result: props,
      },
    });
  }

  orderCancelAll() {
    return this.add({
      orderCancelAll: {
        result: {},
      },
    });
  }

  getOpenOrders(orders: Order[]) {
    return this.add({
      getOpenOrders: {
        result: orders,
      },
    });
  }

  profitTargetOrder(props: ProfitTargetProps) {
    return this.add({
      profitTargetOrder: {
        props: props,
        result: {...createProfitTarget(props), timestamp: '0', orderID: '2323'},
      },
    });
  }

  build() {
    if (Object.keys(this.mockedMethods).length === 0) throw new Error(`No responses were added.`);
    return this.mockedMethods;
  }
}
