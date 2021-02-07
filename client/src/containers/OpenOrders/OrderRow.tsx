import React from 'react';
import {SIDE, SYMBOLS} from 'redux/api/bitmex/types';
import styles from './orders-table.module.scss';
import cx from 'classnames';
import ItemText from 'components/ItemText/ItemText';

const OrderTypePresenter: Readonly<{[key in SIDE]: string}> = {
  [SIDE.SELL]: 'SELL',
  [SIDE.BUY]: 'BUY',
};

const generateSideColorStyles = (side: SIDE) => {
  const sellStyle = side === 'Sell';
  return {
    baseColor: cx({[styles.side_color__sell]: sellStyle, [styles.side_color__buy]: !sellStyle}),
    sideStyle: cx({[styles.side__sell]: sellStyle, [styles.side__buy]: !sellStyle}),
  };
};

interface OrderRowProps {
  symbol: SYMBOLS;
  side: SIDE;
  price: string;
  ordType: string;
  orderQty: number;
}

function OrderRow({symbol, side, ordType, orderQty, price}: OrderRowProps) {
  const {baseColor, sideStyle} = React.useMemo(() => generateSideColorStyles(side), [side]);
  return (
    <div
      style={{
        display: 'flex',
        paddingLeft: 4,
        flexDirection: 'row',
        alignItems: 'center',
        border: '1px solid grey',
        justifyContent: 'space-between',
      }}
    >
      <ItemText primary={symbol} secondary={price} />
      <ItemText primary="QUANTITY" secondary={orderQty} />
      <div style={{fontWeight: 'bold', paddingRight: 18, fontSize: 16}} className={sideStyle}>
        {OrderTypePresenter[side]}
      </div>

      <div style={{color: 'white', fontWeight: 'bold', paddingRight: 18, fontSize: 16}}>{ordType}</div>
      <ItemText primary="TAKE PROFIT" secondary="Add Target" />
      <div className={styles.div_corner}>
        <div className={styles.div_corner__button} />
      </div>
    </div>
  );
}
export default OrderRow;
