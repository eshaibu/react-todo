import {
  GET_TODO_ITEMS,
  GET_TODO_ITEMS_SUCCESS,
  CREATE_TODO_ITEM_SUCCESS,
  UPDATE_TODO_ITEM_SUCCESS,
  GET_TODO_ITEM,
  GET_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM_SUCCESS,
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
    case GET_TODO_ITEM:
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
    case GET_TODO_ITEM_SUCCESS:
    case CREATE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        todoItem: action.payload,
      };
    case UPDATE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        todoItems: {
          ...state.todoItems,
          todos: state.todoItems.todos.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, ...action.payload };
            }
            return item;
          }),
        },
      };
    case DELETE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        todoItems: {
          ...state.todoItems,
          todos: state.todoItems.todos.filter((item) => item._id !== action.payload._id),
        },
      };
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
