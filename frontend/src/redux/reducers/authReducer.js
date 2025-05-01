import {CREATE_NEW_USER, LOGIN_USER} from '../type';

const initialState = {
  createUser: [],
  loginUser: [],
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

    default:
      return state;
  }
};

export default authReducer;
