import React from 'react';
import { Card, CardContent, Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserCard(props: {
  username: string | undefined;
  email: string | undefined;
}) {
  const { username, email } = props;
  const theme = useTheme();
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
          <Typography component="div" variant="h6">
            {username}
          </Typography>
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
          <IconButton size="medium" aria-label="Logout" onClick={() => {}}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
