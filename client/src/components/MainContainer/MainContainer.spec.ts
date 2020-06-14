import { ComponentDriver } from 'react-component-driver';
import { MainContainer, Props as MainContainerProps } from './index';
import { MAIN_CONTAINER } from '../../data-test-ids';

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
