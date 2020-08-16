import {ComponentDriver} from 'react-component-driver';
import {Button, ButtonProps, ButtonVariants} from './Button';

describe('ButtonDriver', () => {
  let driver: ButtonDriver;

  beforeEach(() => {
    driver = new ButtonDriver();
  });

  it.each([
    ['submit', 'button'],
    ['text', 'text_button'],
    ['buy', 'button_buy'],
    ['sell', 'button_sell'],
  ])('should return %s className for %s variant', (variant, expectedClassName) => {
    const drv = driver.withDefaultProps({variant: variant as ButtonVariants}).render();
    expect(drv.getButtonClassName()).toEqual(expectedClassName);
  });

  it('should use `className` prop for `custom` variant button', () => {
    const drv = driver.withDefaultProps({variant: 'custom', className: 'abc'}).render();

    expect(drv.getButtonClassName()).toEqual('abc');
  });
});

class ButtonDriver extends ComponentDriver<ButtonProps> {
  constructor() {
    super(Button);
  }

  withDefaultProps(props: Partial<ButtonProps>) {
    const defaultProps: ButtonProps = {
      id: 'default:id',
      label: 'default:label',
      testID: 'default:testID',
      variant: 'submit',
      disabled: false,
      onClick: jest.fn(),
      style: null,
      className: '',
    };
    return this.setProps({...defaultProps, ...props});
  }

  getButton() {
    if (this.props.testID) return this.getByID(this.props!.testID);
    return null;
  }

  getButtonClassName() {
    return this.getButton()?.props.className;
  }
}
