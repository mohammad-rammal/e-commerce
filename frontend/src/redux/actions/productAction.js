import useDeleteData from '../../hooks/useDeleteData';
import useGetData from '../../hooks/useGetData';
import {useInsertDataWithImage} from '../../hooks/useInsertData';
import {useUpdateDataWithImage} from '../../hooks/useUpdateData';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ERROR,
  GET_ONE_PRODUCT,
  GET_PRODUCT_LIKE,
  UPDATE_PRODUCT,
} from '../type';

// Create product
export const createProduct = (formData) => async (dispatch) => {
  try {
    const res = await useInsertDataWithImage(`/api/v1/products`, formData);
    console.log(formData);

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
// Get all products with pages number
export const getAllProductsPage = (limit, page) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/products?limit=${limit}&page=${page}`);

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

// Delete product with id
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await useDeleteData(`/api/v1/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
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

// Update product with id
export const updateProduct = (id, Data) => async (dispatch) => {
  try {
    console.log(Data);

    const res = await useUpdateDataWithImage(`/api/v1/products/${id}`, Data);
    console.log(res);

    dispatch({
      type: UPDATE_PRODUCT,
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
