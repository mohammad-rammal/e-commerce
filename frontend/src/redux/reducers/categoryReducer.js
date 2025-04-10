import {CREATE_CATEGORY, GET_ALL_CATEGORY, GET_ERROR, GET_ONE_CATEGORY} from '../type';

const initialState = {
  category: [],
  oneCategory: [],
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        category: action.payload, // res
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        category: action.payload,
        loading: false, // finish req
      };
    case GET_ONE_CATEGORY:
      return {
        oneCategory: action.payload,
        loading: false, // finish req
      };
    case GET_ERROR:
      return {
        category: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export default categoryReducer;
