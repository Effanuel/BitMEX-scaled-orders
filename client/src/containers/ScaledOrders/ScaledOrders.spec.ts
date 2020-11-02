import {act} from 'react-test-renderer';
import {MockBitMEX_API} from '../../tests/mockAPI';
import ScaledContainer from './ScaledOrders';
import {SCALED_CONTAINER} from 'data-test-ids';
import {AppDriver} from 'tests/app-driver';

interface ScaledInputs {
  orderQty: string;
  n_tp: string;
  start: string;
  end: string;
  stop?: string;
}

function fillInputs({orderQty, n_tp, start, end, stop}: ScaledInputs) {
  return (driver: AppDriver<typeof ScaledContainer>) => {
    driver.getInput(SCALED_CONTAINER.QUANTITY_INPUT).setInputValue(orderQty);
    driver.getInput(SCALED_CONTAINER.ORDER_COUNT_INPUT).setInputValue(n_tp);
    driver.getInput(SCALED_CONTAINER.RANGE_START_INPUT).setInputValue(start);
    driver.getInput(SCALED_CONTAINER.RANGE_END_INPUT).setInputValue(end);
    stop && driver.getInput(SCALED_CONTAINER.STOP_LOSS_INPUT).setInputValue(stop);
  };
}

function createAppDriver() {
  return new AppDriver(ScaledContainer);
}

describe('ScaledOrders', () => {
  let driver: AppDriver<typeof ScaledContainer>;
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
    expect(component.getButton(SCALED_CONTAINER.SUBMIT_BUTTON).props.disabled).toBeTruthy();
  });

  it('should submit scaled orders without stoploss', async () => {
    driver.apply(fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000'}));

    driver.getButton(SCALED_CONTAINER.SUBMIT_BUTTON).pressButton();
    await act(flushPromises);

    const spyCalls = sendRequestSpy.mock.calls[0][1];
    const ordersSubmitted = spyCalls.orders;
    const stopLossSubmitted = spyCalls.stop;

    expect(ordersSubmitted).toHaveLength(2);
    expect(stopLossSubmitted).toEqual({});

    expect(driver.getToastCalls()).toEqual({toasts: [{message: 'Scaled orders: error', toastPreset: 'error'}]});
  });

  it('should submit scaled orders with stoploss', async () => {
    driver.apply(fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000', stop: '5000'}));

    driver.getButton(SCALED_CONTAINER.SUBMIT_BUTTON).pressButton();
    await act(flushPromises);

    expect(driver.getActionTypes()).toEqual(['preview/POST_ORDER/pending', 'preview/POST_ORDER/rejected']);

    const spyCalls = sendRequestSpy.mock.calls[0][1];
    const ordersSubmitted = spyCalls.orders;
    const stopLossSubmitted = spyCalls.stop;

    expect(ordersSubmitted).toHaveLength(3);
    expect(stopLossSubmitted).toEqual(expect.objectContaining({text: 'stop'}));

    expect(driver.getToastCalls()).toEqual({toasts: [{message: 'Scaled orders: error', toastPreset: 'error'}]});
  });

  it('should open preview table', async () => {
    driver.apply(fillInputs({orderQty: '1000', n_tp: '5', start: '1000', end: '2000', stop: '3000'}));

    expect(driver.getByID(SCALED_CONTAINER.PREVIEW_TABLE)).toBeUndefined();

    driver.getButton(SCALED_CONTAINER.PREVIEW_BUTTON).pressButton();
    expect(driver.getActionTypes()).toEqual(['preview/SHOW_PREVIEW']);

    expect(driver.getByID(SCALED_CONTAINER.PREVIEW_TABLE)).toBeDefined();
    expect(driver.getByID(SCALED_CONTAINER.ORDER_ROW)?.children).toHaveLength(6);
  });

  it.skip('should close preview table on order submit', async () => {
    driver.apply(fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000', stop: '5000'}));

    driver.getButton(SCALED_CONTAINER.PREVIEW_BUTTON).pressButton();
    await act(flushPromises);

    expect(driver.getByID(SCALED_CONTAINER.PREVIEW_TABLE)).toBeDefined();
    driver.getButton(SCALED_CONTAINER.SUBMIT_BUTTON).pressButton();
    await act(flushPromises);
    expect(driver.getByID(SCALED_CONTAINER.PREVIEW_TABLE)).toBeUndefined();

    expect(driver.getActionTypes()).toEqual(['preview/SHOW_PREVIEW']);

    // const spyCalls = sendRequestSpy.mock.calls[0][1];
    // const ordersSubmitted = spyCalls.orders;
    // const stopLossSubmitted = spyCalls.stop;

    // expect(ordersSubmitted).toHaveLength(3);
    // expect(stopLossSubmitted).toEqual(expect.objectContaining({text: 'stop'}));
  });
});
