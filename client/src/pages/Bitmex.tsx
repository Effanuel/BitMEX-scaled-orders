import React from 'react';
import {useDispatch} from 'react-redux';
import {Box} from '@chakra-ui/react';
import {
  ScaledOrders,
  MarketOrderContainer,
  TrailingLimitOrder,
  TickerPricesContainer,
  //   CrossOrderContainer,
  OpenOrdersContainer,
} from 'containers';
import {Spinner, ToastContainer} from 'components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {wsConnect, wsDisconnect, wsSubscribeTo, wsAuthenticate} from 'redux/modules/websocket/websocketModule';
import {useApi} from 'general/hooks';

import 'scss/root.module.scss';

const BitmexExchange = React.memo(() => {
  const dispatch = useDispatch();
  const {getBalance} = useApi();
  const {previewLoading, trailLoading, wsLoading, connected} = useReduxSelector(
    'previewLoading',
    'trailLoading',
    'wsLoading',
    'connected',
  );

  React.useEffect(() => {
    dispatch(wsConnect());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (connected) {
      getBalance();
      dispatch(wsAuthenticate());
      dispatch(wsSubscribeTo('order'));
    }
  }, [dispatch, getBalance, connected]);

  return (
    <Box marginTop="25px">
      <ToastContainer />
      <Spinner loading={previewLoading || trailLoading || wsLoading} />
      <TickerPricesContainer />
      <OpenOrdersContainer />
      {/* <CrossOrderContainer /> TODO: disabling for now */}
      <MarketOrderContainer />
      <TrailingLimitOrder />
      <ScaledOrders />
    </Box>
  );
});

export default BitmexExchange;
