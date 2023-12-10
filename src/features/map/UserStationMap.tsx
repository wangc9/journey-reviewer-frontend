import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

/**
 * Renders a map with all the user-added stations
 */
export default function UserStationMap(): JSX.Element {
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
