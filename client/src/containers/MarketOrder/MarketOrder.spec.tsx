import MarketOrderContainer from './index';
import {createStore, AppState} from 'redux/store';
import {ReduxComponentDriver} from 'tests/driver';
import {MARKET_CONTAINER, COMPONENTS} from 'data-test-ids';
import {MockBitMEX_API} from '../../tests/mockAPI';
import {ButtonDriver} from 'components/Button/Button.spec';
import {SelectDropdownDriver} from 'components/SelectDropdown/SelectDropdown.spec';
import {EnhancedStore} from '@reduxjs/toolkit';
import InputFieldDriver from 'components/InputField/InputField.spec';

describe('ButtonDriver', () => {
  let driver: MarketOrderContainerDriver;
  let sendRequestSpy: jest.SpyInstance;

  beforeEach(() => {
    const store = createStore({}, new MockBitMEX_API());
    driver = new MarketOrderContainerDriver(store);
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
    driver.getInput().setInputValue('1113');
    driver.getSubmitButton(MARKET_CONTAINER.BUY_BUTTON).pressButton();

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {method: 'POST', order: {ordType: 'Market', orderQty: 1113, side: 'Buy', symbol: 'XBTUSD'}},
      ['orderID', 'price'],
    );
  });

  it('should submit a market sell order request on button click', async () => {
    driver.getInput().setInputValue('111');
    driver.getSubmitButton(MARKET_CONTAINER.SELL_BUTTON).pressButton();

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {method: 'POST', order: {ordType: 'Market', orderQty: 111, side: 'Sell', symbol: 'XBTUSD'}},
      ['orderID', 'price'],
    );
  });

  it('should submit an order with a selected ticker', async () => {
    // const component = driver.render();
    driver.getDropdown().selectOption('ETHUSD');
    driver.getInput().setInputValue('111');
    driver.getSubmitButton(MARKET_CONTAINER.SELL_BUTTON).pressButton();

    expect(sendRequestSpy).toHaveBeenCalledWith(
      'order',
      {method: 'POST', order: {ordType: 'Market', orderQty: 111, side: 'Sell', symbol: 'ETHUSD'}},
      ['orderID', 'price'],
    );
  });
});

class MarketOrderContainerDriver extends ReduxComponentDriver<typeof MarketOrderContainer> {
  constructor(props: EnhancedStore<AppState>) {
    super(MarketOrderContainer, props);
  }

  getInput() {
    return new InputFieldDriver().attachTo(this.getElement(MARKET_CONTAINER.INPUT));
  }

  getSubmitButton(testID: string) {
    return new ButtonDriver().attachTo(this.getElement(testID));
  }

  getDropdown() {
    return new SelectDropdownDriver().attachTo(this.getElement(COMPONENTS.SELECT_DROPDOWN));
  }
}
