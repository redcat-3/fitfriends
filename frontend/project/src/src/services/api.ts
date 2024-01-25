import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { BACKEND_URL, REQUEST_TIMEOUT, APIRoute } from '../constant';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string; config: AxiosRequestConfig }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        if (error.config.url === APIRoute.Login &&
            error.config.method === 'get') {
          throw error;
        }
        if (error.config.url === APIRoute.Login &&
          error.config.method === 'post') {
          throw error;
        }
      }
      throw error;
    }
  );

  return api;
};
