import * as types from "../redux/actions/actionTypes";
import * as actions from "../redux/actions/previewActions";

describe("success actions", () => {
  it("should create an action to post success status", () => {
    const payload = { success: 200 };
    const expectedAction = {
      type: types.POST_ORDER_SUCCESS,
      payload: payload.success
    };

    expect(actions.postOrderSuccess(payload)).toEqual(expectedAction);
  });
});

describe("success actions", () => {
  it("should create an action to preview current price", () => {
    const payload = { currentPrice: 10000 };
    const expectedAction = {
      type: types.PREVIEW_PRICE_SUCCESS,
      payload: payload.currentPrice
    };
    expect(actions.previewPriceSuccess(payload)).toEqual(expectedAction);
  });
});

export const previewOrders = pay => {
  const payload = orderBulk(pay);

  return {
    type: PREVIEW_ORDERS_SUCCESS,
    payload
  };
};

describe("actions", () => {
  it("should create an action to preview orders table", () => {
    const payload = {
      quantity: 700,
      n_tp: 2,
      start: 12000,
      end: 12500,
      side: "Sell",
      distribution: "Uniform"
    };
    const expectedPayload = {
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
      ]
    };
    const expectedAction = {
      type: types.PREVIEW_ORDERS_SUCCESS,
      payload: expectedPayload
    };
    expect(actions.previewOrders(payload)).toEqual(expectedAction);
  });
});
