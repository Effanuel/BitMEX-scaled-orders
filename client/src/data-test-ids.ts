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
