import React from "react";
// REDUX
import { useSelector, shallowEqual } from "react-redux";
import { ordersSelector } from "../../redux/selectors";
// UTILS
import styles from "./styles.module.css";
import { AppState } from "../../redux/models/state";

type Props = {};

export default function OrdersPreviewTable(props: Props) {
  const { orders } = useSelector(
    (state: AppState) => ({
      orders: ordersSelector(state)
    }),
    shallowEqual
  );
  // This code needs fixing...
  const sideColor = orders.orders[0].side === "Sell" ? "#cf6679" : "#4caf50";
  const __sideColor = sideColor === "#cf6679" ? "#4caf50" : "#cf6679";
  const side = orders.orders[0].side;
  const _side = side === "Sell" ? "Buy" : "Sell";

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Side</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.orders.map((x: any, i: number) => {
          return (
            <tr
              key={`${i}`}
              style={{
                paddingLeft: "5px",
                borderLeft: `6px solid ${sideColor}`
              }}
            >
              <td key={x * i + "a"}>
                {x.orderQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td key={x * i + "b"} style={{ color: sideColor }}>
                {x.side}
              </td>
              <td key={x * i + "c"}>
                {x.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
          );
        })}
        {orders.stop.stopPx ? (
          <tr
            style={{
              paddingLeft: "5px",
              borderLeft: `6px solid ${__sideColor}`,
              borderTop: `1px solid ${__sideColor}`
            }}
          >
            <td>
              {orders.stop.orderQty
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
            <td style={{ color: `${__sideColor}` }}>{_side}</td>
            <td>
              {orders.stop.stopPx
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
