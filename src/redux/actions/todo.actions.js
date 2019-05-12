import appRequest from "./app.action";
import {
  GET_TODO_ITEMS,
  GET_TODO_ITEMS_SUCCESS,
  CREATE_TODO_ITEM,
  CREATE_TODO_ITEM_SUCCESS,
} from "./action-types";

export const dispatchAction = (typeWithPayload) => (dispatch) => {
  dispatch({ ...typeWithPayload });
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
