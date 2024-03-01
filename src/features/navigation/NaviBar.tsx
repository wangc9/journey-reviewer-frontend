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
import { useAppSelector } from '../../app/hooks';
import UserCard from '../userCard/UserCard';
import { selectCredential } from '../login/userSlice';

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

/**
 * Renders a `menu` button.
 */
export function StyledMenu(): JSX.Element {
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

/**
 * Renders the app name "journey viewer".
 */
export function StyledHeadline(): JSX.Element {
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

/**
 * Renders a search bar with "Search..." as the placeholder.
 */
export function StyledSearchBar(): JSX.Element {
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

/**
 * Renders a button with GitHub icon. Navigate to the GitHub repo when clicked.
 */
export function StyledGitHubIcon(): JSX.Element {
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

/**
 * Renders a button with map icon. Navigate to
 * `/user/stations/map/single` when clicked. A description
 * "Map View" appears when the browser size is greater than
 * middle.
 */
export function StyledMapIcon(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        sx={{ display: { xs: 'none', md: 'flex' } }}
        startIcon={<MapIcon />}
        color="inherit"
        onClick={() => navigate('/user/stations/map')}
      >
        Map View
      </Button>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
        onClick={() => navigate('/user/stations/map')}
      >
        <MapIcon />
      </IconButton>
    </div>
  );
}

/**
 * Renders a button with list icon. A description "List View"
 * appear when the browser size is greater than middle.
 */
export function StyledListIcon(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        sx={{ display: { xs: 'none', md: 'flex' } }}
        startIcon={<ListIcon />}
        color="inherit"
        onClick={() => navigate('/stations/list')}
      >
        List View
      </Button>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
        onClick={() => navigate('/stations/list')}
      >
        <ListIcon />
      </IconButton>
    </div>
  );
}

/**
 * Prop for {@link NotificationWithBadge}
 */
export interface NotificationWithBadgeProp {
  /** Number of new notifications */
  badge: number;
}

/**
 * Renders a button with a notification icon and a badge displaying
 * the number of unread messages
 *
 * @param props - prop for the component. Implemented at {@link NotificationWithBadgeProp}.
 */
export function NotificationWithBadge(
  props: NotificationWithBadgeProp,
): JSX.Element {
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

/**
 * Prop for {@link StyledAccountIcon}
 */
export interface StyledAccountIconProp {
  /** Email of the user. Input `null` when not logged in. */
  email: string | null;
}

/**
 * Renders a button with an account icon. When not logged-in,
 * clicking the button redirects to `/login` page for user login. When logged-in,
 *
 * @param props - Prop for the component. Implemented at {@link StyledAccountIconProp}.
 */
export function StyledAccountIcon(props: StyledAccountIconProp): JSX.Element {
  const [showCard, setShowCard] = useState<boolean>(false);
  const navigate = useNavigate();
  const { email } = props;

  const handleButtonClick = () => {
    if (email || (!email && showCard)) {
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
      {showCard && <UserCard email={email} setShowCard={setShowCard} />}
    </div>
  );
}

/**
 * Prop for {@link MobileMoreIcon}.
 */
export interface MobileMoreIconProp {
  /** Function when button is clicked. */
  handleMobileOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Renders a button with "three-dot" icon.
 *
 * @param props - Prop for the component. Implemented at {@link MobileMoreIconProp}.
 */
export function MobileMoreIcon(props: MobileMoreIconProp): JSX.Element {
  const { handleMobileOpen } = props;
  return (
    <IconButton
      id="mobile-more-icon"
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

/**
 * Renders a navigation bar.
 */
export default function NaviBar(): JSX.Element {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [mobileAnchor, setMobileAnchor] = useState<null | HTMLElement>(null);
  const credential = useAppSelector(selectCredential);

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
            <StyledAccountIcon
              email={credential ? credential.user.email : null}
            />
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
          <StyledAccountIcon
            email={credential ? credential.user.email : null}
          />
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
