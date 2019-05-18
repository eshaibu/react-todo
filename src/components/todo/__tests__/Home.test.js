import React from "react";
import { shallow } from "enzyme";
import Pagination from "react-js-pagination";
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeConnected, { Home } from "../Home";
import { Filter } from "../../common/Filter";
import { TodoItem } from "../TodoItem";

describe("Home redux-connected", () => {
  it("returns an object", () => {
    const actual = typeof HomeConnected;
    expect(actual).toBe("object");
  });
});

describe("Home Component", () => {
  const props = {
    todoItems: {
      todos: [],
      paginationMeta: null,
    },
    loading: false,
    getTodoItems: jest.fn(),
    deleteTodoItem: jest.fn(),
    updateTodoItem: jest.fn(),
  };
  const paginatedTodoItems = {
    paginationMeta: {
      currentPage: 1,
      pageCount: 1,
      totalCount: 1,
      outputCount: 1,
      pageSize: 10,
      completedStatus: true,
    },
    todos: [
      { _id: "1", title: "class room", description: "Hello children", complete: false },
      { _id: "2", title: "play tower", description: "Tall tower", complete: false },
    ],
  };

  it("should render without throwing an error", () => {
    const actual = typeof Home;
    expect(actual).toBe("function");
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render Filter component on page", () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.find(Filter)).toHaveLength(1);
  });

  it("should contain SweetAlert components", () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.find(SweetAlert)).toHaveLength(3);
  });

  it("should display spinner loading when loading props is fails'", () => {
    const propsWithLoadingTrue = { ...props, loading: true };
    const wrapper = shallow(<Home {...propsWithLoadingTrue} />);
    expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1);
  });

  it("should display info alert when fetching todos returns empty array", () => {
    const propsWithEmptyTodos = { ...props, todoItems: { ...props.todoItems, todos: [] } };
    const wrapper = shallow(<Home {...propsWithEmptyTodos} />);
    expect(wrapper.find(".alert-danger").text()).toBe("Todo list is empty");
  });

  it("should render TodoItem and pagination when todos not empty'", () => {
    const propsWithTodos = { ...props, todoItems: { ...props.todoItems, ...paginatedTodoItems } };
    const wrapper = shallow(<Home {...propsWithTodos} />);
    expect(wrapper.find(TodoItem)).toHaveLength(2);
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it("should dispatch getTodoItems on componentDidMount", () => {
    jest.spyOn(Home.prototype, "componentDidMount");
    shallow(<Home {...props} />);
    expect(Home.prototype.componentDidMount.mock.calls.length).toBe(1);
  });

  it("should render TodoItem and pagination when todos not empty'", () => {
    const propsWithTodos = { ...props, todoItems: { ...props.todoItems, ...paginatedTodoItems } };
    const wrapper = shallow(<Home {...propsWithTodos} />);
    expect(wrapper.find(TodoItem)).toHaveLength(2);
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it("should set showDeleteAlert to true when delete icon is clicked", () => {
    const propsWithTodos = { ...props, todoItems: { ...props.todoItems, ...paginatedTodoItems } };
    const wrapper = shallow(<Home {...propsWithTodos} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, "handleIconClick");
    expect(wrapper.state("showDeleteAlert")).toBe(false);
    instance.handleIconClick("delete", 1);
    expect(instance.handleIconClick).toHaveBeenCalled();
    expect(wrapper.state("showDeleteAlert")).toBe(true);
  });
});
