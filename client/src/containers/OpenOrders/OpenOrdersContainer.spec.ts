import {OpenOrdersContainer} from 'containers';
import {ADD_ORDER_MODAL, GLOBAL, OPEN_ORDERS_CONTAINER} from 'data-test-ids';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {builderProfitOrder, buildOrder} from 'tests/builders';
import {countOf, exists, getState, storeActions} from 'tests/wrench/inspectors';
import {ResponseBuilder} from 'tests/responses';
import {createRenderer} from 'tests/wrench/Wrench';

const render = createRenderer(OpenOrdersContainer, {props: {}});

describe('OpenOrders', () => {
  it('should show empty cta when there are no open orders', async () => {
    const promises = new ResponseBuilder().getOpenOrders([]).build();

    const result = await render()
      .resolve(promises)
      .inspect({emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA)});

    expect(result).toEqual({
      emptyCtaVisible: true,
      api: [{getOpenOrders: undefined}],
    });
  });

  it('should show open orders that are without profit targets', async () => {
    const promises = new ResponseBuilder().getOpenOrders([buildOrder(), buildOrder()]).build();

    const result = await render()
      .resolve(promises)
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCount: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
      });

    expect(result).toEqual({
      api: [{getOpenOrders: undefined}],
      emptyCtaVisible: false,
      orderRowCount: 2,
    });
  });

  it('should show a profit order that is in action', async () => {
    const promises = new ResponseBuilder()
      .getOpenOrders([buildOrder({text: 'stop price reached\nprofit-target'})])
      .build();

    const result = await render()
      .resolve(promises)
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCount: countOf(OPEN_ORDERS_CONTAINER.PROFIT_ORDER_IN_ACTION),
      });

    expect(result).toEqual({
      api: [{getOpenOrders: undefined}],
      emptyCtaVisible: false,
      orderRowCount: 1,
    });
  });

  it('should cancel an open order', async () => {
    const orderID1 = 'OrderID1';
    const {getOpenOrders, orderCancel} = new ResponseBuilder()
      .getOpenOrders([buildOrder({orderID: orderID1}), buildOrder()])
      .orderCancel({orderID: [orderID1]})
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .press(`${OPEN_ORDERS_CONTAINER.CANCEL}.${orderID1}`)
      .press(GLOBAL.MODAL_CONFIRM)
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .resolve({orderCancel})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
      });

    expect(result).toEqual({
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/CANCEL_ORDER/pending',
        'orders/CANCEL_ORDER/fulfilled',
      ],
      api: [{getOpenOrders: undefined}, {orderCancel: {orderID: ['OrderID1']}}],
      emptyCtaVisible: false,
      orderRowCountBefore: 2,
      orderRowCountAfter: 1,
    });
  });

  it('should cancel all orders', async () => {
    const orderID1 = 'OrderID1';
    const profitOrderID1 = 'ProfitOrderID1';

    const {getOpenOrders, orderCancelAll} = new ResponseBuilder()
      .getOpenOrders([
        buildOrder({orderID: orderID1}),
        builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderID1}),
      ])
      .orderCancelAll()
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .press(OPEN_ORDERS_CONTAINER.CANCEL_ALL)
      .press(GLOBAL.MODAL_CONFIRM)
      .resolve({orderCancelAll})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
        orders: getState('orders'),
      });

    expect(result).toEqual({
      api: [{getOpenOrders: undefined}, {orderCancelAll: undefined}],
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/CANCEL_ALL_ORDERS/pending',
        'orders/CANCEL_ALL_ORDERS/fulfilled',
      ],
      emptyCtaVisible: true,
      orderRowCountBefore: 1,
      orderRowCountAfter: 0,
      orders: {openOrders: [], ordersError: '', profitOrders: [], ordersLoading: false, profitOrdersInAction: []},
    });
  });

  it('should cancel profit order of one of the open order`s', async () => {
    const orderID1 = 'OrderID1';
    const profitOrderID1 = 'ProfitOrderID1';

    const order = buildOrder({orderID: orderID1});

    const {getOpenOrders, orderCancel} = new ResponseBuilder()
      .getOpenOrders([order, builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderID1})])
      .orderCancel({orderID: profitOrderID1})
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .press(OPEN_ORDERS_CONTAINER.SHOW_PROFIT_ORDERS)
      .press(OPEN_ORDERS_CONTAINER.CANCEL_PROFIT)
      .press(GLOBAL.MODAL_CONFIRM)
      .resolve({orderCancel})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
        orders: getState('orders'),
      });

    expect(result).toEqual({
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/REMOVE_PROFIT_ORDER/pending',
        'orders/REMOVE_PROFIT_ORDER/fulfilled',
      ],
      api: [{getOpenOrders: undefined}, {orderCancel: {orderID: 'ProfitOrderID1'}}],
      emptyCtaVisible: false,
      orderRowCountAfter: 1,
      orderRowCountBefore: 1,
      orders: {
        openOrders: [order],
        ordersError: '',
        profitOrders: [],
        ordersLoading: false,
        profitOrdersInAction: [],
      },
    });
  });

  it('should cancel all profit orders of one of the open order`s', async () => {
    const orderID1 = 'OrderID1';
    const profitOrderIDs = ['ProfitOrderID1', 'ProfitOrderID2', 'ProfitOrderID3'];

    const order = buildOrder({orderID: orderID1});

    const {getOpenOrders, orderCancel} = new ResponseBuilder()
      .getOpenOrders([
        order,
        builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderIDs[0]}),
        builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderIDs[1]}),
        builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderIDs[2]}),
      ])
      .orderCancel({orderID: profitOrderIDs})
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .press(OPEN_ORDERS_CONTAINER.SHOW_PROFIT_ORDERS)
      .press(OPEN_ORDERS_CONTAINER.CANCEL_ALL_PROFIT)
      .press(GLOBAL.MODAL_CONFIRM)
      .resolve({orderCancel})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
        orders: getState('orders'),
      });

    expect(result).toEqual({
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/CANCEL_ALL_PROFIT_ORDERS/pending',
        'orders/CANCEL_ALL_PROFIT_ORDERS/fulfilled',
      ],
      api: [{getOpenOrders: undefined}, {orderCancel: {orderID: profitOrderIDs}}],
      emptyCtaVisible: false,
      orderRowCountAfter: 1,
      orderRowCountBefore: 1,
      orders: {
        openOrders: [order],
        ordersError: '',
        profitOrders: [],
        ordersLoading: false,
        profitOrdersInAction: [],
      },
    });
  });

  it('should cancel an open order with its profit targets', async () => {
    const orderID1 = 'OrderID1';
    const profitOrderID1 = 'ProfitOrderID1';
    const {getOpenOrders, orderCancel} = new ResponseBuilder()
      .getOpenOrders([
        buildOrder({orderID: orderID1}),
        builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderID1}),
      ])
      .orderCancel({orderID: [orderID1, profitOrderID1]})
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .press(`${OPEN_ORDERS_CONTAINER.CANCEL}.${orderID1}`)
      .press(GLOBAL.MODAL_CONFIRM)
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .resolve({orderCancel})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
        orders: getState('orders'),
      });

    expect(result).toEqual({
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/CANCEL_ORDER/pending',
        'orders/CANCEL_ORDER/fulfilled',
      ],
      api: [{getOpenOrders: undefined}, {orderCancel: {orderID: ['OrderID1', 'ProfitOrderID1']}}],
      emptyCtaVisible: true,
      orderRowCountAfter: 0,
      orderRowCountBefore: 1,
      orders: {openOrders: [], ordersError: '', profitOrders: [], ordersLoading: false, profitOrdersInAction: []},
    });
  });

  it('should add a profit order', async () => {
    // TODO: very confusing to test profit orders because of stopPx, stop, price, FIX THIS
    const orderID1 = 'OrderID1';

    const order = buildOrder({
      orderID: orderID1,
      price: 5000,
      orderQty: 500,
      side: SIDE.SELL,
      symbol: SYMBOL.XBTUSD,
    });
    const {getOpenOrders, profitTargetOrder} = new ResponseBuilder()
      .getOpenOrders([order])
      .profitTargetOrder({
        orderID: orderID1,
        side: SIDE.SELL,
        symbol: SYMBOL.XBTUSD,
        stop: 5000,
        price: 3333,
        orderQty: 500,
      })
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .press(OPEN_ORDERS_CONTAINER.ADD_PROFIT)
      .inputText(ADD_ORDER_MODAL.PRICE, 3333)
      .inputText(ADD_ORDER_MODAL.QUANTITY, 500)
      .press(GLOBAL.MODAL_CONFIRM)
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .resolve({profitTargetOrder})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
        orders: getState('orders'),
      });

    expect(result).toEqual({
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/ADD_PROFIT_ORDER/pending',
        'orders/ADD_PROFIT_ORDER/fulfilled',
      ],
      api: [
        {getOpenOrders: undefined},
        {
          profitTargetOrder: {
            orderID: 'OrderID1',
            orderQty: 500,
            price: 3333,
            side: 'Sell',
            stop: 5000,
            symbol: 'XBTUSD',
          },
        },
      ],
      emptyCtaVisible: false,
      orderRowCountAfter: 1,
      orderRowCountBefore: 1,
      orders: {
        openOrders: [order],
        ordersError: '',
        ordersLoading: false,
        profitOrdersInAction: [],
        profitOrders: [
          {
            ordType: 'StopLimit',
            orderID: '2323',
            orderQty: 500,
            price: 3333,
            side: 'Buy',
            stopPx: 5000,
            symbol: 'XBTUSD',
            text: 'profit-target.OrderID1',
            timestamp: '0',
          },
        ],
      },
    });
  });

  it('should add a profit order through profit targets popup', async () => {
    const orderID1 = 'OrderID1';
    const profitOrderID1 = 'ProfitOrderID1';

    const order = buildOrder({
      orderID: orderID1,
      price: 5000,
      orderQty: 500,
      side: SIDE.SELL,
      symbol: SYMBOL.XBTUSD,
    });

    const profitOrder = builderProfitOrder({orderID: orderID1, profitOrderID: profitOrderID1});

    const {getOpenOrders, profitTargetOrder} = new ResponseBuilder()
      .getOpenOrders([order, profitOrder])
      .profitTargetOrder({
        orderID: orderID1,
        side: SIDE.SELL,
        symbol: SYMBOL.XBTUSD,
        stop: 5000,
        price: 3333,
        orderQty: 500,
      })
      .build();

    const result = await render()
      .resolve({getOpenOrders})
      .inspect({orderRowCountBefore: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW)})
      .press(OPEN_ORDERS_CONTAINER.SHOW_PROFIT_ORDERS)
      .press(OPEN_ORDERS_CONTAINER.ADD_PROFIT)
      .inputText(ADD_ORDER_MODAL.PRICE, 3333)
      .inputText(ADD_ORDER_MODAL.QUANTITY, 500)
      .press(GLOBAL.MODAL_CONFIRM)
      .resolve({profitTargetOrder})
      .inspect({
        emptyCtaVisible: exists(OPEN_ORDERS_CONTAINER.EMPTY_CTA),
        orderRowCountAfter: countOf(OPEN_ORDERS_CONTAINER.ORDER_ROW),
        actions: storeActions(),
        orders: getState('orders'),
      });

    expect(result).toEqual({
      actions: [
        'orders/GET_OPEN_ORDERS/pending',
        'orders/GET_OPEN_ORDERS/fulfilled',
        'orders/ADD_PROFIT_ORDER/pending',
        'orders/ADD_PROFIT_ORDER/fulfilled',
      ],
      api: [
        {getOpenOrders: undefined},
        {
          profitTargetOrder: {
            orderID: 'OrderID1',
            orderQty: 500,
            price: 3333,
            side: 'Sell',
            stop: 5000,
            symbol: 'XBTUSD',
          },
        },
      ],
      emptyCtaVisible: false,
      orderRowCountAfter: 1,
      orderRowCountBefore: 1,
      orders: {
        openOrders: [order],
        ordersError: '',
        ordersLoading: false,
        profitOrdersInAction: [],
        profitOrders: [
          profitOrder,
          {
            ordType: 'StopLimit',
            orderID: '2323',
            orderQty: 500,
            price: 3333,
            side: 'Buy',
            stopPx: 5000,
            symbol: 'XBTUSD',
            text: 'profit-target.OrderID1',
            timestamp: '0',
          },
        ],
      },
    });
  });
});
