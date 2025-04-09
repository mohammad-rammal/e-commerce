import {CREATE_PRODUCT, GET_ERROR} from '../type';

const initialState = {
  product: [],
  loading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        product: action.payload, // res
        loading: false,
      };

    case GET_ERROR:
      return {
        product: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export default productReducer;
