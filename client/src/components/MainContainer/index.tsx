import React, { useState, useEffect } from "react";
import {  Row } from "react-bootstrap";
import styles from "./styles.module.css";
import cx from "classnames";
import {Container, Grid} from '@material-ui/core'

export const MainContainer = React.memo(({ children, label }: any) => {
  const [minimized, setMinimized] = useState(false);

  let containerClass = cx({
    [styles.container_scaled]: !minimized,
    [styles.container_minimized]: minimized
  });

  const cornerButton = (
    <div className={styles.div_corner} key={label}>
      <div
        className={styles.div_corner__button}
        onClick={() => setMinimized(!minimized)}
      />
    </div>
  );
  return (
    <Container fixed maxWidth='sm' style={{ borderRadius: '2px', backgroundColor: '#1e1e1e', border: '1px solid green', padding: '0px', marginBottom: '10px'}}>
      {!minimized ? (
        <Grid item xs container direction='row' style={{paddingBottom:'10px'}}>
          <Grid item>
            {cornerButton}
          </Grid>
          <Grid item container xs style={{paddingRight:'20px', paddingTop: '5px'}}>
            {children}
          </Grid>

         </Grid>
      ) : (
        <Row className={styles.container__row__minimized}>
          <div className={styles.div_corner}>
            <div
              className={styles.div_corner__button}
              onClick={() => setMinimized(!minimized)}
            />
          </div>

          <div style={{ color: "white" }}>{label}</div>
        </Row>
      )}
    </Container>
  );
});

