import Types from "../actions/types";

export default (state = { post: [], errors: {} }, action) => {
  switch (action.type) {
    case Types.POST_GET_ALL:
      return { ...state, post: [{ ...action.payload }], errors: {} };
    case Types.POST_DELETE:
      return {
        ...state,
        post: [...state.post.filter((item) => item._id !== action.payload)],
        errors: {},
      };
    case Types.POST_CREATE:
      return {
        ...state,
        post: [...state.post, action.payload],
        errors: {},
      };
    case Types.POST_GET_SINGLE:
      return {
        ...state,
        post: [{ ...action.payload }],
        errors: {},
      };
    case Types.POST_EDIT:
      return {
        ...state,
        post: [
          ...state.post.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        ],
        errors: {},
      };
    case Types.POST_RESET:
      return { ...state, post: [], errors: {} };
    default:
      return state;
  }
};
