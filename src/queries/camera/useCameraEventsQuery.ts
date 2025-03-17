import { UseQueryOptions } from '@tanstack/react-query';
import { CameraEvent } from '../../types/camera';
import { useExtendedQuery } from '../core';
import { getCameraEvents } from '../../data/camera';

type Props = {
  cameraId: string;
  startDate?: string;
  endDate?: string;
  queryOptions?: Omit<UseQueryOptions<CameraEvent[]>, 'queryKey' | 'queryFn'>;
};

export function useCameraEventsQuery({
  cameraId,
  startDate,
  endDate,
  queryOptions,
}: Props) {
  return useExtendedQuery({
    ...queryOptions,
    queryKey: ['camera-events', cameraId],
    queryFn: ({ signal }) =>
      getCameraEvents(cameraId, startDate, endDate, signal),
  });
}
