import {CREATE_NEW_USER, GET_CURRENT_USER, LOGIN_USER} from '../type';

const initialState = {
  createUser: [],
  loginUser: [],
  currentUser: [],
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

    default:
      return state;
  }
};

export default authReducer;
