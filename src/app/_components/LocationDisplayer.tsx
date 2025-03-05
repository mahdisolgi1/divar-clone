import { useState, ReactNode } from "react";
import { Modal } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IoCloseOutline } from "react-icons/io5";

const defaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationDisplayerProps {
  lng: number;
  lat: number;
  modalContent?: ReactNode;
}

const LocationDisplayer: React.FC<LocationDisplayerProps> = ({
  lng,
  lat,
  modalContent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div onClick={handleClick} className="w-full h-64 cursor-pointer">
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          className="w-full h-full"
          dragging={false}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]} icon={defaultIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="absolute top-1/2 left-1/2 h-[480px] w-[800px] bg-white shadow-2xl rounded-2xl transform -translate-x-1/2 -translate-y-1/2">
          {modalContent ? (
            modalContent
          ) : (
            <div className="flex justify-between items-center p-3">
              <span
                onClick={closeModal}
                className="p-2 flex justify-center items-center cursor-pointer hover:bg-black-light-100  rounded-full"
              >
                <IoCloseOutline className="text-black-secondary text-2xl" />
              </span>
              <h2 className="text-black-primary text-base">موقعیت مکانی</h2>
            </div>
          )}

          <MapContainer
            center={[lat, lng]}
            zoom={13}
            attributionControl={false}
            className="w-full h-full "
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={defaultIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </Modal>
    </div>
  );
};

export default LocationDisplayer;
