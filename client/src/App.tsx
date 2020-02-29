import React from "react";
// REDUX
import { shallowEqual, useSelector } from "react-redux";
import { showPreviewSelector, orderLoadingSelector } from "redux/selectors";
/// COMPONENTS
import {
  ScaledContainer,
  PreviewContainer,
  MarketOrderContainer
} from "containers";
// UTILS
import { PositionedSnackbar, SpinnerComponent } from "components";
import { AppState } from "redux/models/state";
// STYLES
import "css/root.module.css";
// import { order } from "util";

export default function App() {
  const { showPreview, orderLoading } = useSelector(
    (state: AppState) => ({
      showPreview: showPreviewSelector(state),
      orderLoading: orderLoadingSelector(state)
    }),
    shallowEqual
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
