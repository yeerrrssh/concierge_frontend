import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { CancelledRequestError, HttpError } from './errors.ts';


const BACKEND_URL_1 = 'http://89.105.137.28:8011';
const BACKEND_URL_2 = 'http://89.105.137.28:8001/api';

export const axiosInstance1 = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL_1,
});

export const axiosInstance2 = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL_2,
});

type RetriableAxiosError<T = unknown, D = unknown> = AxiosError<T, D> & {
  config?: InternalAxiosRequestConfig<D> & {
    isRetry: boolean;
  };
};

const setupInterceptors = (instance: typeof axiosInstance1) => {
  instance.interceptors.response.use(
    (config) => config,
    async (error: RetriableAxiosError) => {
      if (error instanceof axios.CanceledError) {
        const { url = 'unknown', method = 'unknown' } = error.config ?? {};
        throw new CancelledRequestError(url, method, error);
      }

      if (error.response != null) {
        const { status, data } = error.response;
        if (error.response.status > 299) {
          throw new HttpError(
            status,
            data,
            error,
            `Http request failed with code '${status}'`,
          );
        }
      }
    },
  );
};

setupInterceptors(axiosInstance1);
setupInterceptors(axiosInstance2);
