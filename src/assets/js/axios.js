import axios from 'axios';
import message from '../../components/$message/main';

const Axios = axios.create({
  baseURL: '/api/',
  timeout: 50000,
  withCredentials: true
});

Axios.interceptors.request.use(
  config => {
    const { token } = localStorage;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    message(error && error.data.error.message);
    return Promise.reject(error.data.error.message);
  }
);

Axios.interceptors.response.use(
  res => {
    if (res.data.code !== 200) {
      message(res.data.message);
      return Promise.reject(res.data.message);
    }
    return res;
  },
  error => {
    message(error.response.data.message);
    return Promise.reject(error);
  }
);

export default Axios;
