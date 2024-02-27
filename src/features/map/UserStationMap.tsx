/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import stationService from '../../services/stations';
import {
  IStation,
  StationPayload,
  addStations,
  selectStations,
} from '../FileUpload/stationSlice';

/**
 * Renders a map with all the user-added stations
 */
export default function UserStationMap(): JSX.Element {
  const initialised = useRef(false);
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectStations);

  useEffect(() => {
    async function fillDefaultStations() {
      const defaultStations = await stationService.getAll();
      const simplifiedStations: Array<StationPayload> = [];
      defaultStations.stations.forEach((element: IStation) => {
        simplifiedStations.push({
          name: element.Name,
          sid: element.SId,
          x: element.x,
          y: element.y,
        });
      });
      if (!initialised.current) {
        initialised.current = true;
        dispatch(addStations(simplifiedStations));
      }
    }

    fillDefaultStations();
  }, []);

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
      {stations.map((station) => (
        <Marker key={station.sid} position={[station.y, station.x]} />
      ))}
    </MapContainer>
  );
}
