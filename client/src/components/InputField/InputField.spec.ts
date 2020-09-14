import InputFieldDriver from './InputField.driver';

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
