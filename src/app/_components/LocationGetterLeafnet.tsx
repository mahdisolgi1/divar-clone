import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
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
}

const CenterMarker = ({
  selectedProvince,
}: {
  selectedProvince: [number, number];
}) => {
  const [position, setPosition] = useState<[number, number]>(selectedProvince);
  const map = useMap();

  useEffect(() => {
    map.setView(selectedProvince, map.getZoom());
    setPosition(selectedProvince);
  }, [selectedProvince, map]);

  useMapEvents({
    move: () => {
      const center = map.getCenter();
      setPosition([center.lat, center.lng]);
      console.log(position);
    },
  });

  return <Marker position={position} icon={icon} />;
};

export default function LeafletMap({ selectedProvince }: MapProps) {
  return (
    <MapContainer
      center={selectedProvince}
      zoom={12}
      zoomControl={false}
      className="w-full h-[400px]  relative "
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <CenterMarker selectedProvince={selectedProvince} />
    </MapContainer>
  );
}
