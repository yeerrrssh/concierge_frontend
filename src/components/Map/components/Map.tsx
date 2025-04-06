import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export const Map = () => {
    const center: [number, number] = [56.0106, 92.8526];

    const markers: { position: [number, number]; label: string }[] = [
        {
            position: [56.014182, 92.889007],
            label: 'г. Красноярск, ул. Ленина, д. 5а',
        },
        {
            position: [56.014125, 92.883393],
            label: 'г. Красноярск, ул. Ленина, д. 23',
        },
        {
            position: [56.009102, 92.877235],
            label: 'г. Красноярск, ул. Сурикова, д. 6',
        },
        {
            position: [56.017268, 92.882436],
            label: 'г. Красноярск, ул. Конституции СССР, д. 27',
        },
        {
            position: [56.017886, 92.823914],
            label: 'г. Красноярск, ул. Новосибирская, д. 3',
        },
        {
            position: [56.008168, 92.860864],
            label: 'г. Красноярск, ул. Урицкого, д. 125а',
        },
    ];

    return (
        <div style={{height: '75vh', width: '95vw'}}>
            <MapContainer
                center={center}
                zoom={13}
                style={{height: '100%', width: '100%'}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {markers.map((marker, idx) => (
                    <Marker
                        key={idx}
                        position={marker.position}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.bindPopup(marker.label).openPopup();
                            },
                            mouseout: (e) => {
                                e.target.closePopup();
                            },
                            click: () => {
                                window.location.href = '/camera/7a1bff7a-bc67-4c64-bf34-9261abc5cecf/info';
                            },
                        }}
                    >
                        <Popup>
                            {marker.label}
                        </Popup>
                    </Marker>
                    ))}
            </MapContainer>
        </div>
);
};
