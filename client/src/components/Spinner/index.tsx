import React from "react";
// COMPONENTS
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  spinner: {
    "& .MuiCircularProgress-svg": {
      color: "green"
    }
  }
}));

function SpinnerComponent() {
  const styles = useStyles();

  return (
    // <Spinner animation="border" role="status" variant="success" size="sm">
    //   <span className="sr-only">Loading...</span>
    // </Spinner>
    <CircularProgress size={20} className={styles.spinner} />
  );
}

export { SpinnerComponent };
