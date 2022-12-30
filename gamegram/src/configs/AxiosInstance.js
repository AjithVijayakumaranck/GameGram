import axios from 'axios';


// axios instance for making requests 
const axiosInstance = axios.create();

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  config.headers = Object.assign({
    Authorization: `${localStorage.getItem('token')}`
  }, config.headers)
  return config;
});


export default axios;