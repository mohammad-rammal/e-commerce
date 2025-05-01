import useGetData from '../../hooks/useGetData';
import {useInsertData} from '../../hooks/useInsertData';
import {CREATE_NEW_USER, GET_CURRENT_USER, LOGIN_USER} from '../type';

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

// login user
export const loginUser = (Data) => async (dispatch) => {
  try {
    const res = await useInsertData(`/api/v1/auth/login`, Data);
    dispatch({
      type: LOGIN_USER,
      payload: res,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_USER,
      payload: err,
    });
  }
};

// login user
export const getLoggedUser = () => async (dispatch) => {
  try {
    const res = await useGetData(`/api/v1/users/getMe`);
    dispatch({
      type: GET_CURRENT_USER,
      payload: res,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_USER,
      payload: err,
    });
  }
};
