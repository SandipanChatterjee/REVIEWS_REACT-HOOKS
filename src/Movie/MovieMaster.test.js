import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore } from "../testUtils";
import MovieMaster from "./MovieMaster";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<MovieMaster store={store} />)
    .childAt(0)
    .dive();

  console.log(wrapper.debug());
  return wrapper;
};

describe("MovieMaster Component", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {};
    wrapper = setUp(initialState);
  });

  it("Should load without error", () => {
    const component = findByTestAttr(wrapper, "movieMasterLoading");
    expect(component.length).toBe(1);
  });

  it("Should render without error", () => {
    const component = findByTestAttr(wrapper, "movieMasterComponent");
    expect(component.length).toBe(1);
  });
});
