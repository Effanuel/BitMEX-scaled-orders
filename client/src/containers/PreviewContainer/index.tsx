import React from "react";
// COMPONENTS
import { Container } from "react-bootstrap";
import { OrdersPreviewTable, DetailsTable } from "../../components";
// UTILS
import styles from "./styles.module.css";

interface Props {}

export default function PreviewContainer() {
  return (
    <Container className={styles.preview_containers}>
      <Container className={styles.container_orders}>
        <OrdersPreviewTable />
      </Container>
      <Container className={styles.container}>
        <DetailsTable />
      </Container>
    </Container>
  );
}
