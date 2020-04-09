import React from "react";
// COMPONENTS
import { SVGIcon } from "../";
import ICONS from "../SVGIcon/icons";

// STYLES
import styles from "./styles.module.css";
import cx from "classnames";

export interface Props {
  notificationType: string; //"error" | "success" | "warning" | "";
  message: string;
}

const NotificationBar = React.memo(({ notificationType, message }: Props) => {
  let snackbar_style = cx({
    [styles.error_snackbar]: notificationType === "error",
    [styles.success_snackbar]: notificationType === "success",
    [styles.warning_snackbar]: notificationType === "warning",
    [styles.snackbar_none]: notificationType === ""
  });

  //custom render icon switch case return function
  return (
    <div className={snackbar_style}>
      {notificationType === "error" && (
        <SVGIcon color="pink" icon={ICONS.ERROR} />
      )}
      {notificationType === "success" && (
        <SVGIcon color="green" icon={ICONS.SUCCESS} />
      )}
      {notificationType === "warning" && (
        <SVGIcon color="orange" icon={ICONS.WARNING} />
      )}

      <span className={styles.snackbar_text}>{message}</span>
    </div>
  );
});

export { NotificationBar };
