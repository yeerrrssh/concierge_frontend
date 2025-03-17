import { Camera as CameraType } from '../../../types/camera';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';

export const Camera = ({ camera }: { camera: CameraType }) => {
  const navigate = useNavigate();

  return (
    <button
      className="text-lg font-medium text-surface-400 w-fit ml-2"
      onClick={() =>
        navigate(
          `../${generatePath(ROUTES.camera.info, {
            id: camera.id,
          })}`,
          { replace: true },
        )
      }
    >
      {camera.address.name}
    </button>
  );
};
