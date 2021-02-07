import React, {useState} from 'react';
import {Collapse, Fade} from '@material-ui/core';
import styles from './styles.module.scss';
import {MAIN_CONTAINER} from '../../data-test-ids';
import {Grid, Box, Flex, Container} from '@chakra-ui/react';

export interface MainContainerProps {
  children: React.ReactNode | React.ReactNode[];
  label: string;
  description?: string;
  renderOutside?: React.ReactNode;
  connected?: boolean;
}

export const MainContainer = React.memo((props: MainContainerProps) => {
  const {children, label, description = '', renderOutside, connected = true} = props;

  const [isViewMaximized, setViewMaximized] = useState<boolean>(true);

  const maximizeContainer = React.useCallback(() => setViewMaximized(!isViewMaximized), [isViewMaximized]);

  return (
    // <div className={!connected ? styles.dim : undefined}>
    <Container data-testid={label} className={styles.container_scaled} p={0} maxW="660px">
      <Flex w="100%" className={styles.container__row__minimized} data-test-id={MAIN_CONTAINER.MIN_VIEW}>
        <Flex className={styles.div_corner} key={label}>
          <Flex
            data-testid={MAIN_CONTAINER.CORNER_BUTTON}
            className={styles.div_corner__button}
            onClick={maximizeContainer}
          />
        </Flex>
        <div className={styles.container_minimized_text}>
          <span>{label}</span>
          <Fade in={!isViewMaximized} data-testid={MAIN_CONTAINER.DESCRIPTION}>
            <span className={styles.description}>{description}</span>
          </Fade>
        </div>
      </Flex>
      {isViewMaximized
        ? React.Children.map(children, (child) => (
            <Grid display="flex" w="100%" justifyContent="space-between" padding={3} gap={4} alignItems="flex-end">
              {child}
            </Grid>
          ))
        : null}
    </Container>
    // {isViewMaximized ? renderOutside : null}
    // </div>
  );
});

// <Collapse in={isViewMaximized}>
// <Grid item xs container direction="row" style={{paddingBottom: '10px'}} data-testid={MAIN_CONTAINER.MAX_VIEW}>
//   <Grid item container xs style={{paddingRight: '5px', paddingLeft: '20px'}}>
//     <Grid container spacing={1} justify="center" alignItems="center">
//       {children}
//     </Grid>
//     <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>{children}</div>
//   </Grid>
// </Grid>
// </Collapse>
