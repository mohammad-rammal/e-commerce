import useGetData from '../../hooks/useGetData';
import {useInsertData} from '../../hooks/useInsertData';
import {CREATE_SUB_CATEGORY, GET_ERROR, GET_SUBCATEGORY} from '../type';

// Create subcategory
export const createSubCategory = (data) => async (dispatch) => {
  try {
    const res = await useInsertData(`/api/v1/subcategories`, data);
    dispatch({
      type: CREATE_SUB_CATEGORY,
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

// Get subcategory depend in category ID
export const getSubCategory = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/categories/${id}/subCategories`);

    dispatch({
      type: GET_SUBCATEGORY,
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
