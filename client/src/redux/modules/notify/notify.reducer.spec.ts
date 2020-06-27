import { MESSAGE, NotifyState, NotifyType } from "./types";
import { notifyReducer, clearNotifications } from "./index";

describe("notifyReducer", () => {
  let initialMockState: NotifyState;

  beforeEach(() => {
    initialMockState = {
      message: "",
      type: NotifyType.None,
    };
  });

  it("should return initial state", () => {
    expect(notifyReducer(undefined, {} as any)).toEqual(initialMockState);
  });

  it("should override state on MESSAGE", () => {
    const expectedPayload = { message: "hello", type: NotifyType.success };

    initialMockState = { message: "world", type: NotifyType.success };
    const result = notifyReducer(initialMockState, {
      type: MESSAGE,
      payload: expectedPayload,
    });

    expect(result).toEqual(expectedPayload);
  });

  it("should set to initialState on CLEAR", () => {
    const result = notifyReducer(initialMockState, clearNotifications());
    expect(result).toEqual(initialMockState);
  });
});
