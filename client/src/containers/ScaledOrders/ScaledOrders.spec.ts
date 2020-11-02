import ScaledContainer from './ScaledOrders';
import {SCALED_CONTAINER} from 'data-test-ids';
import {AppDriver, createEngine} from 'tests/fuel/app-driver';
import {apiSpyModule, toastSpyModule} from 'tests/spies';
import {countOf, exists} from 'tests/fuel/inspectors';

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

const engine = createEngine(ScaledContainer);

describe('ScaledOrders', () => {
  it('should render submit button as disabled', () => {
    const component = engine().render();
    expect(component.getButton(SCALED_CONTAINER.SUBMIT_BUTTON).props.disabled).toBeTruthy();
  });

  it('should submit scaled orders without stoploss', async () => {
    const result = await engine()
      .addFuel(toastSpyModule(), apiSpyModule())
      .apply(fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000'}))
      .press(SCALED_CONTAINER.SUBMIT_BUTTON)
      .burnFuel()
      .halt();

    expect(result).toEqual({
      actions: ['preview/POST_ORDER/pending', 'preview/POST_ORDER/fulfilled'],
      api: [
        [
          'bulkOrders',
          {orders: [expect.objectContaining({price: 1000}), expect.objectContaining({price: 2000})], stop: {}},
        ],
      ],
      toast: [{message: 'Submitted Scaled Orders', toastPreset: 'success'}],
    });
  });

  it('should submit scaled orders with stoploss', async () => {
    const result = await engine()
      .addFuel(toastSpyModule(), apiSpyModule())
      .apply(fillInputs({orderQty: '1000', n_tp: '2', start: '1000', end: '2000', stop: '5000'}))
      .press(SCALED_CONTAINER.SUBMIT_BUTTON)
      .burnFuel()

      .halt();

    expect(result).toEqual({
      actions: ['preview/POST_ORDER/pending', 'preview/POST_ORDER/fulfilled'],
      api: [
        [
          'bulkOrders',
          {
            orders: [
              expect.objectContaining({orderQty: 500, price: 1000}),
              expect.objectContaining({orderQty: 500, price: 2000}),
              expect.objectContaining({orderQty: 1000, stopPx: 5000}),
            ],
            stop: expect.objectContaining({orderQty: 1000, stopPx: 5000}),
          },
        ],
      ],
      toast: [{message: 'Submitted Scaled Orders', toastPreset: 'success'}],
    });
  });

  it('should open preview table', async () => {
    // @TODO REDUCE duplicate insepctions in result
    const result = await engine()
      .apply(fillInputs({orderQty: '1000', n_tp: '5', start: '1000', end: '2000', stop: '3000'}))
      .inspect({previewTableVisibleBefore: exists(SCALED_CONTAINER.PREVIEW_TABLE)})
      .press(SCALED_CONTAINER.PREVIEW_BUTTON)
      .inspect({
        previewTableVisibleAfter: exists(SCALED_CONTAINER.PREVIEW_TABLE),
        orderRowCount: countOf(SCALED_CONTAINER.ORDER_ROW),
      })
      .burnFuel()
      .withStore('preview')
      .halt();

    expect(result).toEqual({
      actions: ['preview/SHOW_PREVIEW'],
      previewTableVisibleBefore: false,
      previewTableVisibleAfter: true,
      orderRowCount: 6,
      preview: {
        balance: 0,
        error: '',
        orders: {
          orders: [
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 200,
              price: 1000,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_1',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 200,
              price: 1250,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_2',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 200,
              price: 1500,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_3',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 200,
              price: 1750,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_4',
            },
            {
              execInst: 'ParticipateDoNotInitiate',
              ordType: 'Limit',
              orderQty: 200,
              price: 2000,
              side: 'Sell',
              symbol: 'XBTUSD',
              text: 'order_5',
            },
          ],
          stop: {
            execInst: 'LastPrice,ReduceOnly',
            ordType: 'Stop',
            orderQty: 1000,
            side: 'Buy',
            stopPx: 3000,
            symbol: 'XBTUSD',
            text: 'stop',
          },
        },
        previewLoading: false,
        showPreview: true,
      },
    });
  });
});
