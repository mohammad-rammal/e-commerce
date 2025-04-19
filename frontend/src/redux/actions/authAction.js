import {useInsertData} from '../../hooks/useInsertData';
import {CREATE_NEW_USER} from '../type';

// create new user for register
export const createNewUser = (Data) => async (dispatch) => {
  try {
    const res = await useInsertData(`/api/v1/auth/signup`, Data);
    dispatch({
      type: CREATE_NEW_USER,
      payload: res,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: CREATE_NEW_USER,
      payload: err.data,
    });
  }
};
