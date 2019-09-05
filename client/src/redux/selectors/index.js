import { createSelector } from "reselect";

const getShowPreview = state => state.preview.showPreview;
const getError = state => state.preview.error;
const websocketData = state => state.websocket.data;

export const showPreviewSelector = createSelector(
  [getShowPreview],
  showPreview => showPreview
);

export const errorSelector = createSelector(
  [getError],
  error => error
);

export const websocketDataSelector = createSelector(
  [websocketData],
  data => {
    return data.action === "insert" ? data.data[0].askPrice : "";
  }
);
