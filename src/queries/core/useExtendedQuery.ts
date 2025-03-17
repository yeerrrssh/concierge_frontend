import {
  DefaultError,
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useCallback } from 'react';

export type UseExtendedQueryResult<
  TData = unknown,
  TError = DefaultError,
> = UseQueryResult<TData, TError> & {
  invalidate: () => void;
};

export function useExtendedQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseExtendedQueryResult<TData, TError> {
  const queryResult = useQuery({
    retry: false,
    ...options,
  });
  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: options.queryKey });
  }, [queryClient, options.queryKey]);

  return {
    ...queryResult,
    invalidate,
  };
}
