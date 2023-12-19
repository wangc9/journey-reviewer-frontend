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
        attribution='&copy; <a href="https://www.digitransit.fi/en/developers/apis/6-terms-of-use/">Digitransit</a> contributors'
        url="https://cdn.digitransit.fi/map/v2/hsl-map/{z}/{x}/{y}@2x.png?digitransit-subscription-key=e272a3da0ede40f0bfe2b95083b33298"
      />
    </MapContainer>
  );
}
