import {
  GET_TODO_ITEMS,
  GET_TODO_ITEMS_SUCCESS,
  GET_TODO_ITEMS_FAILURE,
  CLEAR_ERROR,
  REQUEST_ERROR,
} from "../actions/action-types";

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

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_ITEMS:
      return {
        ...state,
        loading: true,
      };
    case GET_TODO_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        todoItems: action.payload,
      };
    case GET_TODO_ITEMS_FAILURE:
    case REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          triggeredBy: action.payload.triggeredBy,
          data: action.payload.data,
        },
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: initialState.error,
      };
    default:
      return state;
  }
};

export default todoReducer;
