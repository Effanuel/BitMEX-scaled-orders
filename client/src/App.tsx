import React from "react";
// REDUX
import { shallowEqual, useSelector } from "react-redux";
import { showPreviewSelector } from "./redux/selectors";
/// COMPONENTS
import { ScaledContainer, PreviewContainer } from "./containers";
// UTILS
import { AppState } from "./redux/models/state";
import "./css/root.module.css";

export default function App() {
  const { showPreview } = useSelector(
    (state: AppState) => ({
      showPreview: showPreviewSelector(state)
    }),
    shallowEqual
  );

  return (
    <>
      <ScaledContainer />

      {showPreview && <PreviewContainer />}
    </>
  );
}
