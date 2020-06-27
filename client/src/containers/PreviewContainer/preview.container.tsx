import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { OrdersPreviewTable } from './orders-preview-table.component';
import { DetailsTable } from './details-table.component';
import styles from './preview.module.css';

export default function PreviewContainer() {
  const { main_container, preview_container, details_container } = styles;
  return (
    <Container fixed maxWidth="sm" className={main_container}>
      <Grid item xs container direction="row">
        <Grid item xs={8} className={preview_container} style={{ marginRight: 10 }}>
          <OrdersPreviewTable />
        </Grid>
        <Grid item xs className={details_container}>
          <DetailsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
