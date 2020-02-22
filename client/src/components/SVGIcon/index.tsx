import React from "react";

interface Props {
  icon: string;
  name?: string;
  style?: any;
  viewBox?: any;
  className?: any;
  size?: string;
  color?: string;
}

const SVGIcon = ({
  icon,
  name = "",
  style = {},
  viewBox = "",
  className = "",
  size = "22",
  color = "color"
}: Props) => {
  const styles = {
    svg: {
      verticalAlign: "middle"
    },
    path: {
      fill: color
    }
  };

  const styles2 = {
    root: {
      display: "inline",
      justify: "middle",
      padding: "7px 0",
      marginRight: "12px"
    }
  };

  return (
    <div style={styles2.root}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        style={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path style={styles.path} d={icon} />
      </svg>
    </div>
  );
};

export { SVGIcon };
//Thanks to nishanbajracharya for this code
