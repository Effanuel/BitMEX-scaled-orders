import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./OrdersPreviewTable.module.css";

import { ordersAveragePriceSelector } from "../../redux/selectors";

const OrdersPreviewTable = ({ preview, averagePrice }) => {
  return (
    <Table className={styles.myTable} striped variant="dark" size="sm">
      <thead>
        <tr>
          <th colSpan={3}>
            Average price: <d className={styles.customStyle}>{averagePrice}</d>
          </th>
        </tr>
        <tr>
          <th>Quantity</th>
          <th>Side</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {preview.orders.map((x, i) => {
          return (
            <tr key={String(i)}>
              <td key={x * i + "a"}>{x.orderQty}</td>
              <td
                key={x * i + "b"}
                style={{ color: x.side === "Sell" ? "#d50000" : "#00ca45" }}
              >
                {x.side}
              </td>
              <td key={x * i + "c"}>{x.price}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const mapStateToProps = state => ({
  preview: state.preview,
  averagePrice: ordersAveragePriceSelector(state)
});
export default connect(
  mapStateToProps,
  null
)(OrdersPreviewTable);
