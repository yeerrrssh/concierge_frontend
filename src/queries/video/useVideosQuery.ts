import { UseQueryOptions } from '@tanstack/react-query';
import { useExtendedQuery } from '../core';
import { getVideos } from '../../data/video';
import { VideosResponse } from '../../types/video';

export function useVideosQuery(
  cameraId: string,
  queryOptions?: Omit<UseQueryOptions<VideosResponse>, 'queryKey' | 'queryFn'>,
) {
  return useExtendedQuery({
    ...queryOptions,
    queryKey: ['videos', cameraId],
    queryFn: ({ signal }) => getVideos(cameraId, signal),
  });
}
