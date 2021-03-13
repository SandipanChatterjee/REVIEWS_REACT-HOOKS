import React from "react";
import { shallow } from "enzyme";
import Dashboard from "./Dashboard";
import { findByTestAttr } from "../testUtils";

const setUp = (props = {}) => {
  const component = shallow(<Dashboard {...props} />);
  return component;
};

describe("Dashboard", () => {
  let component;

  beforeEach(() => {
    component = setUp();
    console.log("component", component);
  });

  it("should contain one container class", () => {
    const wrapper = findByTestAttr(component, "container");
    expect(wrapper.length).toBe(1);
  });
});
