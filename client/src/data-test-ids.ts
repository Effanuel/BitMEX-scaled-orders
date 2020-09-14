function getTestID(componentName: string) {
  return (viewName: string) => {
    return `${componentName}::${viewName}`;
  };
}

export const MAIN_CONTAINER = {
  MAX_VIEW: getTestID('MainContainer')('maximizedView'),
  MIN_VIEW: getTestID('MainContainer')('minimizedView'),
  CORNER_BUTTON: getTestID('MainContainer')('cornerButton'),
};

export const PREVIEW_CONTAINER = {
  RISK_PERC_ROW: getTestID('PreviewContainer')('riskPercRow'),
  STOP_ORDER_ROW: getTestID('PreviewContainer')('stopOrderRow'),
};

export const SCALED_CONTAINER = {
  STOP_LOSS_INPUT: getTestID('ScaledContainer')('stopLossInput'),
  QUANTITY_INPUT: getTestID('ScaledContainer')('quantityInput'),
  ORDER_COUNT_INPUT: getTestID('ScaledContainer')('orderCountInput'),
  RANGE_START_INPUT: getTestID('ScaledContainer')('rangeStartInput'),
  RANGE_END_INPUT: getTestID('ScaledContainer')('rangeEndInput'),
  PREVIEW_BUTTON: getTestID('ScaledContainer')('previewButton'),
  SUBMIT_BUTTON: getTestID('ScaledContainer')('submitButton'),
  PREVIEW_TABLE: getTestID('ScaledContainer')('previewTable'),
  ORDER_ROW: getTestID('ScaledContainer')('orderRow'),
};

export const MARKET_CONTAINER = {
  BUY_BUTTON: getTestID('MarketContainer')('buyButton'),
  SELL_BUTTON: getTestID('MarketContainer')('sellButton'),
  INPUT: getTestID('MarketContainer')('input'),
};

export const TRAILING_LIMIT_CONTAINER = {
  SUBMIT_TRAILING_ORDER: getTestID('TrailingLimitContainer')('submitTrailingOrder'),
  QUANTITY_INPUT: getTestID('TrailingLimitContainer')('quantityInput'),
};

export const GLOBAL = {
  SNACKBAR: getTestID('Global')('SnackBar'),
  TOAST: getTestID('Global')('toast'),
};

export const COMPONENTS = {
  SELECT_DROPDOWN: getTestID('Components')('selectDropdown'),
};
