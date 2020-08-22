import React from 'react';
import {MainContainer} from 'components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {SYMBOLS} from 'util/BitMEX-types';
import styles from './TickerPricesContainer.module.scss';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {backgroundColor: 'white'},
  itemRoot: {justifyContent: 'center', padding: 0},
  primary: {color: 'white'},
  secondary: {color: 'grey'},
}));

interface ItemProps {
  price: string | number;
  symbol: SYMBOLS;
  shouldShowDivider: boolean;
}

function Item({price, symbol, shouldShowDivider}: ItemProps) {
  const {root, itemRoot, primary, secondary} = useStyles();
  return (
    <>
      <ListItem key={symbol}>
        <ListItemText inset={true} classes={{root: itemRoot, primary, secondary}} primary={price} secondary={symbol} />
      </ListItem>
      {shouldShowDivider && <Divider orientation="vertical" flexItem classes={{root}} />}
    </>
  );
}

const defaultData: any = [
  {askPrice: '---', bidPrice: '---', symbol: SYMBOLS.XBTUSD},
  {askPrice: '---', bidPrice: '---', symbol: SYMBOLS.ETHUSD},
  {askPrice: '---', bidPrice: '---', symbol: SYMBOLS.XRPUSD},
];

const TickerPricesContainer = React.memo(() => {
  const {allPrices, wsMessage} = useReduxSelector('allPrices', 'wsMessage');
  const data: any = allPrices?.length ? allPrices : defaultData;
  return (
    <MainContainer label="TickerPrices" description="Displays current prices of subscribed symbols">
      <div className={styles.container}>
        <div className={styles.message}>{wsMessage}</div>
        <div className={styles.allPricesContainer}>
          {data.map(({askPrice, symbol}: any, index: number) => {
            const shouldShowDivider = data.length - 1 !== index;
            return <Item key={symbol} price={askPrice} symbol={symbol} shouldShowDivider={shouldShowDivider} />;
          })}
        </div>
      </div>
    </MainContainer>
  );
});

export default TickerPricesContainer;
