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
}
