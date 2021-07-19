import {Api as BitmexAPI} from './bitmex';
import {createProfitTarget, MarketOrderProps, ProfitTarget, ProfitTargetProps, RegularOrder, StopLoss} from 'utils';
import {EXEC_INST, Order, ORD_TYPE} from './bitmex/types';

export type LimitOrder = Pick<Order, 'symbol' | 'price' | 'orderQty' | 'side' | 'text'>;
export type OrderAmend = Pick<Order, 'orderID' | 'price'>;
export type OrderCancel = {orderID: string[] | string};
export type OrderBulk = RegularOrder | StopLoss | ProfitTarget;

export type APIType = ClassMethods<typeof API>;

type Exchange = 'bitmex';

export type AvailableMethods = API['availableMethods']['bitmex'];

type GetQuery = <K extends keyof AvailableMethods>(method: K) => AvailableMethods[K];

export class API implements APIType {
  constructor(private activeExchange: Exchange = 'bitmex', private bitmex = new BitmexAPI()) {}

  private availableMethods = {
    bitmex: {
      marketOrder: (props: MarketOrderProps) => this.bitmex.order.orderNew({...props, ordType: ORD_TYPE.Market}),
      limitOrder: (props: LimitOrder) =>
        this.bitmex.order.orderNew({...props, execInst: EXEC_INST.ParticipateDoNotInitiate, ordType: ORD_TYPE.Limit}),
      profitTargetOrder: (props: ProfitTargetProps) => this.bitmex.order.orderNew(createProfitTarget(props)),
      orderAmend: (props: OrderAmend) => this.bitmex.order.orderAmend(props),
      orderCancel: (props: OrderCancel) => this.bitmex.order.orderCancel(props),
      orderCancelAll: () => this.bitmex.order.orderCancelAll({}),
      orderBulk: (orders: OrderBulk[]) => this.bitmex.order.orderNewBulk({orders}),
      getBalance: () => this.bitmex.user.userGetMargin(),
      getOpenOrders: () => this.bitmex.order.orderGetOrders({filter: '{"open": true}', reverse: true}),
    },
  };

  getQuery: GetQuery = (method) => {
    const query = this.availableMethods[this.activeExchange]?.[method];
    if (!query) throw new Error(`${method} for ${this.activeExchange} hasn't been implemented yet`);
    return query;
  };
}

export type MethodNames = KeysByType<API, Function>;
export type MethodProps = Parameters<ClassMethods<typeof API>[MethodNames]>[number];

export type MockedMethods = {
  [key in keyof API['availableMethods']['bitmex']]: {props: any; result: any};
}[];
