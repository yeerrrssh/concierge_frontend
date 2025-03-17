import { UseQueryOptions } from '@tanstack/react-query';
import { VideosAtDateResponse } from '../../types/video';
import { useExtendedQuery } from '../core';
import { getVideosAtDate } from '../../data/video';

type Props = {
  cameraId: string;
  startDate?: string;
  endDate?: string;
  queryOptions?: Omit<
    UseQueryOptions<VideosAtDateResponse>,
    'queryKey' | 'queryFn'
  >;
};

export function useVideosAtDateQuery({
  cameraId,
  startDate,
  endDate,
  queryOptions,
}: Props) {
  return useExtendedQuery({
    ...queryOptions,
    queryKey: [],
    queryFn: ({ signal }) =>
      getVideosAtDate(cameraId, startDate, endDate, signal),
  });
}
