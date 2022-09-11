import {
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_SUCCESS,
  LOGIN_FORM_FAILED,
  LOGIN_FORM_SET_VALUE,

  LOGOUT_FORM_REQUEST,
  LOGOUT_FORM_SUCCESS,
  LOGOUT_FORM_FAILED,

  REGISTER_FORM_REQUEST,
  REGISTER_FORM_SUCCESS,
  REGISTER_FORM_FAILED,
  REGISTER_FORM_SET_VALUE,

  CHANGE_USER_REQUEST,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_FORM_SET_VALUE,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_SUCCESS,
} from "../actions/auth";

const initialState = {
  message: "",

  user: {
    email: "",
    name: "",
  },

  data: {
    name: "",
    email: "",
    password: "",
    code: "",
  },

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  logoutRequest: false,
  logoutFailed: false,

  chgangeUserRequest: false,
  chgangeUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,

  getUserRequest: false,
  getUserFailed: false,

  updateTokenRequest: false,
  updateTokenSuccess: false,
  updateTokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_REQUEST: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: true,
      };
    }

    case LOGIN_FORM_SUCCESS: {
      return {
        ...state,
        user: action.user,
        data: {
          ...state.data,
          email: "",
          password: "",
        },
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
      };
    }

    case LOGIN_FORM_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    case LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };
    }

    case LOGOUT_FORM_REQUEST: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: true,
      };
    }

    case LOGOUT_FORM_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          email: "",
          name: "",
        },
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    case LOGOUT_FORM_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    case REGISTER_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };
    }

    case REGISTER_FORM_REQUEST: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: true,
      };
    }

    case REGISTER_FORM_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    case REGISTER_FORM_SUCCESS: {
      return {
        ...state,
        user: action.user,
        data: {
          ...state.data,
          email: "",
          password: "",
          name: "",
        },
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
      };
    }

    case CHANGE_USER_REQUEST: {
      return {
        ...state,
        chgangeUserFailed: false,
        chgangeUserRequest: true,
      };
    }

    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        user: action.playload,
        data: {
          ...state.data,
          email: "",
          password: "",
          name: "",
        },
        chgangeUserRequest: false,
        chgangeUserFailed: false,
      };
    }

    case CHANGE_USER_FAILED: {
      return {
        ...state,
        chgangeUserFailed: true,
        chgangeUserRequest: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          email: "",
        },
        message: action.message,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: true,
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: true,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          password: "",
        },
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true,
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      };
    }

    case RESET_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserFailed: false,
        getUserRequest: true,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserRequest: false,
        getUserFailed: false,
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
      };
    }

    case UPDATE_TOKEN_REQUEST:
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFailed: false,
      };

    case UPDATE_TOKEN_SUCCESS:
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenSuccess: true,
        updateTokenFailed: false,
      };

    case UPDATE_TOKEN_FAILED:
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: true,
      };

    default: {
      return state;
    }
  }
};
