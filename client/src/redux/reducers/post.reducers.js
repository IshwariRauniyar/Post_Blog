import Types from "../actions/types";

export default (
  state = { posts: [], errors: {}, total: 0, totalPages: 0, currentPage: 0 },
  action
) => {
  switch (action.type) {
    case Types.POST_GET_ALL:
      return {
        ...state,
        posts: [...action.payload.posts],
        errors: {},
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case Types.POST_DELETE:
      return {
        ...state,
        posts: [...state.posts.filter((item) => item._id !== action.payload)],
        errors: {},
      };
    case Types.POST_CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        errors: {},
      };
    case Types.POST_GET_SINGLE:
      return {
        ...state,
        posts: [{ ...action.payload }],
        errors: {},
      };
    case Types.POST_EDIT:
      return {
        ...state,
        posts: [
          ...state.posts.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        ],
        errors: {},
      };
    case Types.POST_RESET:
      return { ...state, posts: [], errors: {} };
    default:
      return state;
  }
};
