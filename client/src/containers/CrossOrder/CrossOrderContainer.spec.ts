import {CROSS_ORDER_CONTAINER} from 'data-test-ids';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {partialInstrument, updateInstrument} from 'tests/websocketData/instrument';
import {getState, isDisabled, storeActions, textOf} from 'tests/wrench/inspectors';
import {openWebsocket, sendWebsocketMessage} from 'tests/helpers';
import {createRenderer} from 'tests/wrench/Wrench';
import {ResponseBuilder} from 'tests/responses';
import {toastSpy} from 'tests/spies';
import CrossOrderContainer from './CrossOrderContainer';

const render = createRenderer(CrossOrderContainer, {props: {}});

describe('CrossOrderContainer', () => {
  it('should render submit button as disabled when not subscribed to ws', async () => {
    const result = await render().inspect({
      submitButtonLabel: textOf(CROSS_ORDER_CONTAINER.SUBMIT),
      isDisabled: isDisabled(CROSS_ORDER_CONTAINER.SUBMIT),
    });

    expect(result).toEqual({
      submitButtonLabel: 'Not subscribed to order',
      isDisabled: true,
    });
  });

  it('should render submit button as disabled when inputs are empty', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOL.XBTUSD});

    const result = await render()
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inspect({
        submitButtonLabel: textOf(CROSS_ORDER_CONTAINER.SUBMIT),
        isDisabled: isDisabled(CROSS_ORDER_CONTAINER.SUBMIT),
        actions: storeActions(),
      });

    expect(result).toEqual({
      actions: ['REDUX_WEBSOCKET::OPEN', 'REDUX_WEBSOCKET::MESSAGE'],
      isDisabled: true,
      submitButtonLabel: 'Place a crossunder-market sell order',
    });
  });

  it('should create an order without placing if price has only crossed cross price once', async () => {
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOL.XBTUSD});

    const result = await render()
      .addSpies(toastSpy)
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, 200)
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, 10000)
      .toggle(CROSS_ORDER_CONTAINER.SIDE, SIDE.SELL)
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .applyWithAct(() => {})
      .inspect({actions: storeActions(), cross: getState('cross')});

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
      toast: [],
    });
  });

  it('should submit an order if price has crossed the cross price twice', async () => {
    const {marketOrder} = new ResponseBuilder()
      .marketOrder({symbol: SYMBOL.XBTUSD, side: SIDE.SELL, orderQty: 200})
      .build();

    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOL.XBTUSD});
    const updatedOrderBook = updateInstrument({askPrice: 9500, bidPrice: 9000, symbol: SYMBOL.XBTUSD});

    const result = await render()
      .addSpies(toastSpy)
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, '200')
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, '10000')
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .applyWithAct(sendWebsocketMessage(updatedOrderBook))
      .resolve({marketOrder})
      .inspect({actions: storeActions(), cross: getState('cross')});

    expect(result).toEqual({
      actions: [],
      api: [{marketOrder: {orderQty: 200, side: 'Sell', symbol: 'XBTUSD'}}],
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
    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOL.XBTUSD});

    const result = await render()
      .addSpies(toastSpy)
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, '200')
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, '10000')
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .press(CROSS_ORDER_CONTAINER.CANCEL_ORDER)
      .inspect({actions: storeActions(), cross: getState('cross')});

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
      toast: [],
    });
  });

  // @TODO rename suite
  it('should submit cross order after it crossed up', async () => {
    const {marketOrder} = new ResponseBuilder()
      .marketOrder({symbol: SYMBOL.XBTUSD, side: SIDE.SELL, orderQty: 200})
      .build();

    const currentOrderBook = partialInstrument({askPrice: 9000, bidPrice: 8900, symbol: SYMBOL.XBTUSD});

    const priceAboveCrossOrder = updateInstrument({askPrice: 11000, bidPrice: 10500, symbol: SYMBOL.XBTUSD});
    const priceBelowCrossOrder = updateInstrument({askPrice: 8000, bidPrice: 7900, symbol: SYMBOL.XBTUSD});

    const result = await render()
      .addSpies(toastSpy)
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(CROSS_ORDER_CONTAINER.QUANTITY_INPUT, 200)
      .inputText(CROSS_ORDER_CONTAINER.PRICE_INPUT, 10000)
      .press(CROSS_ORDER_CONTAINER.SUBMIT)
      .inspect({cross1: getState('cross.hasPriceCrossedOnce')})
      .applyWithAct(sendWebsocketMessage(priceAboveCrossOrder))
      .inspect({cross2: getState('cross.hasPriceCrossedOnce')})
      .applyWithAct(sendWebsocketMessage(priceBelowCrossOrder))
      .resolve({marketOrder})
      .inspect({cross3: getState('cross'), actions: storeActions()});

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
      api: [{marketOrder: {orderQty: 200, side: 'Sell', symbol: 'XBTUSD'}}],
      cross1: false,
      cross2: true,
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
