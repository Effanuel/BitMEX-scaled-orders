import {Props as InputFieldProps, InputField} from './InputField';
import {ComponentDriver} from 'tests/driver';

describe('TextFieldComponent', () => {
  let driver: InputFieldDriver;

  beforeEach(() => {
    driver = new InputFieldDriver();
  });

  it.skip('should set value of the input', () => {
    const value = '111';
    const comp = driver.withDefaultProps().render();

    comp.setInputValue(value);

    expect(comp.getInputValue()).toEqual(value);
  });
});

// eslint-disable-next-line jest/no-export
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
