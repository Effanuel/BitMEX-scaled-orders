import {SelectDropdownDriver} from './SelectDropdown.driver';

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
