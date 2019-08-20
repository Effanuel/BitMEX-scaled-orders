import React from "react";
import { shallow } from "enzyme";
import CustomRadioButton from "../components/CustomRadioButton/CustomRadioButton";

const props = {
  label: "Sell",
  type: "radio",
  name: "side",
  defaultChecked: false
};

const component = shallow(<CustomRadioButton {...props} />);

describe("CustomRadioButton component", () => {
  it("renders without crashing given the required props", () => {
    expect(component).toMatchSnapshot();
  });
});
