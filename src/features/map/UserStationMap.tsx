/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  // useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  // useMapEvent,
} from 'react-leaflet';
import L from 'leaflet';
import { useAppSelector } from '../../app/hooks';
import { selectStations, selectedStation } from '../FileUpload/stationSlice';
import StationItem from '../detailView/StationItem';
import redPin from '../../location-pin.svg';

export function PopUpCentre({
  setMoved,
}: {
  setMoved: Dispatch<SetStateAction<boolean>>;
}) {
  // const map = useMapEvent('popupopen', (e) => {
  //   const px = map.project(e.target._popup._latlng);
  //   console.log(e.target);
  //   px.y -= e.target._popup._container.clientHeight * e.target._zoom;
  //   map.panTo(map.unproject(px), { animate: true });
  // });
  const location = useAppSelector(selectedStation);
  const map = useMap();

  useEffect(() => {
    if (location.x && location.y) {
      map.panTo({ lat: location.y, lng: location.x });
      setMoved(true);
    }
  }, [location]);

  return null;
}

/**
 * Renders a map with all the user-added stations
 */
export default function UserStationMap(): JSX.Element {
  const stations = useAppSelector(selectStations);
  const location = useAppSelector(selectedStation);
  const [moved, setMoved] = useState<boolean>(false);

  const redIcon = new L.Icon({
    iconUrl: redPin,
    iconRetinaUrl: redPin,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
    iconAnchor: [16, 45],
  });

  useEffect(() => {
    if (moved) {
      setTimeout(() => {
        setMoved(false);
      }, 1000);
    }
  }, [moved]);

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
      <PopUpCentre setMoved={setMoved} />
      {moved && (
        <Marker
          icon={redIcon}
          position={[location.y as number, location.x as number]}
        />
      )}
      {stations.map((station) => (
        <Marker key={station.sid} position={[station.y, station.x]}>
          <Popup minWidth={480} autoPan>
            <StationItem id={String(station.sid)} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
