/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Badge,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import MoreIcon from '@mui/icons-material/MoreVert';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import UserCard from '../userCard/UserCard';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function StyledMenu() {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );
}

function StyledHeadline() {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ display: { xs: 'none', sm: 'block' } }}
    >
      JOURNEY VIEWER
    </Typography>
  );
}

function StyledSearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

function StyledGitHubIcon() {
  return (
    <IconButton
      size="large"
      aria-label="github"
      color="inherit"
      onClick={() => {
        window.location.href =
          'https://github.com/wangc9/journey-reviewer-frontend';
      }}
    >
      <GitHubIcon />
    </IconButton>
  );
}

function StyledMapIcon() {
  return (
    <div>
      <Button
        sx={{ display: { xs: 'none', md: 'flex' } }}
        startIcon={<MapIcon />}
        color="inherit"
      >
        Map View
      </Button>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
      >
        <MapIcon />
      </IconButton>
    </div>
  );
}

function StyledListIcon() {
  return (
    <div>
      <Button
        sx={{ display: { xs: 'none', md: 'flex' } }}
        startIcon={<ListIcon />}
        color="inherit"
      >
        List View
      </Button>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
      >
        <ListIcon />
      </IconButton>
    </div>
  );
}

function NotificationWithBadge(props: { badge: number }) {
  const { badge } = props;
  return (
    <IconButton
      size="large"
      aria-label="show new notifications"
      color="inherit"
    >
      {badge === 0 ? (
        <NotificationsIcon />
      ) : (
        <Badge badgeContent={badge} color="error">
          <NotificationsIcon />
        </Badge>
      )}
    </IconButton>
  );
}

function StyledAccountIcon(props: {
  username: string | undefined;
  email: string | undefined;
}) {
  const [showCard, setShowCard] = useState<boolean>(false);
  const navigate = useNavigate();
  const { username, email } = props;

  const handleButtonClick = () => {
    if (username && email) {
      setShowCard(!showCard);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="normal-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleButtonClick}
      >
        <AccountCircle />
      </IconButton>
      {showCard && <UserCard username={username} email={email} />}
    </div>
  );
}

function MobileMoreIcon(props: {
  handleMobileOpen: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const { handleMobileOpen } = props;
  return (
    <IconButton
      size="large"
      aria-label="show more"
      aria-controls="mobile-menu"
      aria-haspopup="true"
      onClick={handleMobileOpen}
      color="inherit"
    >
      <MoreIcon />
    </IconButton>
  );
}

export default function NaviBar() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [mobileAnchor, setMobileAnchor] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchor);
  const isMobileOpen = Boolean(mobileAnchor);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleMobileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchor(event.currentTarget);
  };

  const handleMobileClose = () => {
    setMobileAnchor(null);
  };

  const handleMenuClose = () => {
    setAnchor(null);
    handleMobileClose();
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledMenu />
          <StyledHeadline />
          <StyledSearchBar />
          <Box sx={{ display: 'flex', flex: 1 }}>
            <StyledMapIcon />
            <StyledListIcon />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <StyledGitHubIcon />
            <NotificationWithBadge badge={0} />
            <StyledAccountIcon username={undefined} email={undefined} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileMoreIcon handleMobileOpen={handleMobileOpen} />
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={mobileAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="mobile-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileOpen}
        onClose={handleMobileClose}
      >
        {/* TODO: Add route for notifications */}
        <MenuItem>
          <NotificationWithBadge badge={0} />
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleMenuOpen}>
          <StyledAccountIcon username={undefined} email={undefined} />
          <p>Profile</p>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="normal-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </Box>
  );
}
