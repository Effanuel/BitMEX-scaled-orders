import React from "react";

// const getViewBox = (name:any) => {
//   switch (name) {
//     case "phone":
//       return "0 0 32 33";
//     case "message":
//       return "0 0 38 34";
//     case "envelope":
//       return "0 0 40 26";
//     case "trash":
//       return "0 0 13.5 17.5";
//     case "wifi":
//       return "0 0 12 9";
//     default:
//       return "0 0 24 24";
//   }
// };


const SVGIcon = ({
  icon,
  name = "",
  style = {},
  viewBox = "",
  className = "",
  size = '22',
  color = 'color',
  ...otherProps
}:any) => {

const styles = {
    svg: {
      verticalAlign: 'middle'
    },
    path: {
      fill: color,
    },
  };

const styles2 = {
  root: {
    display: 'inline',
    justify: 'middle',
    padding: '7px 0',
    marginRight: '12px'
  }
}

return (
  <div style={styles2.root}>
      <svg
      width={`${size}px`}
      height={`${size}px`}
      style={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...otherProps}
    >
      <path style={styles.path} d={icon} />
    </svg>
  </div>
  )

};

export { SVGIcon} ;
//Thanks to nishanbajracharya for this code
