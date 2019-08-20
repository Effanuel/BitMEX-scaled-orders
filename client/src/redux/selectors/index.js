import { createSelector } from "reselect";

const showPreviewSelector = state => state.preview.showPreview;
const currentPriceSelector = state => state.preview.currentPrice;

export const filteredOrder = createSelector([
  showPreviewSelector,
  currentPriceSelector
]);
