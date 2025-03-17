import { get } from '../http';
import { VideosResponse, VideosAtDateResponse } from '../../types/video';

const makeVideoUrl = (path?: string) => `/v1/camera${path ?? ''}`;

export const getVideos = (cameraId: string, signal?: AbortSignal) => {
  return get<VideosResponse>({
    url: makeVideoUrl(`/${cameraId}`),
    signal,
    useSecondBackend: true,
  });
};

export const getVideosAtDate = (
  cameraId: string,
  startDate?: string | undefined,
  endDate?: string | undefined,
  signal?: AbortSignal,
) => {
  return get<VideosAtDateResponse>({
    url: makeVideoUrl(
      `/${cameraId}/videos?${!!startDate ? `start=${startDate + (!!endDate ? `&finish=${endDate}` : '')}` : !!endDate ? `finish=${endDate}` : ''}`,
    ),
    signal,
    useSecondBackend: true,
  });
};
