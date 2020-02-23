import React from "react";
// STYLES
import cx from "classnames";
import styles from "./styles.module.css";

interface Props {
  id?: string;
  children: React.ReactNode;
  variant?: "submit" | "text" | "custom";
  disabled?: boolean;
  onClick: (event: any) => void;
  style?: any;
  className?: any;
}

function Button({
  id,
  variant = "submit",
  children,
  disabled,
  onClick,
  style,
  className = ""
}: Props) {
  const buttonStyle = cx({
    [styles.button]: variant === "submit",
    [styles.text_button]: variant === "text",
    [className]: variant === "custom"
  });
  return (
    <button
      id={id}
      className={buttonStyle}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
