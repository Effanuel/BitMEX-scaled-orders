import { createSelector } from 'reselect';

const getShowPreview = state => state.preview.showPreview;
const getCurrentPrice = state => state.preview.currentPrice;
const getError = state => state.preview.error;

export const showPreviewSelector = createSelector(
  [getShowPreview],
  showPreview => showPreview
);

export const currentPriceSelector = createSelector(
  [getCurrentPrice],
  currentPrice => currentPrice
);

export const errorSelector = createSelector(
  [getError],
  error => error
);
