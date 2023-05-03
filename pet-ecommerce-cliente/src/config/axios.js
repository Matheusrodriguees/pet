import endpoints from '../constants/endpoints';
import axios from 'axios';

const axiosDefault = axios.create({
  baseURL: endpoints,
  timeout: 60000,
});

export default axiosDefault

