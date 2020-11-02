import MarketOrderContainer from './index';
import {MARKET_CONTAINER} from 'data-test-ids';
import {createEngine} from 'tests/fuel/app-driver';
import {apiSpyModule, toastSpyModule} from 'tests/spies';

const engine = createEngine(MarketOrderContainer);

describe('MarketOrder', () => {
  it('should disable market buy and market sell buttons by default', async () => {
    const result = await engine().renderAsync();

    expect(result.getByID(MARKET_CONTAINER.BUY_BUTTON)!.props.disabled).toBeTruthy();
    expect(result.getByID(MARKET_CONTAINER.SELL_BUTTON)!.props.disabled).toBeTruthy();
  });

  it('should submit a market buy order request on button click', async () => {
    const result = await engine()
      .addFuel(toastSpyModule(), apiSpyModule())
      .inputText(MARKET_CONTAINER.INPUT, '1113')
      .press(MARKET_CONTAINER.BUY_BUTTON)
      .burnFuel()
      .halt();

    expect(result).toEqual({
      actions: ['preview/POST_MARKET_ORDER/pending', 'preview/POST_MARKET_ORDER/fulfilled'],
      api: [
        [
          'order',
          {method: 'POST', order: {ordType: 'Market', orderQty: 1113, side: 'Buy', symbol: 'XBTUSD'}},
          ['orderID', 'price'],
        ],
      ],
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });

  it('should submit a market sell order request on button click', async () => {
    const result = await engine()
      .addFuel(toastSpyModule(), apiSpyModule())
      .inputText(MARKET_CONTAINER.INPUT, '111')
      .press(MARKET_CONTAINER.SELL_BUTTON)
      .burnFuel()
      .halt();

    expect(result).toEqual({
      actions: ['preview/POST_MARKET_ORDER/pending', 'preview/POST_MARKET_ORDER/fulfilled'],
      api: [
        [
          'order',
          {method: 'POST', order: {ordType: 'Market', orderQty: 111, side: 'Sell', symbol: 'XBTUSD'}},
          ['orderID', 'price'],
        ],
      ],
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });

  it('should submit an order with a selected ticker', async () => {
    const result = await engine()
      .addFuel(toastSpyModule(), apiSpyModule())
      .selectOption('ETHUSD')
      .inputText(MARKET_CONTAINER.INPUT, '111')
      .press(MARKET_CONTAINER.SELL_BUTTON)
      .burnFuel()
      .halt();

    expect(result).toEqual({
      actions: ['preview/POST_MARKET_ORDER/pending', 'preview/POST_MARKET_ORDER/fulfilled'],
      api: [
        [
          'order',
          {method: 'POST', order: {ordType: 'Market', orderQty: 111, side: 'Sell', symbol: 'ETHUSD'}},
          ['orderID', 'price'],
        ],
      ],
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });
});
