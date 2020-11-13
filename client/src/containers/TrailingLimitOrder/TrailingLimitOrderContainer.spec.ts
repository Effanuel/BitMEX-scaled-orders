import TrailingLimitOrderContainer from './TrailingLimitOrderContainer';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import {mockWebsocketState} from 'tests/mockData/orders';
import {SYMBOLS} from 'util/BitMEX-types';
import {Instrument} from 'redux/modules/websocket/types';
import {partialInstrument} from 'tests/websocketData/instrument';
import {partialOrder} from 'tests/websocketData/order';
import {createEngine} from 'tests/fuel/app-driver';
import {toastSpyModule} from 'tests/spies';
import {ResponseBuilder} from 'tests/responses';
import {isDisabled, textOf} from 'tests/fuel/inspectors';
import {openWebsocket, sendWebsocketMessage} from 'tests/fuel/helpers';

const orderID = 'OrderId';

const mocks = new ResponseBuilder().postTrailingOrder(orderID, 10322).build();
const engine = createEngine(TrailingLimitOrderContainer, {}, mocks);

describe('TrailingLimitContainer', () => {
  it('should render submit button as disabled when not subscribed to ws', async () => {
    const result = await engine()
      .inspect({submitButtonLabel: textOf(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)})
      .inspect({isDisabled: isDisabled(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)})
      .halt();

    expect(result).toEqual({
      actions: [],
      submitButtonLabel: 'Not subscribed to order',
      isDisabled: true,
    });
  });

  it('should render submit button as disabled when inputs are empty', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});

    const result = await engine()
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inspect({submitButtonLabel: textOf(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)})
      .inspect({isDisabled: isDisabled(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)})
      .halt();

    expect(result).toEqual({
      actions: ['REDUX_WEBSOCKET::OPEN', 'REDUX_WEBSOCKET::MESSAGE'],
      isDisabled: true,
      submitButtonLabel: 'Place a trailing limit order at 10,322.00',
    });
  });

  it('should submit a trailing order without placing it', async () => {
    const websocket = mockWebsocketState({
      connected: true,
      instrument: [{symbol: SYMBOLS.XBTUSD, askPrice: 501, bidPrice: 500}] as Instrument[],
    });

    const result = await engine({store: {websocket}})
      .addFuel(toastSpyModule()) // spy on api is missing here
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, '200')
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .burnFuel()
      .halt();

    expect(result).toEqual({
      actions: [
        'trailing/POST_TRAILING_ORDER/pending',
        'trailing/POST_TRAILING_ORDER/fulfilled',
        'trailing/__CLEAR_TRAILING_ORDER',
      ],
      toast: [{message: 'Trailing Order placed at 10322', toastPreset: 'success'}],
    });
  });

  // @TODO: fix spy on api
  it('should place a trailing sell order', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});
    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, '200')
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .applyWithAct(
        sendWebsocketMessage(partialOrder({orderID, symbol: SYMBOLS.XBTUSD, price: 9000, ordStatus: 'New'})),
      )
      .burnFuel()
      .withStore('trailing')
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/pending',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/fulfilled',
      ],
      toast: [{message: 'Trailing Order placed at 10322', toastPreset: 'success'}],
      trailing: {
        trailLoading: false,
        trailOrderId: orderID,
        trailOrderPrice: 10322,
        trailOrderSide: 'Sell',
        trailOrderStatus: 'Order placed.',
        trailOrderSymbol: 'XBTUSD',
      },
    });

    // expect(sendRequestSpy).toHaveBeenCalledWith(
    //   'order',
    //   {
    //     method: 'POST',
    //     order: {
    //       execInst: 'ParticipateDoNotInitiate',
    //       ordType: 'Limit',
    //       orderQty: 200,
    //       price: 10322,
    //       side: 'Sell',
    //       symbol: 'XBTUSD',
    //       text: 'best_order',
    //     },
    //   },
    //   ['orderID', 'price'],
    // );
  });

  it('should place and fill a trailing sell order', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});
    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, '200')
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .applyWithAct(
        sendWebsocketMessage(partialOrder({orderID, symbol: SYMBOLS.XBTUSD, price: 9000, ordStatus: 'Filled'})),
      )
      .burnFuel()
      .withStore('trailing')
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/pending',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/fulfilled',
        'trailing/__CLEAR_TRAILING_ORDER',
      ],
      toast: [{message: 'Trailing Order placed at 10322', toastPreset: 'success'}],
      trailing: {
        trailLoading: false,
        trailOrderId: '',
        trailOrderPrice: 0,
        trailOrderSide: 'Sell',
        trailOrderStatus: 'Order not placed.',
        trailOrderSymbol: 'XBTUSD',
      },
    });
  });

  it.skip('should place and trail the order', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});
    const newOrderBook = partialInstrument({askPrice: 10321, bidPrice: 10320.5, symbol: SYMBOLS.XBTUSD});
    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, '200')
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .applyWithAct(
        sendWebsocketMessage(partialOrder({orderID, symbol: SYMBOLS.XBTUSD, price: 12000, ordStatus: 'New'})),
      )
      .burnFuel()
      .applyWithAct(sendWebsocketMessage(newOrderBook))
      // .burnFuel()s
      .withStore('trailing')
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/pending',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/fulfilled',
        'REDUX_WEBSOCKET::MESSAGE',
      ],
      toast: [{message: 'Trailing Order placed at 10322', toastPreset: 'success'}],
      trailing: {
        trailLoading: false,
        trailOrderId: 'OrderId',
        trailOrderPrice: 10322,
        trailOrderSide: 'Sell',
        trailOrderStatus: 'Order placed.',
        trailOrderSymbol: 'XBTUSD',
      },
    });
  });
});
