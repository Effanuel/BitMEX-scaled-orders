import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import cx from 'classnames';

import {formatPrice} from 'general/formatting';
import {AppState} from 'redux/models/state';
import styles from './orders-preview-table.module.css';

const generateSideColorStyles = (xSide: boolean) => ({
  normal: cx({
    [styles.side_color__sell]: xSide,
    [styles.side_color__buy]: !xSide,
  }),
  stop: cx({
    [styles.side_stop__sell]: !xSide,
    [styles.side_stop__buy]: xSide,
  }),
  textX: cx({
    [styles.side__sell]: xSide,
    [styles.side__buy]: !xSide,
  }),
  textY: cx({
    [styles.side__sell]: !xSide,
    [styles.side__buy]: xSide,
  }),
});

export default function OrdersPreviewTable() {
  const {orders} = useSelector(
    (state: AppState) => ({
      orders: state.preview.orders,
    }),
    shallowEqual,
  );

  const xSide = orders?.orders?.[0].side === 'Sell';
  const ySide = xSide ? 'Buy' : 'Sell';
  const {normal, stop, textX, textY} = generateSideColorStyles(xSide);

  function renderOrders() {
    return orders.orders.map((order, i) => (
      <tr key={`${i}`} className={normal}>
        <td key={i + 'a'}>{formatPrice(order.orderQty)}</td>
        <td key={i + 'b'} className={textX}>
          {order.side}
        </td>
        <td key={i + 'c'}>{formatPrice(order.price)}</td>
      </tr>
    ));
  }

  function renderStop() {
    return orders.stop.stopPx ? (
      <tr className={stop}>
        <td>{formatPrice(orders.stop.orderQty)}</td>
        <td className={textY}>{ySide}</td>
        <td>{formatPrice(orders.stop.stopPx)}</td>
      </tr>
    ) : null;
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
        {renderOrders()}
        {renderStop()}
      </tbody>
    </table>
  );
}
