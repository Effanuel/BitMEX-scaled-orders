import TrailingLimitOrderContainer from './TrailingLimitOrderContainer';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import {mockWebsocketState} from 'tests/mockData/orders';
import {Instrument, SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {partialInstrument, updateInstrument} from 'tests/websocketData/instrument';
import {partialOrder} from 'tests/websocketData/order';
import {toastSpy} from 'tests/spies';
import {ResponseBuilder} from 'tests/responses';
import {getState, isDisabled, storeActions, textOf} from 'tests/wrench/inspectors';
import {openWebsocket, sendWebsocketMessage} from 'tests/helpers';
import {createRenderer} from 'tests/wrench/Wrench';

const orderID = 'OrderId';

const render = createRenderer(TrailingLimitOrderContainer, {props: {}});

describe('TrailingLimitContainer', () => {
  it('should render submit button as disabled when not subscribed to ws', async () => {
    const result = await render().inspect({
      submitButtonLabel: textOf(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER),
      isDisabled: isDisabled(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER),
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
      .inspect({submitButtonLabel: textOf(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)})
      .inspect({isDisabled: isDisabled(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)})
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['REDUX_WEBSOCKET::OPEN', 'REDUX_WEBSOCKET::MESSAGE'],
      isDisabled: true,
      submitButtonLabel: 'Place a trailing limit order at 10,322.00',
    });
  });

  it('should submit a trailing order without filling it', async () => {
    const {limitOrder} = new ResponseBuilder()
      .limitOrder({symbol: SYMBOL.XBTUSD, side: SIDE.SELL, orderQty: 200, price: 501, text: 'best_order'}, orderID)
      .build();

    const websocket = mockWebsocketState({
      connected: true,
      instrument: [{symbol: SYMBOL.XBTUSD, askPrice: 501, bidPrice: 500.5}] as Instrument[],
    });

    const result = await render({})
      .setStore({websocket})
      .addSpies(toastSpy)
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, '200')
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .resolve({limitOrder})
      .applyWithAct(sendWebsocketMessage(partialOrder({orderID, symbol: SYMBOL.XBTUSD, price: 501, ordStatus: 'New'})))
      .inspect({actions: storeActions(), trailing: getState('trailing')});

    expect(result).toEqual({
      actions: [
        'trailing/POST_TRAILING_ORDER/pending',
        'trailing/POST_TRAILING_ORDER/fulfilled',
        'REDUX_WEBSOCKET::MESSAGE',
      ],
      api: [{limitOrder: {orderQty: 200, price: 501, side: 'Sell', symbol: 'XBTUSD', text: 'best_order'}}],
      toast: [{message: 'Trailing Order placed at 501', toastPreset: 'success'}],
      trailing: {
        trailLoading: false,
        trailOrderId: orderID,
        trailOrderPrice: 501,
        trailOrderSide: 'Sell',
        trailOrderStatus: 'Order placed.',
        trailOrderSymbol: 'XBTUSD',
      },
    });
  });

  it('should place and fill a trailing sell order', async () => {
    const {limitOrder} = new ResponseBuilder()
      .limitOrder({symbol: SYMBOL.XBTUSD, side: SIDE.SELL, orderQty: 200, price: 10322, text: 'best_order'}, orderID)
      .build();

    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOL.XBTUSD});
    const result = await render()
      .addSpies(toastSpy)
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, 200)
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .resolve({limitOrder})
      .applyWithAct(
        sendWebsocketMessage(partialOrder({orderID, symbol: SYMBOL.XBTUSD, price: 9000, ordStatus: 'Filled'})),
      )
      .inspect({actions: storeActions(), trailing: getState('trailing')});

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/pending',
        'trailing/POST_TRAILING_ORDER/fulfilled',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/__CLEAR_TRAILING_ORDER',
      ],
      api: [{limitOrder: {orderQty: 200, price: 10322, side: 'Sell', symbol: 'XBTUSD', text: 'best_order'}}],
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

  it('should place and trail the order', async () => {
    const {limitOrder, orderAmend} = new ResponseBuilder()
      .limitOrder({symbol: SYMBOL.XBTUSD, side: SIDE.SELL, orderQty: 200, price: 10322, text: 'best_order'}, orderID)
      .orderAmend({orderID, price: 10321})
      .build();

    const currentOrderBook = partialInstrument({askPrice: 10322, bidPrice: 10321.5, symbol: SYMBOL.XBTUSD});
    const newOrderBook = updateInstrument({askPrice: 10321, bidPrice: 10320.5, symbol: SYMBOL.XBTUSD});
    const result = await render()
      .addSpies(toastSpy)
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(currentOrderBook))
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, 200)
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .resolve({limitOrder})
      .applyWithAct(
        sendWebsocketMessage(partialOrder({orderID, symbol: SYMBOL.XBTUSD, price: 10322, ordStatus: 'New'})),
      )
      .applyWithAct(sendWebsocketMessage(newOrderBook))
      .resolve({orderAmend})
      .inspect({actions: storeActions(), trailing: getState('trailing')});

    expect(result).toEqual({
      actions: [
        'REDUX_WEBSOCKET::OPEN',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/POST_TRAILING_ORDER/pending',
        'trailing/POST_TRAILING_ORDER/fulfilled',
        'REDUX_WEBSOCKET::MESSAGE',
        'REDUX_WEBSOCKET::MESSAGE',
        'trailing/PUT_TRAILING_ORDER/pending',
        'trailing/PUT_TRAILING_ORDER/fulfilled',
      ],
      api: [
        {limitOrder: {orderQty: 200, price: 10322, side: 'Sell', symbol: 'XBTUSD', text: 'best_order'}},
        {orderAmend: {orderID: 'OrderId', price: 10321}},
      ],
      toast: [{message: 'Trailing Order placed at 10322', toastPreset: 'success'}],
      trailing: {
        trailLoading: false,
        trailOrderId: 'OrderId',
        trailOrderPrice: 10321,
        trailOrderSide: 'Sell',
        trailOrderStatus: 'Order placed.',
        trailOrderSymbol: 'XBTUSD',
      },
    });
  });
});
