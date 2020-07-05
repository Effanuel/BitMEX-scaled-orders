import {ComponentDriver} from 'react-component-driver';
import {Button, ButtonProps} from './Button';

describe('ButtonDriver', () => {
  let driver: ButtonDriver;

  beforeEach(() => {
    driver = new ButtonDriver();
  });

  it('should use `button` style for `submit` variant button', async () => {
    const drv = await driver.withDefaultProps({variant: 'submit'}).renderAsync();

    expect(drv.getButtonClassName()).toEqual('button');
  });

  it('should use `text_button` style for `text` variant button', async () => {
    const drv = await driver.withDefaultProps({variant: 'text'}).renderAsync();

    expect(drv.getButtonClassName()).toEqual('text_button');
  });

  it('should use `className` prop for `custom` variant button', async () => {
    const drv = await driver.withDefaultProps({variant: 'custom', className: 'abc'}).renderAsync();

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
