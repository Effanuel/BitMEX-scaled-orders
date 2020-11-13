import {Button, ButtonProps} from 'components';
import {ComponentDriver} from 'react-component-driver';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node: any = this.getComponent();

    if (node.props.disabled) {
      throw new Error('Can`t press a disabled button');
    }
    if (node) {
      node.props.onClick({target: {id: this.props.id}});
      return this;
    }

    throw new Error('Cant find button');
  }

  getButtonClassName() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.getComponent() as any).props.className;
  }
}
