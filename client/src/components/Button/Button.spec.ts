import {Button, ButtonProps, ButtonVariants} from './Button';
import {ComponentDriver} from 'tests/driver';

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

// eslint-disable-next-line jest/no-export
export class ButtonDriver extends ComponentDriver<ButtonProps> {
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
      style: undefined,
      className: '',
    };
    return this.setProps({...defaultProps, ...props});
  }

  pressButton() {
    const node: any = this.getComponent();
    if (node) {
      node.props.onClick({target: {id: this.props.id}});
      return this;
    }

    throw new Error('Cant find button');
  }

  getButtonClassName() {
    return (this.getComponent() as any).props.className;
  }
}
