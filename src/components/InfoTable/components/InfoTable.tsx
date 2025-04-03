import { Video } from '../../../types/video';
import { dateToString } from '../../../utils/date';
import { CameraEvent } from '../../../types/camera';

type InfoTableProps = {
  videos: Video[];
  events: CameraEvent[];
  selectedVideoUrl: string;
  selectVideoUrl: (url: string) => void;
  selectVideoIndex: (index: number) => void;
};

export const InfoTable = ({
  videos,
  events,
  selectedVideoUrl,
  selectVideoUrl,
  selectVideoIndex,
}: InfoTableProps) => {
  const selectVideo = (index: number, url: string) => {
    selectVideoIndex(index);
    selectVideoUrl(url);
  };

  return (
    <div className="w-full flex flex-col bg-surface-50 rounded-xl py-4 max-h-[366px]">
      <div className="flex flex-row items-center px-8">
        <span className="w-[300px] text-lg font-bold">Метка времени</span>
        <span className="w-fit text-lg font-bold">Состояние</span>
      </div>
      <div className="flex flex-col mt-3 max-h-[330px] overflow-y-auto">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => selectVideo(index, video.link)}
            className={`flex flex-row items-center px-8 py-1.5 text-lg font-medium ${events.find((event) => event.video_id === video.id)?.is_emergency && video.link === selectedVideoUrl ? 'bg-purple text-surface-50' : video.link === selectedVideoUrl ? 'bg-surface-150' : events.find((event) => event.video_id === video.id)?.is_emergency && 'bg-error text-surface-50'}`}
          >
            <div className="flex flex-col w-[300px]">
              <span>{dateToString(video.start, video.finish)}</span>
            </div>
            <div className="flex flex-col">
              <span>
                {
                  events
                    .filter((event) => event.video_id === video.id)
                    .map((event) => event.name)
                    .join(', ')
                }
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
