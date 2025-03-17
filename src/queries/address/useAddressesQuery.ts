import { UseQueryOptions } from '@tanstack/react-query';
import { AddressResponse } from '../../types/camera';
import { useExtendedQuery } from '../core';
import { getAddresses } from '../../data/address';

export function useAddressesQuery(
  queryOptions?: Omit<
    UseQueryOptions<AddressResponse[]>,
    'queryKey' | 'queryFn'
  >,
) {
  return useExtendedQuery({
    ...queryOptions,
    queryKey: ['addresses'],
    queryFn: ({ signal }) => getAddresses(signal),
  });
}
