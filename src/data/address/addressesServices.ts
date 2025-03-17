import { get } from '../http';
import { AddressResponse } from '../../types/camera';

const ADDRESSES_URL = '/management/addresses';

export const getAddresses = (signal?: AbortSignal) => {
  return get<AddressResponse[]>({
    url: ADDRESSES_URL,
    signal,
  });
};
