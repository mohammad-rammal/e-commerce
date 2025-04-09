import {useInsertDataWithImage} from '../../hooks/useInsertData';
import {CREATE_PRODUCT, GET_ERROR} from '../type';

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
