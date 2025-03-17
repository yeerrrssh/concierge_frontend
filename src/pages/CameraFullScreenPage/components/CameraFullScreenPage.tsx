import { Video } from '../../../components/Video';

export const CameraFullScreenPage = () => {
  return (
    <div className="relative pt-28 pl-8">
      <Video hasViolation isOpened />
    </div>
  );
};
