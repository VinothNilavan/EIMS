import { getAsValue } from '@utils';
import axiosAuth from '../axios/axiosAuth';

const APIFormData = async (endPoint, req, isMS) => {
  const jwt = await getAsValue('jwt');
  const request = { url: endPoint, body: req.body };
  const axios = axiosAuth(req.store, isMS);
  axios.defaults.headers.common.jwt = jwt;
  axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  console.log('api form data ', axios.defaults.headers.common['Content-Type']);
  return axios.post(request.url, req.body, {
    headers: { 'Content-Type': 'multipart/form-data' },
    transformRequest: () => req.body
  })
};

export default APIFormData;
