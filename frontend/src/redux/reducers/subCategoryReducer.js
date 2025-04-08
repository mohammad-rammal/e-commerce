import {CREATE_SUB_CATEGORY, GET_ERROR, GET_SUBCATEGORY} from '../type';

const initialState = {
  subcategory: [],
  loading: true,
};

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY:
      return {
        ...state,
        subcategory: action.payload, // res
        loading: false,
      };
    case GET_SUBCATEGORY:
      return {
        subcategory: action.payload, // res
        loading: false,
      };
    case GET_ERROR:
      return {
        subcategory: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export default subCategoryReducer;
