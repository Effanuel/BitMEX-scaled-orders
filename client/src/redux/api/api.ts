import _ from 'lodash';
import {Api as BitmexAPI} from './bitmex';
import {createProfitTarget, MarketOrderProps, ProfitTarget, ProfitTargetProps, RegularOrder, StopLoss} from 'utils';
import {EXEC_INST, Order, ORD_TYPE} from './bitmex/types';

export type LimitOrder = Pick<Order, 'symbol' | 'price' | 'orderQty' | 'side' | 'text'>;
export type OrderAmend = Pick<Order, 'orderID' | 'price'>;
export type OrderCancel = {orderID: string[] | string};
export type OrderBulk = RegularOrder | StopLoss | ProfitTarget;

export type APIType = ClassMethods<typeof API>;

type Exchange = 'bitmex';

export class API implements APIType {
  constructor(private activeExchange: Exchange = 'bitmex', private bitmex = new BitmexAPI()) {}

  private availableMethods = {
    bitmex: {
      marketOrder: (props: MarketOrderProps) => this.bitmex.order.orderNew({...props, ordType: ORD_TYPE.Market}),
      limitOrder: (props: LimitOrder) =>
        this.bitmex.order.orderNew({...props, execInst: EXEC_INST.ParticipateDoNotInitiate, ordType: ORD_TYPE.Limit}),
      profitTargetOrder: (props: ProfitTargetProps) => {
        const profitTargetQuery = createProfitTarget(props);
        return this.bitmex.order.orderNew(profitTargetQuery);
      },
      orderAmend: (props: OrderAmend) => this.bitmex.order.orderAmend(props),
      orderCancel: (props: OrderCancel) => this.bitmex.order.orderCancel(props),
      // this.bitmex.execution.executionGetTradeHistory({count: 30, reverse: true, columns: 'text'}),
      orderCancelAll: () => this.bitmex.order.orderCancelAll({}),
      orderBulk: (orders: OrderBulk[]) => this.bitmex.order.orderNewBulk({orders}),
      getBalance: () => this.bitmex.user.userGetMargin(),
      getOpenOrders: () => this.bitmex.order.orderGetOrders({filter: '{"open": true}', reverse: true}),
    },
  };

  getQuery(method: string) {
    //@ts-ignore
    const query = this.availableMethods[this.activeExchange]?.[method];
    if (!query) throw new Error(`${method} for ${this.activeExchange} hasn't been implemented yet`);
    return query;
  }

  // TODO: This can later be replaced with a single method, limitation know is correct types
  marketOrder = (props: MarketOrderProps) => this.getQuery('marketOrder')(props);
  limitOrder = (props: LimitOrder) => this.getQuery('limitOrder')(props);
  profitTargetOrder = (props: ProfitTargetProps) => this.getQuery('profitTargetOrder')(props);
  orderAmend = (props: OrderAmend) => this.getQuery('orderAmend')(props);
  orderCancel = (props: OrderCancel) => this.getQuery('orderCancel')(props);
  orderCancelAll = () => this.getQuery('orderCancelAll')();
  orderBulk = (props: OrderBulk[]) => this.getQuery('orderBulk')(props);
  getBalance = () => this.getQuery('getBalance')();
  getOpenOrders = () => this.getQuery('getOpenOrders')();
}

export type MethodNames = KeysByType<API, Function>;
export type MethodProps = Parameters<ClassMethods<typeof API>[MethodNames]>[number];

export type MockedMethods = {
  [key in MethodNames]: Parameters<ClassMethods<typeof API>[key]>[number] extends never
    ? {result: any}
    : {result: any; props: Parameters<ClassMethods<typeof API>[key]>[number]};
};

export class MOCK extends API {
  constructor(private mockResponsesOverride: Partial<MockedMethods> = {}) {
    super();
    this.mockResponsesOverride = mockResponsesOverride;
  }

  getQuery(method: MethodNames) {
    return (props: MethodProps) => {
      if (Object.keys(this.mockResponsesOverride).includes(method)) {
        //@ts-ignore
        const {props: mockedProps, result} = this.mockResponsesOverride?.[method] ?? {};

        if (_.isEqual(props, mockedProps)) {
          return result;
        } else {
          console.error(
            `Expected props of method ${method}:\n${JSON.stringify(props)}\nMocked props:\n${JSON.stringify(
              mockedProps,
            )}`,
          );
        }
      } else {
        throw new Error(
          `No mocked response for method ${method} was found.\nMocked methods: ${Object.keys(
            this.mockResponsesOverride,
          )}`,
        );
      }
    };
  }
}
