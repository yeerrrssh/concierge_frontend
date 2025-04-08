import { Camera as CameraType } from '../../../types/camera';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';

export const Camera = ({ camera, isFirst }: { camera: CameraType, isFirst: boolean }) => {
  const navigate = useNavigate();

  return (
    <button
      className="text-lg font-medium text-surface-400 w-fit ml-2 flex flex-row items-center gap-3"
      onClick={() => {
          if (isFirst) {
              navigate(
                  `../${generatePath(ROUTES.camera.info, {
                      id: camera.id,
                  })}`,
                  { replace: true },
              )
          }
      }}
    >
      <img className="w-5 h-6" src={isFirst ? '/marker-red.png': '/marker-dark-blue.png'} alt="Logo" />
      <span>{camera.address.name}</span>
    </button>
  );
};
