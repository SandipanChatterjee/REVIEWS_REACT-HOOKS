import React from "react";
import { shallow } from "enzyme";
import MoviePicture from "./MoviePicture";
import { findByTestAttr } from "../../testUtils";

const setUp = (props = {}) => {
  console.log("props", props);
  return shallow(<MoviePicture {...props} />);
};

describe("MoviePicture", () => {
  // supplying props
  describe("Have Props", () => {
    let wrapper;

    beforeEach(() => {
      const props = {
        photos: ["pic 1", "pic 2"],
      };
      wrapper = setUp(props);
    });

    it("should render with props", () => {
      const component = findByTestAttr(wrapper, "photos-container");
      console.log("component", component);
      expect(component.length).toBe(1);
    });
  });

  // not supplying props
  describe("Have NO props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setUp();
    });

    it("should render without props", () => {
      const component = findByTestAttr(wrapper, "photos-container");
      expect(component.length).toBe(0);
    });
  });
});
