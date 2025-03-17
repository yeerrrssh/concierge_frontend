import { useExtendedQuery } from '../core';
import { UseQueryOptions } from '@tanstack/react-query';
import { Camera } from '../../types/camera';
import { getCameras } from '../../data/camera';

export function useCamerasQuery(
  queryOptions?: Omit<UseQueryOptions<Camera[]>, 'queryKey' | 'queryFn'>,
) {
  return useExtendedQuery({
    ...queryOptions,
    queryKey: ['cameras'],
    queryFn: ({ signal }) => getCameras(signal),
  });
}
