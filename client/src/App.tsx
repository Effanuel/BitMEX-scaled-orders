import React from 'react';
import {useDispatch} from 'react-redux';
import {ScaledOrders, MarketOrderContainer, TrailingLimitOrder, TickerPricesContainer} from 'containers';
import {Spinner, ToastContainer} from './components';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import 'css/root.module.css';
import {wsConnect, wsDisconnect, wsSubscribeTo, wsAuthenticate} from 'redux/modules/websocket';
import {getBalance} from 'redux/modules/preview';

const App = React.memo(() => {
  const dispatch = useDispatch();
  const {previewLoading, connected} = useReduxSelector('previewLoading', 'connected');

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
    <div>
      <ToastContainer />
      <Spinner loading={previewLoading} />
      <TickerPricesContainer />
      <MarketOrderContainer />
      <TrailingLimitOrder />
      <ScaledOrders />
    </div>
  );
});

export default App;
