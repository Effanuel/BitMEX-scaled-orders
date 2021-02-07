import React from 'react';
import {MainContainer} from 'components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {SYMBOLS} from 'redux/api/bitmex/types';
import styles from './TickerPricesContainer.module.scss';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {SymbolPrices} from 'redux/selectors';
import {Box, Text} from '@chakra-ui/react';
import ItemText from 'components/ItemText/ItemText';

const useStyles = makeStyles(() => ({
  root: {backgroundColor: 'white'},
}));

const defaultData = ([
  {askPrice: '---', bidPrice: '---', symbol: SYMBOLS.XBTUSD},
  {askPrice: '---', bidPrice: '---', symbol: SYMBOLS.ETHUSD},
  {askPrice: '---', bidPrice: '---', symbol: SYMBOLS.XRPUSD},
] as unknown) as SymbolPrices[];

export default React.memo(function TickerPricesContainer() {
  const {root} = useStyles();
  const {allPrices, wsMessage} = useReduxSelector('allPrices', 'wsMessage');

  const data = allPrices?.length ? allPrices : defaultData;
  return (
    <MainContainer label="TickerPrices" description="Displays current prices of subscribed symbols">
      <div className={styles.container}>
        <Text color="white" textStyle="bold">
          {wsMessage}
        </Text>
        <div className={styles.allPricesContainer}>
          {data.map(({askPrice, symbol}, index: number) => {
            const isNotLastItem = data.length - 1 !== index;
            return (
              <>
                <Box padding={'20px'}>
                  <ItemText primary={symbol} secondary={askPrice} />
                </Box>
                {isNotLastItem && <Divider orientation="vertical" flexItem classes={{root}} />}
              </>
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
});
