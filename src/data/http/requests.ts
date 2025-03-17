import { AxiosRequestConfig } from 'axios';
import { axiosInstance1, axiosInstance2 } from './http.ts';

async function request<TResponse>(
  config: AxiosRequestConfig,
  instance = axiosInstance1, // По умолчанию используем первый бэкенд
) {
  return instance<TResponse>(config).then((res) => res.data);
}

type RequestParams<TExtra> = {
  url: string;
  signal?: AbortSignal;
  headers?: object;
  useSecondBackend?: boolean; // Флаг для выбора второго бэкенда
} & TExtra;

type HttpGetDelParams = RequestParams<{
  query?: object;
  params?: Record<string, unknown>;
}>;

export async function get<TResponse>(params: HttpGetDelParams) {
  const instance = params.useSecondBackend ? axiosInstance2 : axiosInstance1;
  return request<TResponse>(params, instance);
}

export async function del<TResponse>(params: HttpGetDelParams) {
  const instance = params.useSecondBackend ? axiosInstance2 : axiosInstance1;
  return request<TResponse>({ method: 'DELETE', ...params }, instance);
}

type HttpPostPutPatchParams = RequestParams<{
  data: object;
}>;

export async function post<TResponse>(params: HttpPostPutPatchParams) {
  const instance = params.useSecondBackend ? axiosInstance2 : axiosInstance1;
  return request<TResponse>({ method: 'POST', ...params }, instance);
}

export async function put<TResponse>(params: HttpPostPutPatchParams) {
  const instance = params.useSecondBackend ? axiosInstance2 : axiosInstance1;
  return request<TResponse>({ method: 'PUT', ...params }, instance);
}
