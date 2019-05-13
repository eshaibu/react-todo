import React from "react";
import { shallow } from "enzyme";
import App, { App as AppComponent } from "./App";

describe("App redux-connected", () => {
  it("returns an object", () => {
    const actual = typeof App;
    expect(actual).toBe("object");
  });
});

describe("App Component", () => {
  const props = {
    errorState: {
      data: null,
      triggeredBy: "",
    },
    clearError: jest.fn(),
  };

  it("returns a function and render without throwing an error", () => {
    const actual = typeof AppComponent;
    expect(actual).toBe("function");
    const wrapper = shallow(<AppComponent {...props} />);
    expect(wrapper.find("main").exists()).toBeTruthy();
  });
});
