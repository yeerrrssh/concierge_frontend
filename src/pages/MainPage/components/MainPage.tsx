import { Camera } from '../../../components/Camera/components/Camera.tsx';
import { useCamerasQuery } from '../../../queries/camera';

export const MainPage = () => {
  const { data: cameras = [], isPending } = useCamerasQuery();

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (cameras.length === 0) {
    return <div>Камеры не обнаружены</div>;
  }

  return (
    <div className="pt-20 pl-8 pb-9">
      <div className="grid grid-cols-3 gap-x-10 gap-y-8">
        {cameras.map((camera) => (
          <Camera key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};
