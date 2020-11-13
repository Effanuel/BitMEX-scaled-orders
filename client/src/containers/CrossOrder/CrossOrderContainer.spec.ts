import {CROSS_ORDER_CONTAINER} from 'data-test-ids';
import {createEngine} from 'tests/fuel/app-driver';
import {openWebsocket, sendWebsocketMessage} from 'tests/fuel/helpers';
import {isDisabled, textOf} from 'tests/fuel/inspectors';
import {ResponseBuilder} from 'tests/responses';
import {toastSpyModule} from 'tests/spies';
import {partialInstrument, updateInstrument} from 'tests/websocketData/instrument';
import {SYMBOLS} from 'util/BitMEX-types';
import CrossOrderContainer from './CrossOrderContainer';

const orderID = 'OrderId';

const INITIAL_MOCKS = new ResponseBuilder().postTrailingOrder(orderID, 10322).build();
const engine = createEngine(CrossOrderContainer, {}, INITIAL_MOCKS);

describe('CrossOrderContainer', () => {
  it('should render submit button as disabled when not subscribed to ws', async () => {
    const result = await engine()
      .inspect({submitButtonLabel: textOf(CROSS_ORDER_CONTAINER.SUBMIT)})
      .inspect({isDisabled: isDisabled(CROSS_ORDER_CONTAINER.SUBMIT)})
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
      .inspect({submitButtonLabel: textOf(CROSS_ORDER_CONTAINER.SUBMIT)})
      .inspect({isDisabled: isDisabled(CROSS_ORDER_CONTAINER.SUBMIT)})
      .halt();

    expect(result).toEqual({
      actions: ['REDUX_WEBSOCKET::OPEN', 'REDUX_WEBSOCKET::MESSAGE'],
      isDisabled: true,
      submitButtonLabel: 'Place a crossunder-market sell order',
    });
  });

  it('should create a order without placing if price has only crossed cross price once', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});

    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, '200')
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, '10000')
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .burnFuel()
      .withStore('cross')
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/CREATE_CROSS_ORDER',
        'cross/ORDER_CROSSED_ONCE',
      ],
      cross: {
        crossOrderPrice: 10000,
        crossOrderQuantity: 200,
        crossOrderSide: 'Sell',
        crossOrderSymbol: 'XBTUSD',
        hasPriceCrossedOnce: true,
      },
    });
  });

  it('should submit an order if price has crossed the cross price twice', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});
    const updatedOrderBook = updateInstrument({askPrice: 9500, bidPrice: 9000, symbol: SYMBOLS.XBTUSD});

    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, '200')
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, '10000')
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .applyWithAct(sendWebsocketMessage(updatedOrderBook))
      .burnFuel()
      .withStore('cross')
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/CREATE_CROSS_ORDER',
        'cross/ORDER_CROSSED_ONCE',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/CROSS_POST_MARKET_ORDER/pending',
        'cross/CROSS_POST_MARKET_ORDER/fulfilled',
      ],
      cross: {
        crossOrderPrice: 0,
        crossOrderQuantity: 0,
        crossOrderSide: 'Sell',
        crossOrderSymbol: 'XBTUSD',
        hasPriceCrossedOnce: false,
      },
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });

  it('should cancel the cross order', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOLS.XBTUSD});

    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, '200')
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, '10000')
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .press(CROSS_ORDER_CONTAINER.CANCEL_ORDER)
      .withStore('cross')
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/CREATE_CROSS_ORDER',
        'cross/ORDER_CROSSED_ONCE',
        'cross/CLEAR_CROSS_ORDER',
      ],
      cross: {
        crossOrderPrice: 0,
        crossOrderQuantity: 0,
        crossOrderSide: 'Sell',
        crossOrderSymbol: 'XBTUSD',
        hasPriceCrossedOnce: false,
      },
    });
  });

  // @TODO rename suite
  it('should submit cross order after it crossed up', async () => {
    const currentOrderBook = partialInstrument({askPrice: 9000, bidPrice: 8900, symbol: SYMBOLS.XBTUSD});

    const priceAboveCrossOrder = updateInstrument({askPrice: 11000, bidPrice: 10500, symbol: SYMBOLS.XBTUSD});
    const priceBelowCrossOrder = updateInstrument({askPrice: 8000, bidPrice: 7900, symbol: SYMBOLS.XBTUSD});

    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, '200')
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, '10000')
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .withStore('cross', 'hasPriceCrossedOnce', {as: 'cross1.hasPriceCrossedOnce'})
      .applyWithAct(sendWebsocketMessage(priceAboveCrossOrder))
      .withStore('cross', 'hasPriceCrossedOnce', {as: 'cross2.hasPriceCrossedOnce'})
      .applyWithAct(sendWebsocketMessage(priceBelowCrossOrder))
      .burnFuel()
      .withStore('cross', undefined, {as: 'cross3'})
      .halt();

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/CREATE_CROSS_ORDER',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/ORDER_CROSSED_ONCE',
        'REDUX_WEBSOCKET::MESSAGE',
        'cross/CROSS_POST_MARKET_ORDER/pending',
        'cross/CROSS_POST_MARKET_ORDER/fulfilled',
      ],
      'cross1.hasPriceCrossedOnce': false,
      'cross2.hasPriceCrossedOnce': true,
      cross3: {
        crossOrderPrice: 0,
        crossOrderQuantity: 0,
        crossOrderSide: 'Sell',
        crossOrderSymbol: 'XBTUSD',
        hasPriceCrossedOnce: false,
      },
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });
});
