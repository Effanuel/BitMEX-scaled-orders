import React, { useState, useEffect } from "react";
// REDUX
import { clearNotifications } from "redux/modules/notify";
// import { orderErrorSelector } from "redux/selectors";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { AppState } from "redux/models/state";
// COMPONENTS
import Snackbar from "@material-ui/core/Snackbar";
import { NotificationBar } from "../";

const initialState = Object.freeze({
  open: false,
  message: "",
  type: ""
});

export const PositionedSnackbar = React.memo(() => {
  const [state, setState] = useState(initialState);
  const { open, message, type } = state;
  //REDUX
  const dispatch = useDispatch();
  const { not_type, notification } = useSelector(
    (state: AppState) => ({
      // orderError: orderErrorSelector(state),
      notification: state.notify.message,
      not_type: state.notify.type
    }),
    shallowEqual
  );
  // ====

  // const [open, setOpen] = useState(false);
  // const [message, setMessage] = useState("");
  // const [type, setType] = useState("");

  // useEffect(() => {
  //   if (orderError !== "") {
  //     setMessage(orderError);
  //     setType("error");
  //     setOpen(true);
  //   }
  // }, [orderError]);
  useEffect(() => {
    if (notification) {
      setState(prevState => ({
        ...prevState,
        open: true,
        message: notification,
        type: not_type
      }));
      // setMessage(notification);
      // setType(not_type);
      // setOpen(true);
    }
  }, [notification, not_type]);

  // useEffect(() => {
  //   if (orderMessage.from !== "") {
  //     setMessage(orderMessage.from);
  //     setType(orderMessage.type);
  //     setOpen(true);
  //   }
  // }, [orderMessage]);

  const handleClose = () => {
    setState(prevState => ({
      ...prevState,
      open: false
    }));
    // setOpen(false);
    dispatch(clearNotifications());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
      style={{ top: "10px" }}
    >
      <NotificationBar notificationType={type} message={message} />
    </Snackbar>
  );
});
