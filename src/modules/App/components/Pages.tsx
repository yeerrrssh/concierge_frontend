import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage';
import { ROUTES } from '../../../constants/routes.ts';
import { CameraFullScreenPage } from '../../../pages/CameraFullScreenPage';
import { CameraInfoPage } from '../../../pages/CameraInfoPage';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path={ROUTES.root} element={<MainPage />} />
      <Route
        path={ROUTES.camera.fullScreen}
        element={<CameraFullScreenPage />}
      />
      <Route path={ROUTES.camera.info} element={<CameraInfoPage />} />
    </Routes>
  );
};
