import React, { useState } from "react";
// COMPONENTS
import { Container, Grid } from "@material-ui/core";
// STYLES
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  label: string;
}

export const MainContainer = React.memo(({ children, label }: Props) => {
  const [minimized, setMinimized] = useState(false);

  const cornerButton = (
    <div className={styles.div_corner} key={label}>
      <div
        className={styles.div_corner__button}
        onClick={() => setMinimized(!minimized)}
      />
    </div>
  );
  return (
    <Container
      fixed
      maxWidth="sm"
      className={styles.container_scaled}
      style={{ padding: "0px" }}
    >
      {!minimized ? (
        <Grid
          item
          xs
          container
          direction="row"
          style={{ paddingBottom: "10px" }}
        >
          <Grid item>{cornerButton}</Grid>
          <Grid
            item
            container
            xs
            style={{ paddingRight: "20px", paddingTop: "5px" }}
          >
            {children}
          </Grid>
        </Grid>
      ) : (
        <div className={styles.container__row__minimized}>
          <div className={styles.div_corner}>
            <div
              className={styles.div_corner__button}
              onClick={() => setMinimized(!minimized)}
            />
          </div>

          <div style={{ color: "white" }}>{label}</div>
        </div>
      )}
    </Container>
  );
});
