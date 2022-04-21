import Types from "../actions/types";

export default (
  state = { roles: [], errors: {}, total: 0, totalPages: 0, currentPage: 0 },
  action
) => {
  switch (action.type) {
    case Types.ROLE_GET_ALL:
      return {
        ...state,
        roles: [...action.payload.settings],
        errors: {},
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case Types.ROLE_DELETE:
      return {
        ...state,
        roles: [...state.roles.filter((item) => item._id !== action.payload)],
        errors: {},
      };
    case Types.ROLE_CREATE:
      return {
        ...state,
        roles: [...state.roles, action.payload],
        errors: {},
      };
    case Types.ROLE_GET_SINGLE:
      return {
        ...state,
        roles: [{ ...action.payload }],
        errors: {},
      };
    case Types.ROLE_EDIT:
      return {
        ...state,
        roles: [
          ...state.roles.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        ],
        errors: {},
      };

    default:
      return state;
  }
};
