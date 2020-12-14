import React, {useState} from 'react';
import {Collapse, Container, Fade, Grid} from '@material-ui/core';
import styles from './styles.module.scss';
import {MAIN_CONTAINER} from '../../data-test-ids';

export interface MainContainerProps {
  children: React.ReactNode;
  label: string;
  description?: string;
  renderOutside?: React.ReactNode;
  connected?: boolean;
}

export const MainContainer = React.memo((props: MainContainerProps) => {
  const {children, label, description = '', renderOutside, connected = true} = props;

  const [isViewMaximized, setViewMaximized] = useState<boolean>(true);

  const maximizeContainer = React.useCallback(() => setViewMaximized(!isViewMaximized), [isViewMaximized]);

  const cornerButton = () => (
    <div className={styles.div_corner} key={label}>
      <div
        data-test-id={MAIN_CONTAINER.CORNER_BUTTON}
        className={styles.div_corner__button}
        onClick={maximizeContainer}
      />
    </div>
  );

  return (
    <div className={!connected ? styles.dim : undefined}>
      <Container data-testid={label} fixed maxWidth="sm" className={styles.container_scaled} style={{padding: '0px'}}>
        <div className={styles.container__row__minimized} data-test-id={MAIN_CONTAINER.MIN_VIEW}>
          {cornerButton()}
          <div className={styles.container_minimized_text}>
            <span>{label}</span>
            <Fade in={!isViewMaximized}>
              <span className={styles.description}>{description}</span>
            </Fade>
          </div>
        </div>
        <Collapse in={isViewMaximized}>
          <Grid
            item
            xs
            container
            direction="row"
            style={{paddingBottom: '10px'}}
            data-test-id={MAIN_CONTAINER.MAX_VIEW}
          >
            <Grid item container xs style={{paddingRight: '5px', paddingLeft: '20px'}}>
              <Grid container spacing={2} justify="center" alignItems="center">
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Container>
      {isViewMaximized ? renderOutside : null}
    </div>
  );
});
