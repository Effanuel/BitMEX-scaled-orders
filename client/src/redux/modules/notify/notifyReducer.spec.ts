import { MESSAGE, CLEAR } from "./types";
import { notifyReducer } from "./index";

describe("notifyReducer", () => {
  let initialMockState: any;

  beforeEach(() => {
    initialMockState = {
      message: "",
      type: "",
    };
  });

  it("should return initial state", () => {
    expect(notifyReducer(undefined, {} as any)).toEqual(initialMockState);
  });

  it("should override state on MESSAGE", () => {
    initialMockState = { message: "world", type: "world123" };

    const expectedPayload = { message: "hello", type: "testType" };
    expect(
      notifyReducer(initialMockState, {
        type: MESSAGE,
        payload: expectedPayload,
      })
    ).toEqual(expectedPayload);
  });

  it("should set to initialState on CLEAR", () => {
    expect(
      notifyReducer(initialMockState, {
        type: CLEAR,
      })
    ).toEqual(initialMockState);
  });
});
