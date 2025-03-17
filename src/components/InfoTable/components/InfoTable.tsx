import { Video } from '../../../types/video';
import { dateToString } from '../../../utils/date';
import { CameraEvent } from '../../../types/camera';

type InfoTableProps = {
  videos: Video[];
  events: CameraEvent[];
  selectedVideo: string;
  selectVideo: (url: string) => void;
};

export const InfoTable = ({
  videos,
  events,
  selectedVideo,
  selectVideo,
}: InfoTableProps) => {
  return (
    <div className="w-full flex flex-col bg-surface-50 rounded-xl py-4 max-h-[366px]">
      <div className="flex flex-row items-center px-8">
        <span className="w-[300px] text-lg font-bold">Метка времени</span>
        <span className="w-fit text-lg font-bold">Состояние</span>
      </div>
      <div className="flex flex-col mt-3 max-h-[330px] overflow-y-auto">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => selectVideo(video.link)}
            className={`flex flex-row items-center px-8 py-1.5 text-lg font-medium ${events.find((event) => event.video_id === video.id)?.is_emergency && video.link === selectedVideo ? 'bg-purple text-surface-50' : video.link === selectedVideo ? 'bg-surface-150' : events.find((event) => event.video_id === video.id)?.is_emergency && 'bg-error text-surface-50'}`}
          >
            <div className="flex flex-col w-[300px]">
              <span>{dateToString(video.start, video.finish)}</span>
            </div>
            <div className="flex flex-col">
              <span>
                {events.find((event) => event.video_id === video.id)?.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
