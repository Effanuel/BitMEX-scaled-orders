import {act} from 'react-test-renderer';
import {EnhancedStore} from '@reduxjs/toolkit';
import MarketOrderContainer from './index';
import {MARKET_CONTAINER} from 'data-test-ids';
import {MockBitMEX_API} from '../../tests/mockAPI';
import {AppState} from 'redux/models/state';
import {AppDriver} from 'tests/app-driver';

async function flushPromises(ms: any) {
  await new Promise((resolve) => {
    setTimeout(resolve);
    if (setTimeout.mock) {
      if (ms !== undefined) {
        jest.runTimersToTime(ms);
      } else {
        jest.runAllTimers();
      }
    }
  });
}

describe('MarketOrder', () => {
  let driver: AppDriver<typeof MarketOrderContainer>;
  let sendRequestSpy: jest.SpyInstance;

  beforeEach(() => {
    driver = createAppDriver();
    sendRequestSpy = jest.spyOn(MockBitMEX_API.prototype, 'sendRequest');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should disable market buy and market sell buttons by default', async () => {
    const result = await driver.renderAsync();

    expect(result.getByID(MARKET_CONTAINER.BUY_BUTTON)!.props.disabled).toBeTruthy();
    expect(result.getByID(MARKET_CONTAINER.SELL_BUTTON)!.props.disabled).toBeTruthy();
  });

  it('should submit a market buy order request on button click', async () => {
    driver.getInput(MARKET_CONTAINER.INPUT).setInputValue('1113');
    driver.getButton(MARKET_CONTAINER.BUY_BUTTON).pressButton();

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {method: 'POST', order: {ordType: 'Market', orderQty: 1113, side: 'Buy', symbol: 'XBTUSD'}},
      ['orderID', 'price'],
    );
  });

  it('should submit a market sell order request on button click', async () => {
    driver.getInput(MARKET_CONTAINER.INPUT).setInputValue('111');
    driver.getButton(MARKET_CONTAINER.SELL_BUTTON).pressButton();

    await act(flushPromises);

    expect(driver.getActionTypes()).toEqual([
      'preview/POST_MARKET_ORDER/pending',
      'preview/POST_MARKET_ORDER/fulfilled',
    ]);

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {method: 'POST', order: {ordType: 'Market', orderQty: 111, side: 'Sell', symbol: 'XBTUSD'}},
      ['orderID', 'price'],
    );
  });

  it('should submit an order with a selected ticker', async () => {
    // const component = driver.render();
    driver.getDropdown().selectOption('ETHUSD');
    driver.getInput(MARKET_CONTAINER.INPUT).setInputValue('111');
    driver.getButton(MARKET_CONTAINER.SELL_BUTTON).pressButton();

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {method: 'POST', order: {ordType: 'Market', orderQty: 111, side: 'Sell', symbol: 'ETHUSD'}},
      ['orderID', 'price'],
    );
  });
});

function createAppDriver(state?: EnhancedStore<AppState>) {
  return new AppDriver(MarketOrderContainer, state);
}
