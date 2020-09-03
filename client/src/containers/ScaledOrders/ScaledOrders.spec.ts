import {createStore, AppState} from 'redux/store';
import ScaledContainer from './ScaledOrders';
import {ReduxComponentDriver} from 'tests/driver';
import {MockBitMEX_API} from 'tests/mockAPI';
import {ButtonDriver} from 'components/Button/Button.spec';
import {SCALED_CONTAINER} from 'data-test-ids';
import {act} from 'react-test-renderer';
import MarketOrderContainer from 'containers/MarketOrder';
import {EnhancedStore} from '@reduxjs/toolkit';
import InputFieldDriver from 'components/InputField/InputField.spec';

describe('ScaledOrders', () => {
  let driver: ScaledOrdersContainer;
  let sendRequestSpy: jest.SpyInstance;

  beforeEach(() => {
    const store = createStore({}, new MockBitMEX_API());
    driver = new ScaledOrdersContainer(store);
    sendRequestSpy = jest.spyOn(MockBitMEX_API.prototype, 'sendRequest');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render submit button as disabled', () => {
    const component = driver.render();
    expect(component.getButton(SCALED_CONTAINER.SUBMIT_BUTTON).props.disabled).toBeTruthy();
  });

  it('should submit scaled orders without stoploss', async () => {
    driver.fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000'});

    const submitButton = driver.getButton(SCALED_CONTAINER.SUBMIT_BUTTON);
    submitButton.pressButton();
    await act(flushPromises);

    const spyCalls = sendRequestSpy.mock.calls[0][1];
    const ordersSubmitted = spyCalls.orders;
    const stopLossSubmitted = spyCalls.stop;

    expect(ordersSubmitted).toHaveLength(2);
    expect(stopLossSubmitted).toEqual({});
  });

  it('should submit scaled orders with stoploss', async () => {
    driver.fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000', stop: '5000'});

    const submitButton = driver.getButton(SCALED_CONTAINER.SUBMIT_BUTTON);
    submitButton.pressButton();
    await act(flushPromises);

    const spyCalls = sendRequestSpy.mock.calls[0][1];
    const ordersSubmitted = spyCalls.orders;
    const stopLossSubmitted = spyCalls.stop;

    expect(ordersSubmitted).toHaveLength(3);
    expect(stopLossSubmitted).toEqual(expect.objectContaining({text: 'stop'}));
  });
});

interface ScaledInputs {
  orderQty: string;
  n_tp: string;
  start: string;
  end: string;
  stop?: string;
}

class ScaledOrdersContainer extends ReduxComponentDriver<typeof MarketOrderContainer> {
  constructor(props: EnhancedStore<AppState>) {
    super(ScaledContainer, props);
  }

  fillInputs({orderQty, n_tp, start, end, stop}: ScaledInputs) {
    this.getInput(SCALED_CONTAINER.QUANTITY_INPUT).setInputValue(orderQty);
    this.getInput(SCALED_CONTAINER.ORDER_COUNT_INPUT).setInputValue(n_tp);
    this.getInput(SCALED_CONTAINER.RANGE_START_INPUT).setInputValue(start);
    this.getInput(SCALED_CONTAINER.RANGE_END_INPUT).setInputValue(end);
    stop && this.getInput(SCALED_CONTAINER.STOP_LOSS_INPUT).setInputValue(stop);
  }

  getButton(testID: string) {
    return new ButtonDriver().attachTo(this.getElement(testID));
  }

  getInput(testID: string) {
    return new InputFieldDriver().attachTo(this.getElement(testID));
  }
}
