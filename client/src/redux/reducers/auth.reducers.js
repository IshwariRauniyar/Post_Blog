import Types from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: {
    UserName: "",
    Email: "",
    FirstName: "",
    LastName: "",
    Image: "",
    Password: "",
  },
  errors: {},
};

export default (state = initialState, action, isLoggedIn = false) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoggedIn: true,
        errors: {},
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case Types.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        errors: {},
      };
    default:
      return state;
  }
};

export function register(state = {}, action) {
  switch (action.type) {
    case Types.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    case Types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        errors: {},
      };
    case Types.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
