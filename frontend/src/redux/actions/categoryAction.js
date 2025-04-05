import useGetData from '../../hooks/useGetData';
import {useInsertDataWithImage} from '../../hooks/useInsertData';
import {CREATE_CATEGORY, GET_ALL_CATEGORY, GET_ERROR} from '../type';

// Get all category
export const getAllCategory = (limit) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/categories?limit=${limit}`);
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Get all category with pagination
export const getAllCategoryPage = (limit, page) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/categories?limit=${limit}&page=${page}`);
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};

// Create category
export const createCategory = (formData) => async (dispatch) => {
  try {
    const res = await useInsertDataWithImage(`/api/v1/categories`, formData);
    dispatch({
      type: CREATE_CATEGORY,
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
