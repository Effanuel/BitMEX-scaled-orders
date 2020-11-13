import {SIDE} from 'util/BitMEX-types';
import {ButtonVariants} from './Button';
import {ButtonDriver} from './Button.driver';

describe('ButtonDriver', () => {
  let driver: ButtonDriver;

  beforeEach(() => {
    driver = new ButtonDriver();
  });

  it.each([
    ['submit', 'button'],
    ['text', 'text_button'],
    [SIDE.BUY, 'button_buy'],
    [SIDE.SELL, 'button_sell'],
    ['textSell', 'text_sell'],
  ])('should return %s className for %s variant', (variant, expectedClassName) => {
    const drv = driver.withDefaultProps({variant: variant as ButtonVariants}).render();
    expect(drv.getButtonClassName()).toEqual(expectedClassName);
  });

  it('should use `className` prop for `custom` variant button', () => {
    const drv = driver.withDefaultProps({variant: 'custom', className: 'abc'}).render();

    expect(drv.getButtonClassName()).toEqual('abc');
  });

  it('should pass id on button click', () => {
    const onClick = jest.fn();
    const drv = driver.withDefaultProps({onClick}).render();

    drv.pressButton();
    expect(onClick).toHaveBeenCalledWith({target: {id: 'default:id'}});
  });
});
