import React from 'react';
// REDUX
import { shallowEqual, useSelector } from 'react-redux';
/// COMPONENTS
import { ScaledContainer, PreviewContainer, MarketOrderContainer } from 'containers';
// UTILS
import { PositionedSnackbar, SpinnerComponent } from 'components';
import { AppState } from 'redux/models/state';
// STYLES
import 'css/root.module.css';
// import { order } from "util";

export default function App() {
  const { showPreview, orderLoading } = useSelector(
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
      <SpinnerComponent loading={orderLoading} />
      <MarketOrderContainer />

      <ScaledContainer />

      {showPreview && <PreviewContainer />}
    </>
  );
}
