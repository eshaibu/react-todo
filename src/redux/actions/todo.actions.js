import appRequest from "./app.action";
import { REQUEST_ERROR, GET_TODO_ITEMS, GET_TODO_ITEMS_SUCCESS } from "./action-types";

export const dispatchAction = (typeWithPayload) => (dispatch) => {
  dispatch({ ...typeWithPayload });
};

export const getTodoItems = (query = null) => async (dispatch) => {
  await appRequest(
    {
      query: !query ? "" : query,
      method: "get",
      url: "/todos",
      onSuccess: GET_TODO_ITEMS_SUCCESS,
      onFailure: REQUEST_ERROR,
      triggeredBy: GET_TODO_ITEMS,
    },
    dispatch
  );
};
