import {SYMBOLS} from 'util/BitMEX-types';

interface PartialInstrument {
  symbol: SYMBOLS;
  price: number;
  orderID: string;
  ordStatus: 'New' | 'Filled';
}

export const partialOrder = ({price, symbol, orderID, ordStatus}: PartialInstrument) => ({
  table: 'order',
  action: 'partial',
  keys: ['orderID'],
  filter: {account: 223024},
  data: [{symbol, price, orderID, ordStatus, ...commonData}],
});

const commonData = {
  clOrdID: '',
  clOrdLinkID: '',
  account: 223024,
  side: 'Sell',
  simpleOrderQty: null,
  orderQty: 100,
  displayQty: null,
  stopPx: null,
  pegOffsetValue: null,
  pegPriceType: '',
  currency: 'USD',
  settlCurrency: 'XBt',
  ordType: 'Limit',
  timeInForce: 'GoodTillCancel',
  execInst: 'ParticipateDoNotInitiate',
  contingencyType: '',
  exDestination: 'XBME',

  triggered: '',
  workingIndicator: true,
  ordRejReason: '',
  simpleLeavesQty: null,
  leavesQty: 100,
  simpleCumQty: null,
  cumQty: 0,
  avgPx: null,
  multiLegReportingType: 'SingleSecurity',
  text: 'order_1',
  transactTime: '2020-07-12T20:39:38.902Z',
  timestamp: '2020-07-12T20:39:38.902Z',
};
