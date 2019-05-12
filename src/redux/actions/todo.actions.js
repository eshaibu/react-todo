import appRequest from "./app.action";
import {
  GET_TODO_ITEMS,
  GET_TODO_ITEMS_SUCCESS,
  CREATE_TODO_ITEM,
  CREATE_TODO_ITEM_SUCCESS,
  UPDATE_TODO_ITEM,
  UPDATE_TODO_ITEM_SUCCESS,
  GET_TODO_ITEM,
  GET_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM,
  DELETE_TODO_ITEM_SUCCESS,
  CLEAR_ERROR,
} from "./action-types";

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const createTodoItem = (data) => async (dispatch) => {
  await appRequest(
    {
      data,
      method: "post",
      url: "/todos",
      onSuccess: CREATE_TODO_ITEM_SUCCESS,
      triggeredBy: CREATE_TODO_ITEM,
      successRedirect: "/",
    },
    dispatch
  );
};

export const updateTodoItem = (data, id) => async (dispatch) => {
  await appRequest(
    {
      data,
      method: "patch",
      url: `/todos/${id}`,
      onSuccess: UPDATE_TODO_ITEM_SUCCESS,
      triggeredBy: UPDATE_TODO_ITEM,
      successRedirect: "/",
    },
    dispatch
  );
};

export const getTodoItem = (id) => async (dispatch) => {
  await appRequest(
    {
      method: "get",
      url: `/todos/${id}`,
      onSuccess: GET_TODO_ITEM_SUCCESS,
      triggeredBy: GET_TODO_ITEM,
    },
    dispatch
  );
};

export const getTodoItems = (query = null) => async (dispatch) => {
  await appRequest(
    {
      query: !query ? "" : query,
      method: "get",
      url: "/todos",
      onSuccess: GET_TODO_ITEMS_SUCCESS,
      triggeredBy: GET_TODO_ITEMS,
    },
    dispatch
  );
};

export const deleteTodoItem = (id) => async (dispatch) => {
  await appRequest(
    {
      method: "delete",
      url: `/todos/${id}`,
      onSuccess: DELETE_TODO_ITEM_SUCCESS,
      triggeredBy: DELETE_TODO_ITEM,
    },
    dispatch
  );
};
