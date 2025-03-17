import { get } from '../http';
import { Camera, CameraEvent } from '../../types/camera';

const makeCameraUrl = (path?: string) => `/management/cameras${path ?? ''}`;

export const getCameras = (signal?: AbortSignal) => {
  return get<Camera[]>({
    url: makeCameraUrl(),
    signal,
  });
};

export const getCamera = (cameraId: string, signal?: AbortSignal) => {
  return get<Camera>({
    url: makeCameraUrl(`/${cameraId}`),
    signal,
  });
};

export const getCameraEvents = (
  cameraId: string,
  startDate: string | undefined,
  endDate: string | undefined,
  signal?: AbortSignal,
) => {
  return get<CameraEvent[]>({
    url: makeCameraUrl(
      `/${cameraId}/events?${!!startDate ? `dt_from=${startDate + (!!endDate ? `&dt_to=${endDate}` : '')}` : !!endDate ? `dt_to=${endDate}` : ''}`,
    ),
    signal,
  });
};
