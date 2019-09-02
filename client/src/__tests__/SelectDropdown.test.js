import React from "react";
import { shallow } from "enzyme";
import { SelectDropdown } from "../components";

const onChange = jest.fn(),
  props = {
    instruments: ["XBTUSD", "ETHUSD", "LTCU19", "ABC_000"],
    id: "instrument",
    label: "Instrument",
    onChange
  };

const component = shallow(<SelectDropdown {...props} />);

describe("SelectDropdown component", () => {
  it("renders without crashing given the required props", () => {
    expect(component).toMatchSnapshot();
  });
  it("renders required number of buttons", () => {
    expect(component.find("option").length).toEqual(4);
  });
});
