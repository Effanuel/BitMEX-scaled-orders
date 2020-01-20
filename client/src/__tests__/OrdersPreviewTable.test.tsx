import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import configureStore from "redux-mock-store";
import OrdersPreviewTable from "../components/OrdersPreviewTable";

import { previewOrders } from "../redux/actions/previewActions";

const orders_uniform = {
  orders: [
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 166,
      price: 7500,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_1"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 166,
      price: 7600,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_2"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 166,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: {}
};

const orders_normal = {
  orders: [
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 53,
      price: 7500,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_1"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 393,
      price: 7600,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_2"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 53,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: {}
};

const orders_positive = {
  orders: [
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 287,
      price: 7500,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_1"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 174,
      price: 7600,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_2"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 38,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: {}
};

const orders_negative = {
  orders: [
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 38,
      price: 7500,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_1"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 174,
      price: 7600,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_2"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 287,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: {}
};

const distributionParams = (distribution: string): object => {
  return {
    quantity: 500,
    n_tp: 3,
    start: 7500,
    end: 7700,
    stop: "",
    distribution: distribution,
    side: "Sell",
    symbol: "XBTUSD"
  };
};

// jest.mock("react-redux", () => ({
//   connect: () => jest.fn(),
//   useSelector: jest.fn(fn => fn()),
//   useDispatch: () => jest.fn()
// }));
const render = () =>
  mount(
    <Provider store={store}>
      <OrdersPreviewTable />
    </Provider>
  );
test("should calculate different distributions from params", () => {
  // const component = render();
  expect(store.getState().preview.showPreview).toEqual(false);

  store.dispatch(previewOrders(distributionParams("Uniform")));
  expect(store.getState().preview.orders).toEqual(orders_uniform);

  store.dispatch(previewOrders(distributionParams("Normal")));
  expect(store.getState().preview.orders).toEqual(orders_normal);

  store.dispatch(previewOrders(distributionParams("Positive")));
  expect(store.getState().preview.orders).toEqual(orders_positive);

  store.dispatch(previewOrders(distributionParams("Negative")));
  expect(store.getState().preview.orders).toEqual(orders_negative);

  expect(store.getState().preview.showPreview).toEqual(true);
  // component.update();

  // expect(store.getState()).toBe(22);

  // expect(component.find(OrdersPreviewTable).props()).toBe(10);
});
