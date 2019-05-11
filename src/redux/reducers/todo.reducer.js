const actionTypes = {
  ADD_TODO_ITEM: 'ADD_TODO_ITEM',
};

const initialState = {
  loading: false
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO_ITEM:
      state = {
        ...state,
        loading: false
      };
      break;
    default:
      return state;
  }
  return state;
};

export default todoReducer;
