import React from 'react';
import {MainContainer} from 'components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {SYMBOLS} from 'util/BitMEX-types';
import styles from './TickerPricesContainer.module.scss';

function ListItem({symbol, askPrice}: {symbol: SYMBOLS; askPrice: number | undefined}) {
  return (
    <div className={styles.listItemContainer} key={symbol}>
      {symbol}: <span style={{color: 'green'}}>{askPrice}</span> USD
    </div>
  );
}

const TickerPricesContainer = React.memo(() => {
  const {allPrices, wsMessage} = useReduxSelector('allPrices', 'wsMessage');
  return (
    <MainContainer label="TickerPrices" description="Displays current prices of subscribed symbols">
      <span style={{color: 'white', marginTop: '12px'}}>{wsMessage}</span>
      <div className={styles.allPricesContainer}>{allPrices?.map(ListItem) || null}</div>
    </MainContainer>
  );
});

export default TickerPricesContainer;
