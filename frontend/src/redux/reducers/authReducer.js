import {
  CREATE_NEW_USER,
  FORGET_PASSWORD,
  GET_CURRENT_USER,
  LOGIN_USER,
  RESET_PASSWORD,
  VERIFY_CODE,
} from '../type';

const initialState = {
  createUser: [],
  loginUser: [],
  currentUser: [],
  forgetPassword: [],
  verifyCode: [],
  resetPassword: [],
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_USER:
      return {
        ...state,
        createUser: action.payload, // save res here
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload, // save res here
        loading: false,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload, // save res here
        loading: false,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        forgetPassword: action.payload, // save res here
        loading: false,
      };
    case VERIFY_CODE:
      return {
        ...state,
        verifyCode: action.payload, // save res here
        loading: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload, // save res here
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
