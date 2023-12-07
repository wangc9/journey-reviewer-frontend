import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function UserStationMap() {
  return (
    <MapContainer
      center={[60.171033, 24.941497]}
      zoom={13}
      style={{ height: '700px', width: '700px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
