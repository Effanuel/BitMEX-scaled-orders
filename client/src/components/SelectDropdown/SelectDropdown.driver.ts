import {COMPONENTS} from 'data-test-ids';
import {ComponentDriver} from 'tests/drivers';
import {SelectDropDownProps, SelectDropdown} from './SelectDropdown';

export class SelectDropdownDriver extends ComponentDriver<SelectDropDownProps> {
  constructor() {
    super(SelectDropdown);
  }

  withDefaultProps(props: Partial<SelectDropDownProps> = {}) {
    const defaultProps: SelectDropDownProps = {
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
