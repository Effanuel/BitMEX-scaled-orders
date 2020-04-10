import { ORDER_ERROR, ORDER_SUCCESS } from "../modules/preview/types";
import { POST_ORDER_ERROR, POST_ORDER } from "../modules/best_price/types";
import { MESSAGE } from "../modules/notify/types";

interface notificationMessageType {
  message: string;
  type: string;
}

const notificationAction = ({ message, type }: notificationMessageType) => ({
  type: MESSAGE,
  payload: { message, type },
});

const notificationMessage = (action: any): notificationMessageType => {
  switch (action.type) {
    // Catching SUCCESS type actions
    case POST_ORDER:
    case ORDER_SUCCESS:
      const { success, text, from } = action.payload;
      const isOrderPlaced = success === 200 && !text.includes("Cancel");

      const { message, type } = isOrderPlaced
        ? { message: from, type: "success" }
        : { message: "Order cancelled", type: "warning" };

      return { message, type };
    // Catching ERROR type actions
    case POST_ORDER_ERROR:
    case ORDER_ERROR: {
      const { message, type } = action.payload;
      return { message, type };
    }
    default:
      return { message: "", type: "" };
  }
};

export default ({ dispatch }: any) => (next: any) => (action: any) => {
  const { message, type } = notificationMessage(action);
  if (message !== "") {
    dispatch(notificationAction({ message, type }));
  }

  next(action);
};
