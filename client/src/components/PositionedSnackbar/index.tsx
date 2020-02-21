import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { orderErrorSelector } from "../../redux/selectors";
import { shallowEqual, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./styles.module.css";
import { SVGIcon } from "../";
import ICONS from "../SVGIcon/icons";

function PositionedSnackbar() {
  const { orderError } = useSelector(
    (state: any) => ({
      orderError: orderErrorSelector(state),
      message: state.preview.message
    }),
    shallowEqual
  );

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  let snackbar_style = cx({
    [styles.error_snackbar]: type === "error",
    [styles.success_snackbar]: type === "success"
  });

  function Bar() {
    return (
      <div className={snackbar_style}>
        {type === "error" && <SVGIcon icon={ICONS.ERROR} />}
        {type === "success" && <SVGIcon color="green" icon={ICONS.SUCCESS} />}

        <span className={styles.snackbar_text}>{message}</span>
      </div>
    );
  }

  useEffect(() => {
    if (orderError) {
      setMessage(orderError);
      setType("error");
      setOpen(true);
    }
  }, [orderError]);

  useEffect(() => {
    if (message) {
      setMessage(message);
      setType("success");
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      style={{ top: "10px" }}
    >
      <Bar />
    </Snackbar>
  );
}
export { PositionedSnackbar };
