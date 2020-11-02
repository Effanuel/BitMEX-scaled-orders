import TrailingLimitOrderContainer from './TrailingLimitOrderContainer';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import {mockWebsocketState} from 'tests/mockData/orders';
import {SYMBOLS} from 'util/BitMEX-types';
import {createMockedStore} from 'tests/mockStore';
import {Instrument, REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {partialInstrument} from 'tests/websocketData/instrument';
import {partialOrder} from 'tests/websocketData/order';
import {AppDriver, createEngine} from 'tests/fuel/app-driver';
import {toastSpyModule} from 'tests/spies';

function openWebsocket<C>() {
  return (driver: AppDriver<typeof TrailingLimitOrderContainer>) => {
    driver.store.dispatch({type: REDUX_WEBSOCKET_OPEN});
  };
}

function sendWebsocketMessage<D>(data: D) {
  return (driver: AppDriver<typeof TrailingLimitOrderContainer>) => {
    const message = JSON.stringify(data);
    driver.store.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message}});
  };
}

const engine = createEngine(TrailingLimitOrderContainer, createMockedStore());

describe('TrailingLimitContainer', () => {
  it('should render submit button as disabled', () => {
    const component = engine().render();
    expect(component.getButton(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER).props.disabled).toBeTruthy();
  });

  it('should submit a trailing order without placing it', async () => {
    const websocket = mockWebsocketState({
      connected: true,
      instrument: [{symbol: SYMBOLS.XBTUSD, askPrice: 501, bidPrice: 500}] as Instrument[],
    });
    const store = createMockedStore({websocket});

    const result = await engine({store})
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
      toast: [{message: 'Trailing Order placed  at 10322', toastPreset: 'success'}],
    });
  });

  // @TODO: fix spy on api
  it('should submit a trailing sell order', async () => {
    const result = await engine()
      .addFuel(toastSpyModule())
      .applyWithAct(openWebsocket())
      .applyWithAct(sendWebsocketMessage(partialInstrument))
      .inputText(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT, '200')
      .press(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER)
      .applyWithAct(sendWebsocketMessage(partialOrder))
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
      toast: [{message: 'Trailing Order placed  at 10322', toastPreset: 'success'}],
      trailing: {
        trailLoading: false,
        trailOrderId: '572fe645-91c8-1a47-5060-18f11630f38a',
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
});
