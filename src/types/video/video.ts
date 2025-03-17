export type Video = {
  id: number;
  link: string;
  start: Date;
  finish: Date;
};

export type VideoAtDate = Video & {
  detect: boolean;
};

export type VideosResponse = {
  videos: Video[];
};

export type VideosAtDateResponse = {
  videos: VideoAtDate[];
};
