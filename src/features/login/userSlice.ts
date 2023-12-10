import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import type { RootState } from '../../app/store';

/**
 * Type for the state of `userSlice`.
 */
export interface UserState {
  /** A `UserCredential` instance from Firebase. */
  credential: UserCredential | undefined;
}

const initialState: UserState = {
  credential: undefined,
};

/**
 * Redux slice for user state.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Add the logged-in user. Call when logging-in users.
     * @param state - State of the slice.
     * @param action - Action to be performed.
     *
     * @returns Updated state.
     */
    addUser: (state, action: PayloadAction<UserCredential>) => ({
      credential: action.payload,
    }),

    /**
     * Clear the user state. Call when user is logged-out.
     *
     * @returns Default user state.
     */
    deleteUser: () => ({ credential: undefined }),
  },
});

export const { addUser, deleteUser } = userSlice.actions;

/**
 * Select user credential from the redux store.
 *
 * @param state - State of the Redux store.
 *
 * @returns UserCredential.
 */
export const selectCredential = (state: RootState) => state.user.credential;

export default userSlice.reducer;
