import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletEvent } from 'leaflet';
import { useMemo } from 'react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const blueMarkerIcon = new L.Icon({
    iconUrl: '/marker-dark-blue.png',
    iconSize: [32, 41],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
});

const redMarkerIcon = new L.Icon({
    iconUrl: '/marker-red.png',
    iconSize: [32, 41],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
});

export const Map = () => {
    const center: [number, number] = [56.0106, 92.8526];

    const markers = useMemo(() => [
        {
            position: [56.014182, 92.889007],
            label: 'г. Красноярск, ул. Ленина, д. 5а',
            isRed: true,
        },
        {
            position: [56.014125, 92.883393],
            label: 'г. Красноярск, ул. Ленина, д. 23',
            isRed: false,
        },
        {
            position: [56.009102, 92.877235],
            label: 'г. Красноярск, ул. Сурикова, д. 6',
            isRed: false,
        },
        {
            position: [56.017268, 92.882436],
            label: 'г. Красноярск, ул. Конституции СССР, д. 27',
            isRed: false,
        },
        {
            position: [56.017886, 92.823914],
            label: 'г. Красноярск, ул. Новосибирская, д. 3',
            isRed: false,
        },
        {
            position: [56.008168, 92.860864],
            label: 'г. Красноярск, ул. Урицкого, д. 125а',
            isRed: false,
        },
    ] as { position: [number, number]; label: string, isRed: boolean }[], []);

    return (
        <div
            style={{
                position: 'relative',
                zIndex: 0,
                height: '100vh',
                width: '100vw',
            }}
            key={crypto.randomUUID()}
        >
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                whenReady={((event: LeafletEvent) => {
                    console.log('Map is ready', event.target);
                }) as () => void}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {markers.map((marker, idx) => (
                    <Marker
                        key={idx}
                        icon={marker.isRed ? redMarkerIcon : blueMarkerIcon}
                        position={marker.position}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.bindPopup(marker.label).openPopup();
                            },
                            mouseout: (e) => {
                                e.target.closePopup();
                            },
                            click: () => {
                                if (marker.isRed) {
                                    window.location.href = '/camera/7a1bff7a-bc67-4c64-bf34-9261abc5cecf/info';
                                }
                            },
                        }}
                    >
                        <Popup>{marker.label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
