import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/login/userSlice';
// import pStationReducer from '../features/listView/stationSlice';
import stationReducer from '../features/FileUpload/stationSlice';
import journeyReducer from '../features/FileUpload/journeySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    station: stationReducer,
    journey: journeyReducer,
    // pStation: pStationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
