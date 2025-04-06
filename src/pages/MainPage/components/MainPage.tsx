import { Camera } from '../../../components/Camera/components/Camera.tsx';
import { useCamerasQuery } from '../../../queries/camera';
import { Map } from "../../../components/Map";
import {useState} from "react";
import {Tab} from "../../../components/Tab";

export const MainPage = () => {
  const [camerasViewMode, setCamerasViewMode] = useState<'map' | 'list'>('map');
  const { data: cameras = [], isPending } = useCamerasQuery();

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (cameras.length === 0) {
    return <div>Камеры не обнаружены</div>;
  }

  const camerasDemo = cameras.concat(
    [
      {
        id: '10',
        address: {
          id: '10',
          name: 'г. Красноярск, ул. Ленина, д. 23',
        },
        connection: '10',
      },
      {
        id: '20',
        address: {
          id: '20',
          name: 'г. Красноярск, ул. Сурикова, д. 6',
        },
        connection: '20',
      },
      {
        id: '30',
        address: {
          id: '30',
          name: 'г. Красноярск, ул. Конституции СССР, д. 27',
        },
        connection: '30',
      },
      {
        id: '40',
        address: {
          id: '40',
          name: 'г. Красноярск, ул. Новосибирская, д. 3',
        },
        connection: '40',
      },
      {
        id: '50',
        address: {
          id: '50',
          name: 'г. Красноярск, ул. Урицкого, д. 125а',
        },
        connection: '50',
      },
    ]
  );

  return (
      <div className="pt-20 pl-8 pb-9">
        <div className="flex flex-row items-center gap-4 mb-5">
          <Tab
            changeToggle={() => setCamerasViewMode('map')}
            title="Карта"
            isSelected={camerasViewMode === 'map'}
          />
          <Tab
            changeToggle={() => setCamerasViewMode('list')}
            title="Список"
            isSelected={camerasViewMode === 'list'}
          />
        </div>
        {camerasViewMode === 'list' ? (
          <div className="grid grid-cols-3 gap-x-10 gap-y-8">
            {camerasDemo.map((camera) => (
              <Camera key={camera.id} camera={camera}/>
            ))}
          </div>
        ) : (
          <Map />
        )}
      </div>
  );
};
