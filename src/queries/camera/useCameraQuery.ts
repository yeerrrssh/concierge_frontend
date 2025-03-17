import { UseQueryOptions } from '@tanstack/react-query';
import { Camera } from '../../types/camera';
import { useExtendedQuery } from '../core';
import { getCamera } from '../../data/camera';

export function useCameraQuery(
  cameraId: string,
  queryOptions?: Omit<UseQueryOptions<Camera>, 'queryKey' | 'queryFn'>,
) {
  return useExtendedQuery({
    ...queryOptions,
    queryKey: ['camera', cameraId],
    queryFn: ({ signal }) => getCamera(cameraId, signal),
  });
}
