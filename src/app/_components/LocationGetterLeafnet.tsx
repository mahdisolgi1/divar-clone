import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  selectedCity: [number, number];
  onPosition: (position: [number, number]) => void;
}

const CenterMarker = ({ onPosition }: { onPosition: (position: [number, number]) => void }) => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const map = useMap();

  useEffect(() => {
    if (position[0] === 0 && position[1] === 0) {
      const center = map.getCenter();
      const newPosition: [number, number] = [center.lat, center.lng];
      setPosition(newPosition);
      onPosition(newPosition);
    }
  }, []);

  useMapEvents({
    click: (e) => {
      const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      onPosition(newPosition);
    },
    moveend: (e) => {
      const center = e.target.getCenter();
      const newPosition: [number, number] = [center.lat, center.lng];
      setPosition(newPosition);
      onPosition(newPosition);
    },
  });

  return <Marker position={position} icon={icon} />;
};
export default function LeafletMap({ selectedCity, onPosition }: MapProps) {
  return (
    <div className="w-full h-[400px] relative">
      <MapContainer
        center={selectedCity}
        zoom={12}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
        className="w-full h-full"
        style={{ zIndex: 1 }}  // Remove negative z-index
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <CenterMarker onPosition={onPosition} />
      </MapContainer>
    </div>
  );
}