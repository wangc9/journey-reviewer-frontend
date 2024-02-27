// import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
// import { UserCredential } from 'firebase/auth';
// import type { RootState } from '../../app/store';
// import stationServices from '../../services/stations';

// /**
//  * Station type.
//  */
// export interface IStation {
//   /** Station id. */
//   SId: number;

//   /** Station name in Finnish. */
//   Nimi: string;

//   /** Station name in Swedish. */
//   Namn: string;

//   /** Station name in English. */
//   Name: string;

//   /** Street address in Finnish. */
//   Osoite: string;

//   /** Street address in Swedish. */
//   Adress: string;

//   /** Name of the city in Finnish. */
//   Kaupunki: 'Helsinki' | 'Espoo';

//   /** Name of the city in Swedish. */
//   Stad: 'Helsingfors' | 'Esbo';

//   /** Capacity of the station. */
//   Capacity: number;

//   /** Latitude of the station. */
//   x: number;

//   /** Longitude of the station. */
//   y: number;
// }

// /**
//  * State type of the station slice.
//  */
// export interface StationState {
//   /** An array of stations added by the user. */
//   stations: Array<IStation>;
// }

// const initialState: StationState = {
//   stations: [],
// };

// export const pStationSlice = createSlice({
//   name: 'pStation',
//   initialState,
//   reducers: {
//     setStations: (state, action: PayloadAction<Array<IStation>>) => {
//       state.stations.push(...action.payload);
//     },
//   },
// });

// export const { setStations } = pStationSlice.actions;

// export const initialiseStations =
//   (user: UserCredential) => async (dispatch: Dispatch) => {
//     const stations = await stationServices.getByUser(user.user.uid);
//     dispatch(setStations(stations));
//   };

// export const selectPersonalStations = (state: RootState) =>
//   state.pStation.stations;

// export default pStationSlice.reducer;
