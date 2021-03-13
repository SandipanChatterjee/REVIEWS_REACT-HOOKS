import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import { testStore } from "../../testUtils";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);

  const wrapper = shallow(<Login store={store} />)
    .childAt(0)
    .dive();

  return wrapper;
};

describe("<Login />", () => {
  let component;
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    userDetails: {},
  };
  beforeEach(() => {
    component = setUp(initialState);
  });
  it("renders without error", () => {
    const wrapper = component.find(`[data-test="Login"]`);
    expect(wrapper.length).toBe(1);
  });
});
