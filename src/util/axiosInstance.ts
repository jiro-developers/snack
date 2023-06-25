import axios from 'axios';

const DEFAULT_AXIOS_TIMEOUT_MILLISECONDS = 5 * 1000;

export const axiosInstance = axios.create({
  baseURL: 'localhost:3000',
  headers: {},
  withCredentials: true,
  timeout: DEFAULT_AXIOS_TIMEOUT_MILLISECONDS,
});
