import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { getBalanceSuccess } from "../redux/modules/preview/preview";
import { ordersRiskPercSelector, balanceSelector } from "../redux/selectors";
// import configureStore from "redux-mock-store";
import OrdersPreviewTable from "../components/OrdersPreviewTable";

const initialState = {
  preview: {
    orders: {
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
      stop: {
        symbol: "XBTUSD",
        stopPx: 8000,
        orderQty: 498
      }
    },
    balance: 2560000,
    error: "",
    showPreview: true,
    loading: false
  },
  websocket: {}
};

const render = () =>
  mount(
    <Provider store={store}>
      <OrdersPreviewTable />
    </Provider>
  );
describe("balance risk", () => {
  it("should update store with getBalanceSuccess() action", () => {
    // const component = render();
    const { balance } = initialState.preview;

    store.dispatch(getBalanceSuccess(balance));
    expect(store.getState().preview.balance).toEqual(balance);
  });

  it("should calculate balance correctly", () => {
    const balance2 = balanceSelector(initialState);
    expect(balance2).toEqual(0.0256);
  });

  it("should calculate risk percentage correctly", () => {
    const riskPerc2 = ordersRiskPercSelector(initialState);
    expect(riskPerc2).toEqual(12.81);
  });
});
