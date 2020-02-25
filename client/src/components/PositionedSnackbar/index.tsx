import React, { useState, useEffect } from "react";
// REDUX
import { orderErrorSelector, previewMessageSelector } from "redux/selectors";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "redux/models/state";
// COMPONENTS
import Snackbar from "@material-ui/core/Snackbar";
// STYLES
import cx from "classnames";
import styles from "./styles.module.css";
// UTILS
import { SVGIcon } from "../";
import ICONS from "../SVGIcon/icons";

export const PositionedSnackbar = React.memo(() => {
  const { orderError, preview_message } = useSelector(
    (state: AppState) => ({
      orderError: orderErrorSelector(state),
      preview_message: previewMessageSelector(state)
    }),
    shallowEqual
  );

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  let snackbar_style = cx({
    [styles.error_snackbar]: type === "error",
    [styles.success_snackbar]: type === "success",
    [styles.snackbar_none]: type === ""
  });

  function Bar() {
    console.log("BAR TYPE", type);
    return (
      <div className={snackbar_style}>
        {type === "error" && <SVGIcon color="pink" icon={ICONS.ERROR} />}
        {type === "success" && <SVGIcon color="green" icon={ICONS.SUCCESS} />}

        <span className={styles.snackbar_text}>{message}</span>
      </div>
    );
  }

  useEffect(() => {
    if (orderError !== "") {
      setMessage(orderError);
      setType("error");
      setOpen(true);
    } else if (preview_message !== "") {
      setMessage(preview_message);
      setType("success");
      setOpen(true);
    }
  }, [orderError, preview_message]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
      style={{ top: "10px" }}
    >
      <Bar />
    </Snackbar>
  );
});
