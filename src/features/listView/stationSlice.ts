import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import type { RootState } from '../../app/store';
import stationServices from '../../services/stations';

export interface IStation {
  SId: number;
  Nimi: string;
  Namn: string;
  Name: string;
  Osoite: string;
  Adress: string;
  Kaupunki: 'Helsinki' | 'Espoo';
  Stad: 'Helsingfors' | 'Esbo';
  Capacity: number;
  x: number;
  y: number;
}
export interface StationState {
  stations: Array<IStation>;
}

const initialState: StationState = {
  stations: [],
};

export const pStationSlice = createSlice({
  name: 'pStation',
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Array<IStation>>) => {
      state.stations.push(...action.payload);
    },
  },
});

export const { setStations } = pStationSlice.actions;

export const initialiseStations =
  (user: UserCredential) => async (dispatch: Dispatch) => {
    const stations = await stationServices.getByUser(user.user.uid);
    dispatch(setStations(stations));
  };

export const selectPersonalStations = (state: RootState) =>
  state.pStation.stations;

export default pStationSlice.reducer;
