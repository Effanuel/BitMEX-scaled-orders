import {ComponentDriver} from 'tests/fuel/drivers';
import {SIDE} from 'util/BitMEX-types';
import {SideRadioButtons, SideRadioButtonsProps} from './CustomRadioButton';

export default class SideRadioButtonsDriver extends ComponentDriver<SideRadioButtonsProps> {
  constructor() {
    super(SideRadioButtons);
  }
  withDefaultProps(props?: Partial<SideRadioButtonsProps>) {
    const defaultProps: SideRadioButtonsProps = {
      testID: 'default:SideRadioButtons',
      onChangeRadio: jest.fn(),
      side: SIDE.BUY,
    };
    return this.setProps({...defaultProps, ...props});
  }

  getInputValue() {
    const testID = this.props.testID;
    console.log(this.props);
    // console.log(this.getByID(this.props.testID!));
    if (testID) {
      console.log(this.getByID(testID)!.props, '-==-=-=-=-=');
      //   return
    }
  }

  setInputValue(value: string) {
    console.log(this.props);
    // const node = this.getElement(this.props!['data-test-id']!);
    // node.props.onChange({target: {value, name: 'side'}});
    // node.props.value = value;
    //   node.props.value = value;
    // return this;
  }
}
