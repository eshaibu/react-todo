import React from "react";
import { shallow } from "enzyme";
import AppConnected, { App } from "./App";
import { Header } from "./common/Header";

describe("App redux-connected", () => {
  it("returns an object", () => {
    const actual = typeof AppConnected;
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

  it("should render without throwing an error given the required props", () => {
    const actual = typeof App;
    expect(actual).toBe("function");
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render Header component when server not down", () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find("main").exists()).toBeTruthy();
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("should display 'APP DOWN. TRY LATER' when triggeredBy in error object is 'SERVER_DOWN'", () => {
    const propsWithError = {
      ...props,
      errorState: { ...props.errorState, triggeredBy: "SERVER_DOWN" },
    };
    const wrapper = shallow(<App {...propsWithError} />);
    expect(wrapper.find(".font-weight-bold").text()).toBe("APP DOWN. TRY LATER");
  });
});
