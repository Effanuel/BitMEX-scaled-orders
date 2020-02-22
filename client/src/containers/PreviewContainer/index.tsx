import React from "react";
// COMPONENTS
import { Container, Grid } from "@material-ui/core";
import { OrdersPreviewTable, DetailsTable } from "../../components";
// STYLES
import styles from "./styles.module.css";

interface Props {}

export default function PreviewContainer(props: Props) {
  return (
    <Container
      fixed
      maxWidth="sm"
      style={{ padding: "0px", overflow: "hidden" }}
    >
      <Grid item xs container direction="row">
        <Grid
          item
          xs={7}
          className={styles.preview_container}
          style={{ marginRight: "10px" }}
        >
          <OrdersPreviewTable />
        </Grid>
        <Grid item xs className={styles.details_container}>
          <DetailsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
