import React, { ReactElement } from "react";

import cx from "classnames";
import styles from "./styles.module.css";
interface Props {
  label: string;
}

function Button({
  variant = "submit",
  children,
  ...otherProps
}: any): ReactElement {
  const buttonStyle = cx({
    [styles.button]: variant === "submit",
    [styles.text_button]: variant === "text"
  });
  return (
    <button className={buttonStyle} {...otherProps}>
      {children}
    </button>
  );
}

export { Button };
