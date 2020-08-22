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
  PREVIEW_BUTTON: getTestID('ScaledContainer')('previewButton'),
  SUBMIT_BUTTON: getTestID('ScaledContainer')('submitButton'),
};

export const GLOBAL = {
  SNACKBAR: getTestID('Global')('SnackBar'),
};
