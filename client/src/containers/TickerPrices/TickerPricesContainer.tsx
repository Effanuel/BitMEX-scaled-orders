import React from 'react';
import {MainContainer} from 'components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {SYMBOLS} from 'util/BitMEX-types';
import styles from './TickerPricesContainer.module.css';

const TickerPricesContainer = React.memo(() => {
  const {allPrices, wsMessage} = useReduxSelector('allPrices', 'wsMessage');
  return (
    <MainContainer label="TickerPrices" description="Displays current prices of subscribed symbols">
      <span style={{color: 'white', marginTop: '12px'}}>{wsMessage}</span>
      <div style={{marginBottom: '12px', display: 'flex', flexDirection: 'row'}}>
        {allPrices?.length
          ? allPrices?.map((symbolData) => (
              <ListItem key={symbolData.symbol} symbol={symbolData.symbol} currentPrice={symbolData.askPrice} />
            ))
          : null}
      </div>
    </MainContainer>
  );
});

export default TickerPricesContainer;

function ListItem({symbol, currentPrice}: {symbol: SYMBOLS; currentPrice: number | undefined}) {
  return (
    <div className={styles.white60} style={{border: '1px solid grey', marginLeft: '5px', padding: '1px'}}>
      {symbol}: <span style={{color: 'green'}}>{currentPrice}</span> USD
    </div>
  );
}
