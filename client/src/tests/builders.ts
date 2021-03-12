import Chance from 'chance';
import {EXEC_INST, Order, ORD_TYPE, SIDE, SYMBOL} from 'redux/api/bitmex/types';

const chance = new Chance();

export function builderProfitOrder({orderID, profitOrderID}: {orderID: string; profitOrderID: string}): Order {
  return buildOrder({orderID: profitOrderID, text: `profit-target.${orderID}`});
}

export function buildOrder(overrides: Partial<Order> = {}): Order {
  return {
    orderID: chance.guid(),
    clOrdID: chance.guid(),
    account: chance.integer(),
    symbol: chance.pickone([SYMBOL.XBTUSD, SYMBOL.ETHUSD]),
    side: chance.pickone([SIDE.SELL, SIDE.BUY]),
    orderQty: chance.integer(),
    price: chance.integer(),
    displayQty: chance.integer(),
    stopPx: chance.integer(),
    pegOffsetValue: chance.integer(),
    pegPriceType: 'LastPeg',
    currency: 'USD',
    settlCurrency: 'USD',
    ordType: ORD_TYPE.Limit,
    timeInForce: 'GoodTillCancel',
    execInst: EXEC_INST.ParticipateDoNotInitiate,
    exDestination: '',
    ordStatus: 'New',
    triggered: '',
    workingIndicator: true,
    ordRejReason: '',
    simpleLeavesQty: chance.integer(),
    leavesQty: chance.integer(),
    simpleCumQty: chance.integer(),
    cumQty: 0,
    avgPx: 0,
    multiLegReportingType: '',
    text: '',
    transactTime: '',
    timestamp: '0',
    ...overrides,
  };
}
