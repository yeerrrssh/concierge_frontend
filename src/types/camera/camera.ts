export type CameraAtAddress = {
  id: string;
  connection: string;
};

export type Address = {
  id: string;
  name: string;
};

export type AddressResponse = Address & {
  cameras: CameraAtAddress[];
};

export type Camera = {
  id: string;
  address: Address;
  connection: string;
};

export type CameraEvent = {
  id: string;
  video_id: number;
  name: string;
  is_emergency: boolean;
  dt_from: string;
  dt_to: string;
};
