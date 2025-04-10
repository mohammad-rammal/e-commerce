import useGetData from '../../hooks/useGetData';
import {useInsertDataWithImage} from '../../hooks/useInsertData';
import {CREATE_BRAND, GET_ALL_BRAND, GET_ERROR, GET_ONE_BRAND} from '../type';

// Get all brand
export const getAllBrand = (limit) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/brands?limit=${limit}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Get all brand with pagination
export const getAllBrandPage = (limit, page) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/brands?limit=${limit}&page=${page}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Get one brand
export const getOneBrand = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/brands/${id}`);
    dispatch({
      type: GET_ONE_BRAND,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Create brand
export const createBrand = (formData) => async (dispatch) => {
  try {
    const res = await useInsertDataWithImage(`/api/v1/brands`, formData);
    dispatch({
      type: CREATE_BRAND,
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
