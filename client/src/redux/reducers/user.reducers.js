import Types from "../actions/types";

export default (
  state = { users: [], errors: {}, total: 0, totalPages: 0, currentPage: 0 },
  action
) => {
  switch (action.type) {
    case Types.USER_GET_ALL:
      return {
        ...state,
        users: [...action.payload.users],
        errors: {},
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case Types.USER_DELETE:
      return {
        ...state,
        users: [...state.users.filter((item) => item._id !== action.payload)],
        errors: {},
      };
    case Types.USER_CREATE:
      return {
        ...state,
        users: [...state.users, action.payload],
        errors: {},
      };
    case Types.USER_GET_SINGLE:
      return {
        ...state,
        users: [{ ...action.payload }],
        errors: {},
      };
    case Types.USER_EDIT:
      return {
        ...state,
        users: [
          ...state.users.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        ],
        errors: {},
      };
    case Types.USER_RESET:
      return { ...state, users: [], errors: {} };
    case Types.USER_ERROR:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
