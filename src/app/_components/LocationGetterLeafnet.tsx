import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  selectedProvince: [number, number];
  onPosition: (position: [number, number]) => void;
}

const CenterMarker = ({
  onPosition,
}: {
  onPosition: (position: [number, number]) => void;
}) => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      const newPosition: [number, number] = [center.lat, center.lng];
      if (position[0] !== newPosition[0] || position[1] !== newPosition[1]) {
        setPosition(newPosition);
        onPosition(newPosition);
      }
    },
  });

  return <Marker position={position} icon={icon} />;
};

export default function LeafletMap({ selectedProvince, onPosition }: MapProps) {
  return (
    <MapContainer
      center={selectedProvince}
      zoom={12}
      zoomControl={false}
      className="w-full h-[400px] relative -z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <CenterMarker onPosition={onPosition} />
    </MapContainer>
  );
}
