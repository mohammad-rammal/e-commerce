import useGetData from '../../hooks/useGetData';
import {useInsertData} from '../../hooks/useInsertData';
import {useInUpdateData, useUpdateData} from '../../hooks/useUpdateData';
import {
  CREATE_NEW_USER,
  FORGET_PASSWORD,
  GET_CURRENT_USER,
  LOGIN_USER,
  RESET_PASSWORD,
  VERIFY_CODE,
} from '../type';

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

// forget password
export const forgetPassword = (data) => async (dispatch) => {
  try {
    const res = await useInsertData(`/api/v1/auth/forgotPassword`, data);
    dispatch({
      type: FORGET_PASSWORD,
      payload: res,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: FORGET_PASSWORD,
      payload: err,
    });
  }
};

// verify code
export const verifyCode = (data) => async (dispatch) => {
  try {
    const res = await useInsertData(`/api/v1/auth/verifyPasswordResetCode`, data);
    dispatch({
      type: VERIFY_CODE,
      payload: res,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: VERIFY_CODE,
      payload: err,
    });
  }
};

// reset password
export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await useInUpdateData(`/api/v1/auth/resetPassword`, data);
    console.log(res);

    dispatch({
      type: RESET_PASSWORD,
      payload: res,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD,
      payload: err,
    });
  }
};
