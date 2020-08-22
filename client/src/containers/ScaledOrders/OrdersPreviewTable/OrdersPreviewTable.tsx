import React from 'react';
import {Container, Grid} from '@material-ui/core';
import OrdersTable from './orders-table';
import DetailsTable from './details-table';
import styles from './OrdersPreviewTable.module.scss';

export default function OrdersPreviewTable() {
  const {main_container, preview_container, details_container} = styles;
  return (
    <Container fixed maxWidth="sm" className={main_container} style={{padding: 0}}>
      <Grid item xs container direction="row">
        <Grid item xs={8} className={preview_container} style={{marginRight: 10}}>
          <OrdersTable />
        </Grid>
        <Grid item xs className={details_container}>
          <DetailsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
