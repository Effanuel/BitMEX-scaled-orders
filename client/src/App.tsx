import React from 'react';
import {useDispatch} from 'react-redux';
import {Box} from '@chakra-ui/react';
import {
  ScaledOrders,
  MarketOrderContainer,
  TrailingLimitOrder,
  TickerPricesContainer,
  CrossOrderContainer,
  OpenOrdersContainer,
} from 'containers';
import {Spinner, ToastContainer} from 'components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {wsConnect, wsDisconnect, wsSubscribeTo, wsAuthenticate} from 'redux/modules/websocket/websocketModule';
import {getBalance} from 'redux/modules/preview/previewModule';
import 'scss/root.module.scss';

const App = React.memo(() => {
  const dispatch = useDispatch();
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
      //TODO: fix argument
      dispatch(getBalance(''));
      dispatch(wsAuthenticate());
      dispatch(wsSubscribeTo('order'));
    }
  }, [dispatch, connected]);

  return (
    <Box marginTop="35px">
      <ToastContainer />
      <Spinner loading={previewLoading || trailLoading || wsLoading} />
      <TickerPricesContainer />
      <OpenOrdersContainer />
      <CrossOrderContainer />
      <MarketOrderContainer />
      <TrailingLimitOrder />
      <ScaledOrders />
    </Box>
  );
});

export default App;
