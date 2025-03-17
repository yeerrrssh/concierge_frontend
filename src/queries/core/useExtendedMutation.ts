import {
  DefaultError,
  QueryClient,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { useRef } from 'react';
import { Override } from '../../types/basic';

type UseExtendedMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Override<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  {
    mutationFn: (variables: TVariables, signal?: AbortSignal) => Promise<TData>;
  }
>;

export function useExtendedMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  {
    mutationFn,
    ...restOptions
  }: UseExtendedMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient,
) {
  const abortControllerRef = useRef<AbortController | null>(null);
  return useMutation(
    {
      ...restOptions,
      mutationFn: (variables) => {
        abortControllerRef.current?.abort?.();
        const newController = new AbortController();
        abortControllerRef.current = newController;

        return mutationFn(variables, newController.signal).finally(() =>
          newController.abort(),
        );
      },
    },
    queryClient,
  );
}
