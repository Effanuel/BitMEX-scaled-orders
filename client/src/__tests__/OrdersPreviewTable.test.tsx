import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import configureStore from "redux-mock-store";
import OrdersPreviewTable from "../components/OrdersPreviewTable";

import { previewOrders } from "../redux/modules/preview/preview";

const stop = {
  execInst: "LastPrice,ReduceOnly",
  ordType: "Stop",
  orderQty: 500,
  side: "Buy",
  stopPx: 8000,
  symbol: "XBTUSD",
  text: "stop_1"
};

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
      orderQty: 168,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: stop
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
      orderQty: 54,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: stop
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
      orderQty: 39,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: stop
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
      orderQty: 288,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order_3"
    }
  ],
  stop: stop
};

const distributionParams = (distribution: string): object => {
  return {
    quantity: 500,
    n_tp: 3,
    start: 7500,
    end: 7700,
    stop: "8000",
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
describe("genrating orders", () => {
  it("should generate all distributions correctly", () => {
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
  });

  it("has to have a stop with specific parameters", () => {
    expect(store.getState().preview.orders.stop.execInst).toEqual(
      "LastPrice,ReduceOnly"
    );
  });
});

// jest.mock("axios");
// const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0));
// const onSearchMock = jest.fn();
// const render = () =>
//   mount(
//     <Provider store={store()}>
//       <SearchContainer onChange={onSearchMock} />
//     </Provider>
//   );

// const cards = {
//   data: {
//     data: [
//       {
//         _id: 0,
//         name: "Email",
//         login: "gmail.com",
//         password: "112h31h2h34b2-2b342b342-b234b2"
//       },
//       {
//         _id: 1,
//         name: "Social",
//         login: "facebook.com",
//         password: "be2341234b2-2wbeqwbeqwbe42-4m674m6ub2"
//       },
//       {
//         _id: 2,
//         name: "Games",
//         login: "steam.com",
//         password: "n4b24b2345234b2-m3gm32-1231434b2"
//       }
//     ]
//   }
// };

// test("should render loading followed by cards", async () => {
//   axios.get.mockReturnValue(new Promise(resolve => resolve(cards)));
//   const component = render();

//   // Check loading
//   expect(component.find(Loader).prop("loading")).toBe(true);
//   expect(component.find(Card).exists()).toBe(false);

//   await flushAllPromises();
//   component.update();
//   // Check if its not loading and cards are rendered
//   expect(component.find(Loader).prop("loading")).toBe(false);
//   expect(component.find(Card).exists()).toBe(true);
//   component.find(Card).forEach((node, i) => {
//     expect(node.prop("name")).toBe(cards.data.data[i].name);
//   });

//   // const event = {
//   //   target: { value: "bqwbeqwbeqweqwveqwvqwe" }
//   // };
//   // const input = component.find(SearchBarContainer);

//   // input.simulate("change", event);
//   // input.update();

//   // component.update();
//   // expect(component.find(Card).exists()).toBe(false);

//   // component.find(Card).forEach((node, i) => {
//   //   expect(node.prop("name")).toBe("Social");
//   // });

//   // component.instance().setState({ copied: 2 });
//   // component.update();
//   // expect(input.props.placeholder).toEqual("Search...");
//   // // component.find(SearchContainer).setState({ filtered: [{ name: "OK" }] });
//   // // expect(input.props().placeholder).toBe("Search...");
//   // // expect(component.state().filtered).toEqual(["Email"]);

//   // // expect(component.find(SearchBarContainer).simulate("change", event));
//   // // expect(onSearchMock).toBeCalledWith("email");
// });
