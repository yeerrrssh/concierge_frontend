import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';
import { Video } from '../../../components/Video';
import { Tab } from '../../../components/Tab';
import { InfoTable } from '../../../components/InfoTable';
import { useCallback, useEffect, useState } from 'react';
import {
  LOCAL_MONTH_END,
  LOCAL_MONTH_START,
  LOCAL_TODAY_END,
  LOCAL_TODAY_START,
  LOCAL_WEEK_END,
  LOCAL_WEEK_START,
  tabs,
} from '../consts.ts';
import { TimePicker } from '../../../components/TimePicker';
import { useVideosAtDateQuery } from '../../../queries/video';
import { useCameraEventsQuery } from '../../../queries/camera';
import { areArraysEqual } from '../../../utils/array';

export const CameraInfoPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [currentVideoLink, setCurrentVideoLink] = useState('');
  const [dateRange, setDateRange] = useState<(string | null)[]>([
    LOCAL_TODAY_START,
    LOCAL_TODAY_END,
  ]);
  const [toggle, setToggle] = useState<tabs | undefined>(tabs.todayTab);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cameraId = pathname.slice(8, -5);

  const {
    data: videos,
    isPending: isVideosPending,
    refetch: refetchVideos,
  } = useVideosAtDateQuery({
    cameraId: cameraId,
    startDate: dateRange[0] ?? undefined,
    endDate: dateRange[1] ?? undefined,
  });

  const {
    data: events = [],
    isPending: isEventsPending,
    refetch: refetchEvents,
  } = useCameraEventsQuery({
    cameraId,
    startDate: dateRange[0] ?? undefined,
    endDate: dateRange[1] ?? undefined,
  });

  useEffect(() => {
    if (videos?.videos?.[0]) {
      setCurrentVideoLink(videos.videos[0].link);
      setCurrentVideoIndex(0);
    }
  }, [videos]);

  const handleTabChange = useCallback((selectedTab: tabs) => {
    setToggle(selectedTab);
    switch (selectedTab) {
      case tabs.todayTab:
        setDateRange([LOCAL_TODAY_START, LOCAL_TODAY_END]);
        break;
      case tabs.weekTab:
        setDateRange([LOCAL_WEEK_START, LOCAL_WEEK_END]);
        break;
      case tabs.monthTab:
        setDateRange([LOCAL_MONTH_START, LOCAL_MONTH_END]);
        break;
      default:
        break;
    }
  }, []);

  const selectNextVideo = () => {
    if (videos && currentVideoIndex > 0) {
      setCurrentVideoLink(videos.videos[currentVideoIndex - 1].link);
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  useEffect(() => {
    if (
      !areArraysEqual(dateRange, [LOCAL_TODAY_START, LOCAL_TODAY_END]) &&
      !areArraysEqual(dateRange, [LOCAL_WEEK_START, LOCAL_WEEK_END]) &&
      !areArraysEqual(dateRange, [LOCAL_MONTH_START, LOCAL_MONTH_END])
    ) {
      setToggle(undefined);
    }
  }, [dateRange]);

  useEffect(() => {
    refetchVideos();
    refetchEvents();
  }, [dateRange, refetchVideos, refetchEvents]);

  if (isVideosPending || isEventsPending) {
    return <p>Загрузка...</p>;
  }

  if (!videos) {
    return <p>Видео не найдены</p>;
  }

  return (
    <div className="w-full flex flex-col pt-9 px-8 gap-20">
      <div className="flex flex-col gap-12">
        <button
          className="max-w-fit bg-purple text-sm font-medium text-surface-50 py-0.5 pl-8 pr-12 rounded-lg"
          onClick={() => navigate(ROUTES.root)}
        >
          <div className="flex flex-row items-center max-w-fit">
            <img className="w-8 h-8" src="/arrow-left.svg" alt="go back" />
            <span>Камеры</span>
          </div>
        </button>
        <div className="flex flex-row items-center justify-between">
          <TimePicker
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            setDateRange={setDateRange}
          />
          <div className="flex flex-row items-center gap-4">
            <Tab
              changeToggle={() => handleTabChange(tabs.todayTab)}
              title="Сегодня"
              isSelected={toggle === tabs.todayTab}
            />
            <Tab
              changeToggle={() => handleTabChange(tabs.weekTab)}
              title="Неделя"
              isSelected={toggle === tabs.weekTab}
            />
            <Tab
              changeToggle={() => handleTabChange(tabs.monthTab)}
              title="Месяц"
              isSelected={toggle === tabs.monthTab}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <Video link={currentVideoLink} selectNextVideo={selectNextVideo} />
        <InfoTable
          videos={videos.videos}
          events={events}
          selectedVideoUrl={currentVideoLink}
          selectVideoUrl={setCurrentVideoLink}
          selectVideoIndex={setCurrentVideoIndex}
        />
      </div>
    </div>
  );
};
