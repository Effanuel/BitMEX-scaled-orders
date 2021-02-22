import React from 'react';
import {Grid, Flex, Container} from '@chakra-ui/react';
import styles from './styles.module.scss';
import {MAIN_CONTAINER} from '../../data-test-ids';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  label: string;
  description?: string;
  renderOutside?: React.ReactNode;
  connected?: boolean;
  padding?: number;
}

export const MainContainer = React.memo((props: Props) => {
  const {children, label, description = '', renderOutside = null, connected = true, padding = 3} = props;

  const [isViewMaximized, setViewMaximized] = React.useState<boolean>(true);

  const maximizeContainer = React.useCallback(() => setViewMaximized(!isViewMaximized), [isViewMaximized]);

  return (
    <div className={!connected ? styles.dim : undefined}>
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
            {!isViewMaximized && (
              <span data-testid={MAIN_CONTAINER.DESCRIPTION} className={styles.description}>
                {description}
              </span>
            )}
          </div>
        </Flex>
        {isViewMaximized
          ? React.Children.map(children, (child) => (
              <Grid
                display="flex"
                w="100%"
                justifyContent="space-between"
                padding={padding}
                gap={4}
                alignItems="flex-end"
              >
                {child}
              </Grid>
            ))
          : null}
      </Container>

      {isViewMaximized && !!renderOutside ? <>{renderOutside}</> : null}
    </div>
  );
});
