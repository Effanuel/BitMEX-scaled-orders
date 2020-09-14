import {ComponentDriver} from 'tests/drivers';
import {InputField, InputFieldProps} from './InputField';

export default class InputFieldDriver extends ComponentDriver<InputFieldProps> {
  constructor() {
    super(InputField);
  }
  withDefaultProps(props?: Partial<InputFieldProps>) {
    const defaultProps: InputFieldProps = {
      id: 'id',
      ['data-test-id']: 'default:TextFieldComponent',
      onChange: jest.fn(),
      placeholder: 'default:placeholder',
      value: '',
    };
    return this.setProps({...defaultProps, ...props});
  }

  getInputValue() {
    const testID = this.props['data-test-id'];
    if (testID) {
      return this.getByID(testID)!.props.value;
    }
  }

  setInputValue(value: string) {
    const node = this.getElement(this.props['data-test-id']);
    node.props.onChange({target: {value, id: this.props.id, tagName: 'INPUT'}});
    node.props.value = value;
    return this;
  }
}
