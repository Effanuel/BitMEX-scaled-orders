import {act} from 'react-test-renderer';
import {MockBitMEX_API} from 'tests/mockAPI';
import TrailingLimitOrderContainer from './TrailingLimitOrderContainer';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import {mockWebsocketState} from 'tests/mockData/orders';
import {SYMBOLS} from 'util/BitMEX-types';
import {AppDriver} from 'tests/app-driver';
import {createMockedStore} from 'tests/mockStore';
import {Instrument, REDUX_WEBSOCKET_MESSAGE, REDUX_WEBSOCKET_OPEN} from 'redux/modules/websocket/types';
import {partialInstrument} from 'tests/websocketData/instrument';
import {partialOrder} from 'tests/websocketData/order';
import {flushPromises} from '../../tests/helpers';

function createAppDriver(state = createMockedStore()) {
  return new AppDriver(TrailingLimitOrderContainer, state);
}

describe('TrailingLimitContainer', () => {
  let driver: AppDriver<typeof TrailingLimitOrderContainer>;
  let sendRequestSpy: jest.SpyInstance;

  beforeEach(() => {
    driver = createAppDriver();
    sendRequestSpy = jest.spyOn(MockBitMEX_API.prototype, 'sendRequest');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render submit button as disabled', () => {
    const component = driver.render();
    expect(component.getButton(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER).props.disabled).toBeTruthy();
  });

  it('should submit a trailing order without placing it', async () => {
    const websocket = mockWebsocketState({
      connected: true,
      instrument: [{symbol: SYMBOLS.XBTUSD, askPrice: 501, bidPrice: 500}] as Instrument[],
    });
    const store = createMockedStore({websocket});
    driver = createAppDriver(store);

    const component = driver.render();

    component.getInput(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT).setInputValue('200');
    component.getButton(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER).pressButton();

    await act(flushPromises);

    expect(driver.getActionTypes()).toEqual([
      'trailing/POST_TRAILING_ORDER/pending',
      'trailing/POST_TRAILING_ORDER/fulfilled',
      'trailing/__CLEAR_TRAILING_ORDER',
    ]);

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {
        method: 'POST',
        order: {
          execInst: 'ParticipateDoNotInitiate',
          ordType: 'Limit',
          orderQty: 200,
          price: 501,
          side: 'Sell',
          symbol: 'XBTUSD',
          text: 'best_order',
        },
      },
      ['orderID', 'price'],
    );
  });

  it('should submit a trailing order', async () => {
    driver = createAppDriver();

    const component = driver.render();

    act(() => {
      driver.store.dispatch({type: REDUX_WEBSOCKET_OPEN});
      const data = JSON.stringify(partialInstrument);
      driver.store.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message: data}});
    });

    component.getInput(TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT).setInputValue('200');
    component.getButton(TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER).pressButton();

    act(() => {
      const data = JSON.stringify(partialOrder);
      driver.store.dispatch({type: REDUX_WEBSOCKET_MESSAGE, payload: {message: data}});
    });
    await act(flushPromises);

    expect(driver.getActionTypes()).toEqual([
      'REDUX_WEBSOCKET::OPEN',
      'REDUX_WEBSOCKET::MESSAGE',
      'trailing/POST_TRAILING_ORDER/pending',
      'REDUX_WEBSOCKET::MESSAGE',
      'trailing/POST_TRAILING_ORDER/fulfilled',
    ]);

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {
        method: 'POST',
        order: {
          execInst: 'ParticipateDoNotInitiate',
          ordType: 'Limit',
          orderQty: 200,
          price: 10322,
          side: 'Sell',
          symbol: 'XBTUSD',
          text: 'best_order',
        },
      },
      ['orderID', 'price'],
    );

    expect(driver.store.getState().trailing).toEqual({
      trailLoading: false,
      trailOrderId: '572fe645-91c8-1a47-5060-18f11630f38a',
      trailOrderPrice: 10321.5,
      trailOrderSide: undefined,
      trailOrderStatus: 'Order placed.',
      trailOrderSymbol: 'XBTUSD',
    });
  });
});
