import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import configureStore from "redux-mock-store";
import OrdersPreviewTable from "../components/OrdersPreviewTable";

import { previewOrders } from "../redux/actions/previewActions";

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
test("should calculate orders from params", () => {
  const orderParams = {
    quantity: 100,
    n_tp: 2,
    start: 7500,
    end: 7700,
    distribution: "Uniform",
    side: "Sell",
    symbol: "XBTUSD"
  };
  const orders = [
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 50,
      price: 7500,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order"
    },
    {
      execInst: "ParticipateDoNotInitiate",
      ordType: "Limit",
      orderQty: 50,
      price: 7700,
      side: "Sell",
      symbol: "XBTUSD",
      text: "order"
    }
  ];

  const component = render();
  expect(store.getState().preview.showPreview).toEqual(false);

  store.dispatch(previewOrders(orderParams));

  expect(store.getState().preview.orders).toEqual(orders);
  expect(store.getState().preview.showPreview).toEqual(true);
  // component.update();

  // expect(store.getState()).toBe(22);

  // expect(component.find(OrdersPreviewTable).props()).toBe(10);
});

// const initialState = {
//   preview: {
//     orders: [
//       {
//         symbol: 'XBTUSD',
//         side: 'Sell',
//         orderQty: 350,
//         price: 12000,
//         ordType: 'Limit',
//         execInst: 'ParticipateDoNotInitiate',
//         text: 'order'
//       },
//       {
//         symbol: 'XBTUSD',
//         side: 'Sell',
//         orderQty: 350,
//         price: 12500,
//         ordType: 'Limit',
//         execInst: 'ParticipateDoNotInitiate',
//         text: 'order'
//       }
//     ],
//     1tribution: 'Uniform',
//     side: '',
//     error: '',
//     showPreview: false,
//     currentPrice: null,
//     instrument: 'XBTUSD'
//   }
// }; // here it
