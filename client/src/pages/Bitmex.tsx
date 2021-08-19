import 'scss/root.module.scss';
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
import {useAppContext, useIsApiKeyActive} from 'general/hooks';
import {Banner} from 'components/Banner/Banner';
import {Exchange} from 'redux/modules/settings/types';

const exchange = Exchange.BitMeX;

const BitmexExchange = React.memo(() => {
  const {api} = useAppContext();
  const isApiKeyActive = useIsApiKeyActive();
  const dispatch = useDispatch();
  const {previewLoading, trailLoading, wsLoading, connected} = useReduxSelector(
    'previewLoading',
    'trailLoading',
    'wsLoading',
    'connected',
  );

  React.useEffect(() => {
    dispatch(wsConnect(exchange));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (connected && isApiKeyActive) {
      api.getBalance();
      dispatch(wsAuthenticate());
      dispatch(wsSubscribeTo('order'));
    }
  }, [dispatch, api, connected, isApiKeyActive]);

  return (
    <Box marginTop="25px">
      {!isApiKeyActive && <Banner />}
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
