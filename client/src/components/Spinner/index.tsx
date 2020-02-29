import React from "react";
// COMPONENTS
import LinearProgress from "@material-ui/core/LinearProgress";
// STYLES
import { withStyles } from "@material-ui/core/styles";

const ColorLinearProgress = withStyles({
  root: {
    height: "5px",
    width: "600px",
    margin: "0 auto"
  },
  colorPrimary: {
    backgroundColor: "#b2dfdb"
  },
  barColorPrimary: {
    backgroundColor: "#4caf50"
  }
})(LinearProgress);

interface Props {
  loading: boolean;
}
function SpinnerComponent({ loading }: Props) {
  return (
    <>
      {loading ? (
        <ColorLinearProgress />
      ) : (
        <div style={{ height: "5px" }}></div>
      )}
    </>
  );
  // return <CircularProgress size={20} className={styles.spinner} />;
}

export { SpinnerComponent };
