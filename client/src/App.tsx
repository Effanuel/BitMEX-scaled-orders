import React from 'react';
import {useDispatch} from 'react-redux';
import {ScaledOrders, MarketOrderContainer, TrailingLimitOrder, TickerPricesContainer} from 'containers';
import {Spinner, ToastContainer} from './components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {wsConnect, wsDisconnect, wsSubscribeTo, wsAuthenticate} from 'redux/modules/websocket';
import {getBalance} from 'redux/modules/preview';
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
      dispatch(getBalance());
      dispatch(wsAuthenticate());
      dispatch(wsSubscribeTo('order'));
    }
  }, [dispatch, connected]);

  return (
    <div style={{marginTop: '35px'}}>
      <ToastContainer />
      <Spinner loading={previewLoading || trailLoading || wsLoading} />
      <TickerPricesContainer />
      <MarketOrderContainer />
      <TrailingLimitOrder />
      <ScaledOrders />
    </div>
  );
});

export default App;
