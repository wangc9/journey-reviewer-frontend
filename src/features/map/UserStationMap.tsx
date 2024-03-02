/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useAppSelector } from '../../app/hooks';
import { selectStations } from '../FileUpload/stationSlice';

/**
 * Renders a map with all the user-added stations
 */
export default function UserStationMap(): JSX.Element {
  const stations = useAppSelector(selectStations);

  return (
    <MapContainer
      center={[60.171033, 24.941497]}
      zoom={13}
      style={{ height: '80vh', width: '70vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.digitransit.fi/en/developers/apis/6-terms-of-use/">Digitransit</a> contributors'
        url="https://cdn.digitransit.fi/map/v2/hsl-map/{z}/{x}/{y}@2x.png?digitransit-subscription-key=e272a3da0ede40f0bfe2b95083b33298"
      />
      {stations.map((station) => (
        <Marker key={station.sid} position={[station.y, station.x]} />
      ))}
    </MapContainer>
  );
}
