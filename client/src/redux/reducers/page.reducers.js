import Types from "../actions/types";

export default (
  state = { pages: [], errors: {}, total: 0, totalPages: 0, currentPage: 0 },
  action
) => {
  switch (action.type) {
    case Types.PAGE_GET_ALL:
      return {
        ...state,
        pages: [...action.payload.pages],
        errors: {},
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case Types.PAGE_DELETE:
      return {
        ...state,
        pages: [...state.pages.filter((item) => item._id !== action.payload)],
        errors: {},
      };
    case Types.PAGE_CREATE:
      return {
        ...state,
        pages: [...state.pages, action.payload],
        errors: {},
      };
    case Types.PAGE_GET_SINGLE:
      return {
        ...state,
        pages: [{ ...action.payload }],
        errors: {},
      };
    case Types.PAGE_EDIT:
      return {
        ...state,
        pages: [
          ...state.pages.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        ],
        errors: {},
      };
    case Types.POST_RESET:
      return { ...state, pages: [], errors: {} };
    case Types.PAGE_ERROR:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
