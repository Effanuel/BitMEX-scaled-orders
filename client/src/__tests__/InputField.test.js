import React from "react";
import { shallow } from "enzyme";
import { InputField } from "../components";

const onChange = jest.fn(),
  props = {
    id: "quantity",
    label: "Quantity",
    value: 329,
    onChange
  };

const component = shallow(<InputField {...props} />);

describe("InputField component", () => {
  it("renders without crashing given the required props", () => {
    expect(component).toMatchSnapshot();
  });
});
