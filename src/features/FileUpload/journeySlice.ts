/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

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

export interface JourneyPayload {
  departID: number;
  returnID: number;
  distance: number;
  duration: number;
}

export interface JourneyState {
  journeys: Array<JourneyPayload>;
}

const initialState: JourneyState = {
  journeys: [],
};

export const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: {
    addJourney: (state, action: PayloadAction<JourneyPayload>) => {
      state.journeys.push(action.payload);
    },
    addJourneys: (state, action: PayloadAction<Array<JourneyPayload>>) => {
      state.journeys = state.journeys.concat(action.payload);
    },
  },
});

export const { addJourney, addJourneys } = journeySlice.actions;

export const selectJourneys = (state: RootState) => state.journey.journeys;

export default journeySlice.reducer;
