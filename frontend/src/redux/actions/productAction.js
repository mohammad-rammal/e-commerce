import useGetData from '../../hooks/useGetData';
import {useInsertDataWithImage} from '../../hooks/useInsertData';
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ERROR,
  GET_ONE_PRODUCT,
  GET_PRODUCT_LIKE,
} from '../type';

// Create product
export const createProduct = (formData) => async (dispatch) => {
  try {
    const res = await useInsertDataWithImage(`/api/v1/products`, formData);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res,
      loading: true, // start req
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Get all products
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/products?limit=${limit}`);

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res,
      loading: true, // start req
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Get one product with id
export const getOneProduct = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/products/${id}`);

    dispatch({
      type: GET_ONE_PRODUCT,
      payload: res,
      loading: true, // start req
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Get similar products with id
export const getProductLike = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/products?category=${id}&sort=sold`);

    dispatch({
      type: GET_PRODUCT_LIKE,
      payload: res,
      loading: true, // start req
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};
