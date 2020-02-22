import React from "react";
// STYLES
import cx from "classnames";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  variant?: "submit" | "text";
  disabled?: boolean;
  onClick: (event: any) => void;
}

function Button({ variant = "submit", children, disabled, onClick }: Props) {
  const buttonStyle = cx({
    [styles.button]: variant === "submit",
    [styles.text_button]: variant === "text"
  });
  return (
    <button className={buttonStyle} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
