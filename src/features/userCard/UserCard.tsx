import React, { Dispatch as ReactDispatch, SetStateAction } from 'react';
import { Card, CardContent, Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import firebaseClient from '../../utils/firebase-client-config';
import { deleteUser, UserState } from '../login/userSlice';
import { useAppDispatch } from '../../app/hooks';

/**
 * Sign out current user from Firebase.
 *
 * @param dispatch - dispatch action from the appDispatch hook.
 */
const handleLogoutDefault = async (
  dispatch: ThunkDispatch<
    {
      user: UserState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  const auth = getAuth(firebaseClient);
  await signOut(auth);
  dispatch(deleteUser());
};

/**
 * Props type for {@link UserCard}.
 */
export interface UserCardProps {
  /** Email of the current user. */
  email: string | null;

  /** The `set` function of state `showCard`. Controls the
   * visibility of the user card.
   */
  setShowCard: ReactDispatch<SetStateAction<boolean>>;

  /** Function used by the log-out button to sign out current user. */
  handleLogout?: (
    dispatch: ThunkDispatch<
      {
        user: UserState;
      },
      undefined,
      AnyAction
    > &
      Dispatch<AnyAction>,
  ) => Promise<void>;
}

/**
 * Renders a card with current user information. When logged-in,
 * display user email, buttons to user's own added stations
 * and journeys respectively, and a button for log out.
 *
 * @param props - Props for the component. Implemented at {@link UserCardProps}.
 *
 */
export default function UserCard(props: UserCardProps): JSX.Element {
  const { email, setShowCard } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const handleLogout = props.handleLogout
    ? // eslint-disable-next-line react/destructuring-assignment
      props.handleLogout
    : handleLogoutDefault;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        position: 'absolute',
        top: '100%',
        right: '1%',
        zIndex: 1,
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: `linear-gradient(to bottom, ${theme.palette.primary.light} 20%, ${theme.palette.background.paper} 20%)`,
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AccountCircle fontSize="large" />
        <CardContent sx={{ flex: '1 0 auto', alignItems: 'center' }}>
          <Typography
            component="div"
            color="text.secondary"
            variant="subtitle1"
          >
            {email}
          </Typography>
        </CardContent>
        {email && (
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <IconButton
              size="medium"
              aria-label="My station"
              onClick={() => {
                setShowCard(false);
                navigate('/user/stations/map');
              }}
            >
              <PedalBikeIcon />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="My journey"
              onClick={() => {}}
            >
              <DirectionsBikeIcon />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="Logout"
              onClick={() => handleLogout(dispatch)}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
  );
}
