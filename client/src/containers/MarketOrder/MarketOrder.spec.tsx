import MarketOrderContainer from './MarketOrder';
import {COMPONENTS, MARKET_CONTAINER} from 'data-test-ids';
import {toastSpy} from 'tests/spies';
import {createRenderer} from 'tests/wrench/Wrench';
import {isDisabled, storeActions} from 'tests/wrench/inspectors';
import {ResponseBuilder} from 'tests/responses';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';

const render = createRenderer(MarketOrderContainer);

describe('MarketOrder', () => {
  it('should disable market buy and market sell buttons by default', async () => {
    const result = await render().inspect({
      isBuyButtonDisabled: isDisabled(MARKET_CONTAINER.BUY_BUTTON),
      isSellButtonDisabled: isDisabled(MARKET_CONTAINER.SELL_BUTTON),
    });

    expect(result).toEqual({isBuyButtonDisabled: true, isSellButtonDisabled: true});
  });

  it('should submit a market buy order', async () => {
    const promises = new ResponseBuilder().marketOrder({symbol: SYMBOL.XBTUSD, side: SIDE.BUY, orderQty: 1113}).build();

    const result = await render()
      .addSpies(toastSpy)
      .inputText(MARKET_CONTAINER.INPUT, 1113)
      .press(MARKET_CONTAINER.BUY_BUTTON)
      .expectExists(COMPONENTS.SPINNER)
      .resolve(promises)
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['preview/PREVIEW_POST_MARKET_ORDER/pending', 'preview/PREVIEW_POST_MARKET_ORDER/fulfilled'],
      api: [{marketOrder: {orderQty: 1113, side: 'Buy', symbol: 'XBTUSD'}}],
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });

  it('should submit a market sell order', async () => {
    const promises = new ResponseBuilder().marketOrder({symbol: SYMBOL.XBTUSD, side: SIDE.SELL, orderQty: 111}).build();

    const result = await render()
      .addSpies(toastSpy)
      .inputText(MARKET_CONTAINER.INPUT, 111)
      .press(MARKET_CONTAINER.SELL_BUTTON)
      .expectExists(COMPONENTS.SPINNER)
      .resolve(promises)
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['preview/PREVIEW_POST_MARKET_ORDER/pending', 'preview/PREVIEW_POST_MARKET_ORDER/fulfilled'],
      api: [{marketOrder: {orderQty: 111, side: 'Sell', symbol: 'XBTUSD'}}],
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });

  it('should submit an order with a selected ticker', async () => {
    const promises = new ResponseBuilder().marketOrder({symbol: SYMBOL.ETHUSD, side: SIDE.SELL, orderQty: 111}).build();

    const result = await render()
      .addSpies(toastSpy)
      .selectOption(COMPONENTS.SELECT_DROPDOWN, SYMBOL.ETHUSD)
      .inputText(MARKET_CONTAINER.INPUT, 111)
      .press(MARKET_CONTAINER.SELL_BUTTON)
      .expectExists(COMPONENTS.SPINNER)
      .resolve(promises)
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['preview/PREVIEW_POST_MARKET_ORDER/pending', 'preview/PREVIEW_POST_MARKET_ORDER/fulfilled'],
      api: [{marketOrder: {orderQty: 111, side: 'Sell', symbol: 'ETHUSD'}}],
      toast: [{message: 'Submitted Market Order', toastPreset: 'success'}],
    });
  });
});
