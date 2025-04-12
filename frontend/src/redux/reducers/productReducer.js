import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ERROR,
  GET_ONE_PRODUCT,
  GET_PRODUCT_LIKE,
  UPDATE_PRODUCT,
} from '../type';

const initialState = {
  product: [],
  allProducts: [],
  oneProduct: [],
  productLike: [],
  deleteProduct: [],
  updateProduct: [],
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

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
      };

    case GET_ONE_PRODUCT:
      return {
        oneProduct: action.payload,
        loading: false,
      };

    case GET_PRODUCT_LIKE:
      return {
        ...state,
        productLike: action.payload,
        loading: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: action.payload,
        loading: false,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: action.payload,
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
