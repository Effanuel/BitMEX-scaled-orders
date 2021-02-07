import React from 'react';
import {Container, Grid} from '@material-ui/core';
import OrdersTable from './orders-table';
import DetailsTable from './details-table';
import styles from './OrdersPreviewTable.module.scss';
import {SCALED_CONTAINER} from 'data-test-ids';
import {createScaledOrders, DISTRIBUTIONS} from '../../../util';
import {SIDE, SYMBOLS} from 'redux/api/bitmex/types';

interface Props {
  orderQty: number;
  n_tp: number;
  start: number;
  end: number;
  stop: number;
  distribution: DISTRIBUTIONS;
  side: SIDE;
  symbol: SYMBOLS;
}

export default function OrdersPreviewTable({distribution, ...ordersProps}: Props) {
  const {main_container, preview_container, details_container} = styles;

  const orders = createScaledOrders({ordersProps, distribution});
  return (
    <Container
      data-testid={SCALED_CONTAINER.PREVIEW_TABLE}
      fixed
      maxWidth="sm"
      className={main_container}
      style={{padding: 0}}
    >
      <Grid item xs container direction="row">
        <Grid item xs={8} className={preview_container} style={{marginRight: 10}}>
          <OrdersTable orders={orders} />
        </Grid>
        <Grid item xs className={details_container}>
          <DetailsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
