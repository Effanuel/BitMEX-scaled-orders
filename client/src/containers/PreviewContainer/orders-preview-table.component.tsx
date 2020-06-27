import React from 'react';
// REDUX
import { useSelector, shallowEqual } from 'react-redux';
import { AppState } from 'redux/models/state';
// STYLES
import cx from 'classnames';
import styles from './orders-preview-table.module.css';

function OrdersPreviewTable() {
  const { orders } = useSelector(
    (state: AppState) => ({
      orders: state.preview.orders,
    }),
    shallowEqual,
  );

  // Handles side border colors
  const x_side = orders.orders[0].side === 'Sell';
  const y_side = x_side ? 'Buy' : 'Sell';

  const sideStyle = cx({
    [styles.side_color__sell]: x_side,
    [styles.side_color__buy]: !x_side,
  });
  const sideStyle_stop = cx({
    [styles.side_stop__sell]: !x_side,
    [styles.side_stop__buy]: x_side,
  });
  const sideText_x = cx({
    [styles.side__sell]: x_side,
    [styles.side__buy]: !x_side,
  });
  const sideText_y = cx({
    [styles.side__sell]: !x_side,
    [styles.side__buy]: x_side,
  });

  function renderOrders() {
    return orders.orders.map((x, i) => (
      <tr key={`${i}`} className={sideStyle}>
        <td key={i + 'a'}>{reformat(x.orderQty)}</td>
        <td key={i + 'b'} className={sideText_x}>
          {x.side}
        </td>
        <td key={i + 'c'}>{reformat(x.price)}</td>
      </tr>
    ));
  }
  function renderStop() {
    return orders.stop.stopPx ? (
      <tr className={sideStyle_stop}>
        <td>{reformat(orders.stop.orderQty)}</td>
        <td className={sideText_y}>{y_side}</td>
        <td>{reformat(orders.stop.stopPx)}</td>
      </tr>
    ) : null;
  }

  // .details_container {
  //   border: 1px solid grey;
  //   border-radius: 2px;
  //   box-shadow: 3px 3px 5px black;
  // }

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
        {renderOrders()}
        {renderStop()}
      </tbody>
    </table>
  );
}
export { OrdersPreviewTable };

// Reformats numbers
// ex. 123456.7890 => 123,456.7890
function reformat(num: any) {
  return num.toString().replace(/^[+-]?\d+/, function (int: any) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}
