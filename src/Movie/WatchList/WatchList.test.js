import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore } from "../../testUtils";
import WatchList from "./WatchList";

const setUp = (props = {}, val = {}) => {
  console.debug(props, val);
  const store = testStore({});
  return shallow(<WatchList {...props} {...val} store={store} />)
    .childAt(0)
    .dive();
};

describe("Watch List", () => {
  describe("When user logged in", () => {
    let wrapper;
    beforeEach(() => {
      const val = {
        watchList: true,
      };
      wrapper = setUp({}, val);
    });
    it("Added to watchlist", () => {
      const component = findByTestAttr(wrapper, "addedToWatchList");
      console.debug(component);
      expect(component.length).toBe(1);
    });
  });
});
