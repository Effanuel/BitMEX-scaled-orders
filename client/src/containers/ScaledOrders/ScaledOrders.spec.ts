import _ from 'lodash';
import ScaledContainer from './ScaledOrders';
import {COMPONENTS, SCALED_CONTAINER} from 'data-test-ids';
import {toastSpy} from 'tests/spies';
import {countOf, exists, isDisabled, storeActions} from 'tests/wrench/inspectors';
import {createRenderer, Wrench} from 'tests/wrench/Wrench';
import {ResponseBuilder} from 'tests/responses';
import {createScaledOrders, DISTRIBUTION} from 'utils';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';

interface ScaledInputs {
  orderQty: number;
  n_tp: number;
  start: number;
  end: number;
  symbol?: SYMBOL;
  side?: SIDE;
  stop?: number;
}

function fillInputs({orderQty, n_tp, start, end, stop, symbol, side}: ScaledInputs) {
  return (driver: Wrench) => {
    !!symbol && driver.selectOption(COMPONENTS.SELECT_DROPDOWN, symbol);
    !!side && driver.toggle(SCALED_CONTAINER.SIDE, side);
    !!stop && driver.inputText(SCALED_CONTAINER.STOP_LOSS_INPUT, stop);
    driver.inputText(SCALED_CONTAINER.QUANTITY_INPUT, orderQty);
    driver.inputText(SCALED_CONTAINER.ORDER_COUNT_INPUT, n_tp);
    driver.inputText(SCALED_CONTAINER.RANGE_START_INPUT, start);
    driver.inputText(SCALED_CONTAINER.RANGE_END_INPUT, end);
  };
}

const render = createRenderer(ScaledContainer, {props: {}});

describe('ScaledOrders', () => {
  it('should render submit button as disabled', async () => {
    const result = await render().inspect({isDisabled: isDisabled(SCALED_CONTAINER.SUBMIT_BUTTON)});

    expect(result).toEqual({isDisabled: true});
  });

  it('should submit sell scaled orders without stoploss', async () => {
    const input = {orderQty: 1000, n_tp: 2, start: 1000, end: 2000, side: SIDE.SELL, symbol: SYMBOL.XBTUSD, stop: 0};
    const orders = createScaledOrders({ordersProps: input, distribution: DISTRIBUTION.Uniform});

    const promises = new ResponseBuilder().orderBulk(orders).build();

    const result = await render()
      .addSpies(toastSpy)
      .apply(fillInputs(input))
      .press(SCALED_CONTAINER.SUBMIT_BUTTON)
      .expectExists(COMPONENTS.SPINNER)
      .resolve(promises)
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['preview/PREVIEW_POST_ORDER/pending', 'preview/PREVIEW_POST_ORDER/fulfilled'],
      api: [
        {
          orderBulk: [
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 500,
              price: 1000,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_1',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 500,
              price: 2000,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_2',
            },
          ],
        },
      ],
      toast: [{message: 'Submitted Scaled Orders', toastPreset: 'success'}],
    });
  });

  it('should submit buy scaled orders without stoploss', async () => {
    const input = {orderQty: 1000, n_tp: 2, start: 1000, end: 2000, side: SIDE.BUY, symbol: SYMBOL.XBTUSD, stop: 0};
    const orders = createScaledOrders({ordersProps: input, distribution: DISTRIBUTION.Uniform});

    const promises = new ResponseBuilder().orderBulk(orders).build();

    const result = await render()
      .addSpies(toastSpy)
      .apply(fillInputs(input))
      .press(SCALED_CONTAINER.SUBMIT_BUTTON)
      .expectExists(COMPONENTS.SPINNER)
      .resolve(promises)
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['preview/PREVIEW_POST_ORDER/pending', 'preview/PREVIEW_POST_ORDER/fulfilled'],
      api: [
        {
          orderBulk: [
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 500,
              price: 1000,
              side: 'Buy',
              symbol: 'XBTUSD',
              text: 'order_1',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 500,
              price: 2000,
              side: 'Buy',
              symbol: 'XBTUSD',
              text: 'order_2',
            },
          ],
        },
      ],
      toast: [{message: 'Submitted Scaled Orders', toastPreset: 'success'}],
    });
  });

  it('should submit scaled orders with stoploss', async () => {
    const orders = createScaledOrders({
      ordersProps: {orderQty: 1000, n_tp: 2, start: 1000, end: 20, side: SIDE.SELL, symbol: SYMBOL.XBTUSD, stop: 3000},
      distribution: DISTRIBUTION.Uniform,
    });

    const promises = new ResponseBuilder().orderBulk(orders).build();

    const result = await render()
      .addSpies(toastSpy)
      .apply(fillInputs({orderQty: 1000, n_tp: 2, start: 1000, end: 20, stop: 3000}))
      .press(SCALED_CONTAINER.SUBMIT_BUTTON)
      .expectExists(COMPONENTS.SPINNER)
      .resolve(promises)
      .inspect({actions: storeActions()});

    expect(result).toEqual({
      actions: ['preview/PREVIEW_POST_ORDER/pending', 'preview/PREVIEW_POST_ORDER/fulfilled'],
      api: [
        {
          orderBulk: [
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 500,
              price: 1000,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_1',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 500,
              price: 20,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_2',
            },
            {
              execInst: 'LastPrice,ReduceOnly',
              ordType: 'Stop',
              orderQty: 1000,
              side: 'Buy',
              stopPx: 3000,
              symbol: 'XBTUSD',
              text: 'stop',
            },
          ],
        },
      ],
      toast: [{message: 'Submitted Scaled Orders', toastPreset: 'success'}],
    });
  });

  it('should open preview table', async () => {
    const result = await render()
      .apply(fillInputs({orderQty: 1000, n_tp: 5, start: 1000, end: 2000, stop: 3000}))
      .inspect({previewTableVisibleBefore: exists(SCALED_CONTAINER.PREVIEW_TABLE)})
      .press(SCALED_CONTAINER.PREVIEW_BUTTON)
      .inspect({
        previewTableVisibleAfter: exists(SCALED_CONTAINER.PREVIEW_TABLE),
        orderRowCount: countOf(SCALED_CONTAINER.ORDER_ROW),
        actions: storeActions(),
      });

    expect(result).toEqual({
      actions: ['preview/SHOW_PREVIEW'],
      orderRowCount: 6,
      previewTableVisibleAfter: true,
      previewTableVisibleBefore: false,
    });
  });
});
