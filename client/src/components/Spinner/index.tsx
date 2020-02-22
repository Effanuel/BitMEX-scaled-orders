import React from "react";
// COMPONENTS
import CircularProgress from "@material-ui/core/CircularProgress";
// STYLES
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  spinner: {
    "& .MuiCircularProgress-svg": {
      color: "green"
    }
  }
}));

function SpinnerComponent() {
  const styles = useStyles();

  return <CircularProgress size={20} className={styles.spinner} />;
}

export { SpinnerComponent };
