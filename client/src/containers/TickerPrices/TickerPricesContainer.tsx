import React from 'react';
import {Stat, StatHelpText, StatLabel, Text, StatNumber} from '@chakra-ui/react';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {SYMBOL} from 'redux/api/bitmex/types';
import {SymbolPrices} from 'redux/selectors';
import {MainContainer, Row} from 'components';
import styles from './TickerPricesContainer.module.scss';

const defaultData = ([
  {askPrice: '---', bidPrice: '---', symbol: SYMBOL.XBTUSD},
  {askPrice: '---', bidPrice: '---', symbol: SYMBOL.ETHUSD},
  {askPrice: '---', bidPrice: '---', symbol: SYMBOL.XRPUSD},
] as unknown) as SymbolPrices[];

export default React.memo(function TickerPricesContainer() {
  const {allPrices, wsMessage} = useReduxSelector('allPrices', 'wsMessage');

  const data = allPrices?.length ? allPrices : defaultData;
  return (
    <MainContainer label="TickerPrices" description="Displays current prices of subscribed symbols">
      <Row>
        <div className={styles.container}>
          <Text color="white" textStyle="bold">
            {wsMessage}
          </Text>
          <div className={styles.allPricesContainer}>
            {data.map(({askPrice, symbol}) => {
              return (
                <Stat key={symbol} margin={15} marginBottom={5} color="white">
                  <StatLabel>{symbol}</StatLabel>
                  <StatNumber>{askPrice}</StatNumber>
                  <StatHelpText>BitMEX</StatHelpText>
                </Stat>
              );
            })}
          </div>
        </div>
      </Row>
    </MainContainer>
  );
});
