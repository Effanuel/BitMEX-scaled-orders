import React from 'react';
import cx from 'classnames';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {formatPrice} from 'general/formatting';
import styles from './orders-table.module.scss';
import {PREVIEW_CONTAINER} from 'data-test-ids';
import {useSingleton} from 'general/hooks';

const generateSideColorStyles = (xSide: boolean) => ({
  normal: cx({[styles.side_color__sell]: xSide, [styles.side_color__buy]: !xSide}),
  stop: cx({[styles.side_stop__sell]: !xSide, [styles.side_stop__buy]: xSide}),
  textX: cx({[styles.side__sell]: xSide, [styles.side__buy]: !xSide}),
  textY: cx({[styles.side__sell]: !xSide, [styles.side__buy]: xSide}),
});

export default function OrdersTable() {
  const {orders} = useReduxSelector('orders');

  const xSide = useSingleton(orders?.orders?.[0].side === 'Sell');
  const ySide = useSingleton(xSide ? 'Buy' : 'Sell');
  const {normal, stop, textX, textY} = useSingleton(generateSideColorStyles(xSide));

  const renderOrders = useSingleton(
    orders?.orders.map(({orderQty, side, price}, i) => (
      <tr key={`${i}`} className={normal}>
        <td key={i + 'a'}>{formatPrice(orderQty)}</td>
        <td key={i + 'b'} className={textX}>
          {side}
        </td>
        <td key={i + 'c'}>{formatPrice(price)}</td>
      </tr>
    )),
  );

  const renderStop = useSingleton(
    orders?.stop.stopPx ? (
      <tr data-testid={PREVIEW_CONTAINER.STOP_ORDER_ROW} className={stop}>
        <td>{formatPrice(orders.stop.orderQty)}</td>
        <td className={textY}>{ySide}</td>
        <td>{formatPrice(orders.stop.stopPx)}</td>
      </tr>
    ) : null,
  );

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
        {renderOrders}
        {renderStop}
      </tbody>
    </table>
  );
}
