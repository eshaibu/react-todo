import * as actionTypes from "../actions/action-types";
import todoReducer from "./todo.reducer";

describe("Todo reducer", () => {
  const initialState = {
    loading: false,
    todoItems: {
      todos: [],
      paginationMeta: null,
    },
    todoItem: null,
    error: {
      data: null,
      triggeredBy: "",
    },
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

  const todoItem = {
    _id: "1",
    title: "title test",
    description: "description test",
    complete: false,
  };

  it("should return the initial state", () => {
    expect(todoReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_TODO_ITEMS", () => {
    const todoAction = {
      type: actionTypes.GET_TODO_ITEMS,
    };
    const newState = todoReducer(initialState, todoAction);
    expect(newState.loading).toEqual(true);
  });

  it("should handle GET_TODO_ITEMS_SUCCESS", () => {
    const todoAction = {
      type: actionTypes.GET_TODO_ITEMS_SUCCESS,
      payload: paginatedTodoItems,
    };
    const newState = todoReducer(initialState, todoAction);
    expect(newState.todoItems).toEqual(paginatedTodoItems);
    expect(newState.loading).toEqual(false);
  });

  it("should handle GET_TODO_ITEM_SUCCESS", () => {
    const todoAction = {
      type: actionTypes.GET_TODO_ITEM_SUCCESS,
      payload: todoItem,
    };
    const newState = todoReducer(initialState, todoAction);
    expect(newState.todoItem).toEqual(todoItem);
    expect(newState.loading).toEqual(false);
  });

  it("should handle CREATE_TODO_ITEM_SUCCESS", () => {
    const todoAction = {
      type: actionTypes.CREATE_TODO_ITEM_SUCCESS,
      payload: todoItem,
    };
    const newState = todoReducer(initialState, todoAction);
    expect(newState.todoItem).toEqual(todoItem);
    expect(newState.loading).toEqual(false);
  });

  it("should handle UPDATE_TODO_ITEM_SUCCESS", () => {
    const newInitialState = { ...initialState, todoItems: paginatedTodoItems };
    const todoAction = {
      type: actionTypes.UPDATE_TODO_ITEM_SUCCESS,
      payload: todoItem,
    };
    const newState = todoReducer(newInitialState, todoAction);
    expect(newState.todoItems.todos[0]).toEqual(todoItem);
    expect(newState.loading).toEqual(false);
  });

  it("should handle DELETE_TODO_ITEM_SUCCESS", () => {
    const newInitialState = { ...initialState, todoItems: paginatedTodoItems };
    const todoAction = {
      type: actionTypes.DELETE_TODO_ITEM_SUCCESS,
      payload: { _id: "1", message: "Todo item successfully deleted" },
    };
    const newState = todoReducer(newInitialState, todoAction);
    expect(newState.todoItems.todos).toEqual(paginatedTodoItems.todos.slice(1));
    expect(newState.loading).toEqual(false);
  });

  it("should handle REQUEST_ERROR", () => {
    const todoAction = {
      type: actionTypes.REQUEST_ERROR,
      payload: { triggeredBy: "SERVER_DOWN", data: { message: "Server down" } },
    };
    const newState = todoReducer(initialState, todoAction);
    expect(newState.error.triggeredBy).toEqual("SERVER_DOWN");
    expect(newState.loading).toEqual(false);
  });

  it("should handle CLEAR_ERROR", () => {
    const initialState = {
      error: { data: { message: "Server down" }, triggeredBy: "SERVER_DOWN" },
    };
    const todoAction = {
      type: actionTypes.CLEAR_ERROR,
    };
    const newState = todoReducer(initialState, todoAction);
    expect(newState.error.triggeredBy).toEqual("");
  });
});
