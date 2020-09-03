import {ComponentDriver} from 'tests/driver';
import {SelectDropdown, Props as SelectDropdownProps} from './SelectDropdown';
import {COMPONENTS} from 'data-test-ids';

describe('SelectDropdown', () => {
  let driver: SelectDropdownDriver;

  beforeEach(() => {
    driver = new SelectDropdownDriver();
  });

  it('should have been called with a ticker name', () => {
    const onChange = jest.fn();

    const component = driver.withDefaultProps({onChange});
    component.selectOption('ETHUSD');

    expect(onChange).toHaveBeenCalledWith({target: {id: 'default:id', value: 'ETHUSD'}});
  });
});

// eslint-disable-next-line jest/no-export
export class SelectDropdownDriver extends ComponentDriver<SelectDropdownProps> {
  constructor() {
    super(SelectDropdown);
  }

  withDefaultProps(props: Partial<SelectDropdownProps> = {}) {
    const defaultProps: SelectDropdownProps = {
      id: 'default:id',
      label: 'default:label',
      onChange: jest.fn(),
    };
    return this.setProps({...defaultProps, ...props});
  }

  selectOption(option: string) {
    const node = this.getElement(COMPONENTS.SELECT_DROPDOWN);
    node.props.onChange({target: {id: this.props.id, value: option}});
    return this;
  }
}
