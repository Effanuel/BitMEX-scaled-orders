import React from 'react';
import {Box, Container} from '@chakra-ui/react';
import OrdersTable from './orders-table';
import DetailsTable from './details-table';
import styles from './OrdersPreviewTable.module.scss';
import {SCALED_CONTAINER} from 'data-test-ids';
import {createScaledOrders, DISTRIBUTION} from 'utils';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';

interface Props {
  orderQty: number;
  n_tp: number;
  start: number;
  end: number;
  stop: number;
  distribution: DISTRIBUTION;
  side: SIDE;
  symbol: SYMBOL;
}

export default function OrdersPreviewTable({distribution, ...ordersProps}: Props) {
  const orders = React.useMemo(() => {
    return createScaledOrders({ordersProps, distribution});
  }, [ordersProps, distribution]);
  return (
    <Container
      data-testid={SCALED_CONTAINER.PREVIEW_TABLE}
      padding={0}
      display="flex"
      flexDirection="row"
      maxW="720px"
      w="100%"
    >
      <Box className={styles.container} p={0} w={7 / 10} marginRight={2}>
        <OrdersTable orders={orders} />
      </Box>
      <Box className={styles.container} p={0} w={3 / 10}>
        <DetailsTable />
      </Box>
    </Container>
  );
}
