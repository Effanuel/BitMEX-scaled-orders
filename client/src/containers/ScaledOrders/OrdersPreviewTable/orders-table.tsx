import React from 'react';
import _ from 'lodash/fp';
import cx from 'classnames';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {formatPrice} from 'general/formatting';
import {PREVIEW_CONTAINER, SCALED_CONTAINER} from 'data-test-ids';
import {useSingleton} from 'general/hooks';
import {SIDE, SYMBOLS} from 'redux/api/bitmex/types';
import styles from './orders-table.module.scss';
import ProfitTargetDialog, {RefProps} from './ProfitTargetDialog';
import {useDispatch} from 'react-redux';
import {removeProfitTarget} from 'redux/modules/preview/previewModule';
import {RegularOrder, ScaledOrder, StopLoss} from '../../../util';

const OrderTypePresenter: Readonly<{[key in SIDE]: string}> = {
  [SIDE.SELL]: 'Limit-Sell',
  [SIDE.BUY]: 'Limit-Buy',
};

const StopOrderTypePresenter: Readonly<{[key in SIDE]: string}> = {
  [SIDE.SELL]: 'Stop-Market-sell',
  [SIDE.BUY]: 'Stop-Market-buy',
};

const generateSideColorStyles = (xSide: boolean) => ({
  normal: cx({[styles.side_color__sell]: xSide, [styles.side_color__buy]: !xSide}),
  stop: cx({[styles.side_stop__sell]: !xSide, [styles.side_stop__buy]: xSide}),
  textX: cx({[styles.side__sell]: xSide, [styles.side__buy]: !xSide}),
  textY: cx({[styles.side__sell]: !xSide, [styles.side__buy]: xSide}),
});

interface Props {
  orders?: ScaledOrder[];
}

export default function OrdersTable({orders}: Props) {
  const dispatch = useDispatch();
  const ref = React.createRef<RefProps>();
  const {profitTargets} = useReduxSelector('profitTargets');

  const xSide = orders?.[0].side === 'Sell';
  const ySide = xSide ? 'Buy' : 'Sell';
  const {normal, stop, textX, textY} = useSingleton(generateSideColorStyles(xSide));

  const openProfitTargetDialog = React.useCallback(
    (price: number, side: SIDE, symbol: SYMBOLS) => () => {
      // console.log(ref?.current);
      console.log('OPEN');
      ref.current?.openDialog(price, side, symbol);
    },
    [ref],
  );

  const removeTarget = React.useCallback(
    (price: number) => () => {
      dispatch(removeProfitTarget(price));
    },
    [dispatch],
  );

  const [stopOrders, regularOrders] = _.partition((item) => 'stopPx' in item, orders) as [
    StopLoss[] | undefined,
    RegularOrder[],
  ];

  const renderOrders = React.useMemo(
    () =>
      regularOrders.map(({orderQty, side, price, symbol}, i) => (
        <tr key={`${i}`} className={normal}>
          <td key={i + 'a'}>{formatPrice(orderQty)}</td>
          <td key={i + 'b'} className={textX}>
            {OrderTypePresenter[side]}
          </td>
          <td key={i + 'c'}>{formatPrice(price)}</td>
          {_.find(profitTargets, ['stopPx', price]) ? (
            <td key={i + 'x'} className={styles['remove-profit-target']} onClick={removeTarget(price)}>
              - Remove profit target
            </td>
          ) : (
            <td
              key={i + 'd'}
              data-testid={'datatest'}
              className={styles['add-profit-target']}
              onClick={openProfitTargetDialog(price, side, symbol)}
            >
              + Add profit target
            </td>
          )}
        </tr>
      )),
    [profitTargets, normal, openProfitTargetDialog, textX, removeTarget, regularOrders],
  );

  return (
    <>
      <ProfitTargetDialog ref={ref} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Order Type</th>
            <th>Price</th>
            <th>Profit Target</th>
          </tr>
        </thead>
        <tbody data-testid={SCALED_CONTAINER.ORDER_ROW}>
          {renderOrders}
          {stopOrders?.[0] ? (
            <tr data-testid={PREVIEW_CONTAINER.STOP_ORDER_ROW} className={stop}>
              <td>{formatPrice(stopOrders[0].orderQty)}</td>
              <td className={textY}>{StopOrderTypePresenter[ySide]}</td>
              <td>{formatPrice(stopOrders[0].stopPx)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}
