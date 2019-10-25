import React from "react";

import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import {
  ordersAveragePriceSelector,
  ordersSelector
} from "../../redux/selectors";

import styles from "./OrdersPreviewTable.module.css";

type Props<T extends object> = {
  averagePrice: any;
  orders: any;
};

const OrdersPreviewTable = <T extends object>(props: Props<T>) => {
  const { averagePrice, orders } = props;

  return (
    <Table className={styles.myTable} striped variant="dark" size="sm">
      <thead>
        <tr>
          <th colSpan={3}>
            Average price:
            <span className={styles.customStyle}>{` $${averagePrice}`}</span>
          </th>
        </tr>
        <tr>
          <th>Quantity</th>
          <th>Side</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((x: any, i: number) => {
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

const mapStateToProps = (state: any) => ({
  orders: ordersSelector(state),
  averagePrice: ordersAveragePriceSelector(state)
});
export default connect(
  mapStateToProps,
  null
)(OrdersPreviewTable);
