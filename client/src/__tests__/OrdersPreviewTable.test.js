import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { OrdersPreviewTable } from "../components";

// const onChange = jest.fn(),
//   props = {
//     instruments: ["XBTUSD", "ETHUSD", "LTCU19", "ABC_000"],
//     id: "instrument",
//     label: "Instrument",
//     onChange
//   };

describe("OrderPreviewTable component", () => {
  const initialState = {
    orders: [
      {
        symbol: "XBTUSD",
        side: "Sell",
        orderQty: 350,
        price: 12000,
        ordType: "Limit",
        execInst: "ParticipateDoNotInitiate",
        text: "order"
      },
      {
        symbol: "XBTUSD",
        side: "Sell",
        orderQty: 350,
        price: 12500,
        ordType: "Limit",
        execInst: "ParticipateDoNotInitiate",
        text: "order"
      }
    ],
    distribution: "Uniform",
    side: "",
    error: "",
    showPreview: false,
    currentPrice: null,
    instrument: "XBTUSD"
  }; // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();
  let component;
  let store;
  beforeEach(() => {
    //creates the store with any initial state or middleware needed
    store = mockStore(initialState);
    component = shallow(<OrdersPreviewTable store={store} />);
  });

  it("renders without crashing given redux store", () => {
    expect(component).toMatchSnapshot();
  });

  //   it("renders without crashing given redux store", () => {
  //     expect(component.find("tbody").length).toEqual(3);
  //   });
});
