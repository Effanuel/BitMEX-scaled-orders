import React from "react";
// REDUX
import { useSelector, shallowEqual } from "react-redux";
import { ordersSelector } from "../../redux/selectors";
// UTILS
import cx from 'classnames'
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
  const x_side = orders.orders[0].side === "Sell"
  const y_side = x_side ? "Buy": "Sell"

  let sideStyle = cx({
    [styles.side_color__sell]: x_side,
    [styles.side_color__buy]: !x_side
  });
  let sideStyle_stop = cx({
    [styles.side_stop__sell]: !x_side,
    [styles.side_stop__buy]: x_side
  });
  let sideText_x = cx({
    [styles.side__sell]: x_side,
    [styles.side__buy]: !x_side
  });
  let sideText_y = cx({
    [styles.side__sell]: !x_side,
    [styles.side__buy]: x_side
  });
  
  function reformat(number: any): string{
    // reformats 1234567 to 1,234,567
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

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
              className={sideStyle}
            >
              <td key={x * i + "a"}>
                {reformat(x.orderQty)}
              </td>
              <td key={x * i + "b"} className={sideText_x}>
                {x.side}
              </td>
              <td key={x * i + "c"}>
                {reformat(x.price)}
              </td>
            </tr>
          );
        })}

        {orders.stop.stopPx ? (
          <tr
            className={sideStyle_stop}
          >
            <td>
              {reformat(orders.stop.orderQty)}
            </td>
            <td className={sideText_y}>{y_side}</td>
            <td>
              {reformat(orders.stop.stopPx)}
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
