import React, {useState} from 'react';
import {Container, Grid} from '@material-ui/core';

import styles from './styles.module.css';
import {MAIN_CONTAINER} from '../../data-test-ids';

export interface Props {
  children: React.ReactNode;
  label: string;
}

export const MainContainer = React.memo(({children, label}: Props) => {
  const [maximized, setMaximized] = useState(true);

  const cornerButton = (
    <div className={styles.div_corner} key={label}>
      <div
        data-test-id={MAIN_CONTAINER.CORNER_BUTTON}
        className={styles.div_corner__button}
        onClick={() => setMaximized(!maximized)}
      />
    </div>
  );

  function maximizedView() {
    return (
      <Grid item xs container direction="row" style={{paddingBottom: '10px'}} data-test-id={MAIN_CONTAINER.MAX_VIEW}>
        <Grid item>{cornerButton}</Grid>
        <Grid item container xs style={{paddingRight: '20px', paddingTop: '5px'}}>
          <Grid container spacing={2} justify="center" alignItems="center">
            {children}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function minimizedView() {
    return (
      <div className={styles.container__row__minimized} data-test-id={MAIN_CONTAINER.MIN_VIEW}>
        {cornerButton}
        <div style={{color: 'white'}}>{label}</div>
      </div>
    );
  }

  return (
    <Container fixed maxWidth="sm" className={styles.container_scaled} style={{padding: '0px'}}>
      {maximized ? maximizedView() : minimizedView()}
    </Container>
  );
});
