/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

/**
 * Station type.
 */
export interface IStation {
  /** Station id. */
  SId: number;

  /** Station name in Finnish. */
  Nimi: string;

  /** Station name in Swedish. */
  Namn: string;

  /** Station name in English. */
  Name: string;

  /** Street address in Finnish. */
  Osoite: string;

  /** Street address in Swedish. */
  Adress: string;

  /** Name of the city in Finnish. */
  Kaupunki: 'Helsinki' | 'Espoo';

  /** Name of the city in Swedish. */
  Stad: 'Helsingfors' | 'Esbo';

  /** Capacity of the station. */
  Capacity: number;

  /** Latitude of the station. */
  x: number;

  /** Longitude of the station. */
  y: number;
}

export interface StationPayload {
  sid: number;
  name: string;
  x: number;
  y: number;
}

export interface LocationPayload {
  x: number | null;
  y: number | null;
}

export interface StationState {
  stations: Array<StationPayload>;
  location: LocationPayload;
}

const initialState: StationState = {
  stations: [],
  location: { x: null, y: null },
};

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    addStation: (state, action: PayloadAction<StationPayload>) => {
      state.stations.push(action.payload);
    },
    addStations: (state, action: PayloadAction<Array<StationPayload>>) => {
      state.stations = state.stations.concat(action.payload);
    },
    pointStation: (state, action: PayloadAction<LocationPayload>) => {
      state.location = action.payload;
    },
  },
});

export const { addStation, addStations, pointStation } = stationSlice.actions;

export const selectStations = (state: RootState) => state.station.stations;
export const selectedStation = (state: RootState) => state.station.location;

export default stationSlice.reducer;
