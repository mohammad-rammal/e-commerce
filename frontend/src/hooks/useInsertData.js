import baseUrl from '../Api/baseURL';

const useInsertDataWithImage = async (url, params) => {
  try {
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    const res = await baseUrl.post(url, params, config);
    return res;
  } catch (err) {
    throw err.response;
  }
};

const useInsertData = async (url, params) => {
  try {
    const res = await baseUrl.post(url, params);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export {useInsertDataWithImage, useInsertData};
