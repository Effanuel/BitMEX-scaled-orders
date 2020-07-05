import React from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import {ScaledContainer, PreviewContainer, MarketOrderContainer} from 'containers';
import {PositionedSnackbar, Spinner} from './components';
import {AppState} from 'redux/models/state';
import 'css/root.module.css';

export default function App() {
  const {showPreview, orderLoading} = useSelector(
    (state: AppState) => ({
      showPreview: state.preview.showPreview,
      orderLoading: state.preview.loading,
      // TODO: ADD GLOBAL wsCurrentPrice
      // pass to market container and to scaled container
    }),
    shallowEqual,
  );
  // console.log(test, "LOGOGOGO");
  return (
    <>
      <PositionedSnackbar />
      <Spinner loading={orderLoading} />
      <MarketOrderContainer />

      <ScaledContainer />

      {showPreview && <PreviewContainer />}
    </>
  );
}
