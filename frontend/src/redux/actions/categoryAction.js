import useGetData from '../../hooks/useGetData';
import {GET_ALL_CATEGORY, GET_ERROR} from '../type';

export const getAllCategory = () => async (dispatch) => {
  try {
    const res = await useGetData('/api/v1/categories');

    dispatch({
      type: GET_ALL_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + err,
    });
  }
};
