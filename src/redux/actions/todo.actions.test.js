import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actionTypes from "./action-types";
import * as todoActions from "./todo.actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Todo actions", () => {
  it("should create an action to add a todo", () => {
    const expectedAction = { type: actionTypes.CLEAR_ERROR };
    const mockDispatch = jest.fn();
    todoActions.clearError()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });

  describe("Todo async actions", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    describe("createTodoItem action", () => {
      it("creates CREATE_TODO_ITEM_SUCCESS when a todo item has been created", (done) => {
        const todoItem = { title: "cool title", description: "cool title content" };
        const createTodoItemResult = { ...todoItem, _id: "12345", completed: false };
        const expectedActions = [
          { type: actionTypes.CREATE_TODO_ITEM },
          { type: actionTypes.CREATE_TODO_ITEM_SUCCESS, payload: createTodoItemResult },
        ];

        const store = mockStore({ todoReducer: {} });

        store.dispatch(todoActions.createTodoItem(todoItem)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: createTodoItemResult,
          });
        });
      });
    });

    describe("updateTodoItem action", () => {
      it("creates UPDATE_TODO_ITEM_SUCCESS when a todo item has been updated", (done) => {
        const todoItem = { title: "title updated", description: "cool title updated" };
        const updateTodoItemResult = { ...todoItem, _id: "12345", completed: false };
        const expectedActions = [
          { type: actionTypes.UPDATE_TODO_ITEM },
          { type: actionTypes.UPDATE_TODO_ITEM_SUCCESS, payload: updateTodoItemResult },
        ];

        const store = mockStore({ todoReducer: {} });

        store.dispatch(todoActions.updateTodoItem(todoItem, "12345")).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: updateTodoItemResult,
          });
        });
      });
    });

    describe("getTodoItem action", () => {
      it("creates GET_TODO_ITEM_SUCCESS when a todo item has been retrieved", (done) => {
        const getTodoResult = {
          _id: "12345",
          completed: false,
          title: "cool title",
          description: "cool title content",
        };
        const expectedActions = [
          { type: actionTypes.GET_TODO_ITEM },
          { type: actionTypes.GET_TODO_ITEM_SUCCESS, payload: getTodoResult },
        ];

        const store = mockStore({ todoReducer: {} });

        store.dispatch(todoActions.getTodoItem("12345")).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: getTodoResult,
          });
        });
      });
    });

    describe("getTodoItems action", () => {
      it("creates GET_TODO_ITEMS_SUCCESS when list of todo items has been retrieved", (done) => {
        const getTodoItemsResult = {
          paginationMeta: {
            currentPage: 1,
            pageCount: 1,
            totalCount: 1,
            outputCount: 1,
            pageSize: 10,
            completedStatus: true,
          },
          todos: [
            {
              _id: "12345",
              completed: false,
              title: "cool title",
              description: "cool title content",
            },
          ],
        };
        const expectedActions = [
          { type: actionTypes.GET_TODO_ITEMS },
          { type: actionTypes.GET_TODO_ITEMS_SUCCESS, payload: getTodoItemsResult },
        ];

        const store = mockStore({ todoReducer: {} });

        store.dispatch(todoActions.getTodoItems()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: getTodoItemsResult,
          });
        });
      });
    });

    describe("deleteTodoItem action", () => {
      it("creates DELETE_TODO_ITEM_SUCCESS when a todo item has been deleted", (done) => {
        const deleteTodoResult = {
          _id: "12345",
          message: "Todo item successfully deleted",
        };
        const expectedActions = [
          { type: actionTypes.DELETE_TODO_ITEM },
          { type: actionTypes.DELETE_TODO_ITEM_SUCCESS, payload: deleteTodoResult },
        ];

        const store = mockStore({ todoReducer: {} });

        store.dispatch(todoActions.deleteTodoItem("12345")).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: deleteTodoResult,
          });
        });
      });
    });
  });
});
