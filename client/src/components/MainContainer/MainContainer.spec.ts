import {ComponentDriver} from 'react-component-driver';
import React from 'react';

import {MainContainer, MainContainerProps} from './MainContainer';
import {MAIN_CONTAINER} from '../../data-test-ids';

describe('MainContainer', () => {
  let driver: MainContainerDriver;

  beforeEach(() => {
    driver = new MainContainerDriver();
  });

  it('should display maximized view by default', async () => {
    const drv = await driver.renderAsync();

    expect(drv.getMaximizedView()).toBeDefined();
    expect(drv.getMinimizedView()).toBeUndefined();
  });

  it('should toggle views on corner button press', async () => {
    const drv = await driver.renderAsync();
    expect(drv.getMinimizedView()).toBeUndefined();

    drv.pressCornerButton();

    expect(drv.getMaximizedView()).toBeUndefined();
    expect(drv.getMinimizedView()).toBeDefined();

    drv.pressCornerButton();

    expect(drv.getMaximizedView()).toBeDefined();
    expect(drv.getMinimizedView()).toBeUndefined();
  });

  it('should render content outside of the container', () => {
    const inputElement = React.createElement('input', {'data-test-id': 'testidsomething'});
    const drv = driver.setProps({renderOutside: inputElement}).render();

    const renderedOutsideContent = drv.getByID('testidsomething');

    expect(renderedOutsideContent).toBeDefined();
  });

  it('should not render outside content when minimized', () => {
    const inputElement = React.createElement('input', {'data-test-id': 'testidsomething'});
    const drv = driver.setProps({renderOutside: inputElement}).render();

    drv.pressCornerButton();

    const renderedOutsideContent = drv.getByID('testidsomething');
    expect(renderedOutsideContent).toBeUndefined();
  });
});

class MainContainerDriver extends ComponentDriver<MainContainerProps> {
  constructor() {
    super(MainContainer);
  }

  getMaximizedView() {
    return this.getByID(MAIN_CONTAINER.MAX_VIEW);
  }

  getMinimizedView() {
    return this.getByID(MAIN_CONTAINER.MIN_VIEW);
  }

  pressCornerButton() {
    const cornerButton = this.getByID(MAIN_CONTAINER.CORNER_BUTTON);

    if (cornerButton) {
      cornerButton.props.onClick();
      return this;
    }

    throw Error('Corner button error');
  }
}
