import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import type { RootState } from '../../app/store';

export interface UserState {
  credential: UserCredential | undefined;
}

const initialState: UserState = {
  credential: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserCredential>) => ({
      credential: action.payload,
    }),
    deleteUser: () => ({ credential: undefined }),
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const selectCredential = (state: RootState) => state.user.credential;

export default userSlice.reducer;
