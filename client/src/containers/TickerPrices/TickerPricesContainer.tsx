import React from 'react';
import {Stat, StatHelpText, StatLabel, Text, StatNumber} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/fp/isEqual';
import {SYMBOL} from 'redux/api/bitmex/types';
import {allWebsocketBidAskPrices, SymbolPrices} from 'redux/selectors';
import {MainContainer, Row} from 'components';
import styles from './TickerPricesContainer.module.scss';
import {AppState} from 'redux/modules/state';
import {formatPrice} from 'general/formatting';

const none = '---' as unknown as number;

const defaultData: SymbolPrices[] = [
  {askPrice: none, bidPrice: none, symbol: SYMBOL.XBTUSD},
  {askPrice: none, bidPrice: none, symbol: SYMBOL.ETHUSD},
  {askPrice: none, bidPrice: none, symbol: SYMBOL.XRPUSD},
];

export default React.memo(function TickerPricesContainer() {
  const wsMessage = useSelector((state: AppState) => state.websocket.message);
  const allPrices = useSelector(allWebsocketBidAskPrices, isEqual);

  const data = allPrices?.length ? allPrices : defaultData;
  return (
    <MainContainer label="TickerPrices" description="Displays current ask prices of subscribed symbols">
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
                  <StatNumber>{askPrice === none ? none : formatPrice(askPrice, symbol)}</StatNumber>
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
