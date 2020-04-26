import React from "react";

interface Props {
  icon: string;
  size?: string;
  color: string;
}

const SVGIcon = ({ icon, size = "22", color = "color" }: Props) => {
  const styles = {
    svg: {
      verticalAlign: "middle",
    },
    path: {
      fill: color,
    },
    root: {
      display: "inline",
      justify: "middle",
      padding: "7px 0",
      marginRight: "12px",
    },
  };

  return (
    <div style={styles.root}>
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
