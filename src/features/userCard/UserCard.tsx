import React from 'react';
import { Card, CardContent, Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import firebaseClient from '../../utils/firebase-client-config';
import { deleteUser, UserState } from '../login/userSlice';
import { useAppDispatch } from '../../app/hooks';

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

export default function UserCard({
  email,
  handleLogout = handleLogoutDefault,
}: {
  email: string | null;
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
}) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
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
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <IconButton size="medium" aria-label="My station" onClick={() => {}}>
            <PedalBikeIcon />
          </IconButton>
          <IconButton size="medium" aria-label="My journey" onClick={() => {}}>
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
      </Box>
    </Card>
  );
}
