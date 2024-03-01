import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Login from './features/login/Login';
import firebaseClient from './utils/firebase-client-config';
import NaviBar from './features/navigation/NaviBar';
import SignUp from './features/signUp/SignUp';
import AddStationMap from './features/map/AddStationMap';
import UserStationMap from './features/map/UserStationMap';
import StationList from './features/listView/StationList';

/**
 * Renders the main page of the frontend. Contains the tool bar and welcome page.
 */
function App(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <NaviBar />
      <br />
      <Routes>
        <Route path="/" element={<h1>Welcome!</h1>} />
        <Route path="/login" element={<Login firebaseApp={firebaseClient} />} />
        <Route
          path="/signup"
          element={<SignUp firebaseApp={firebaseClient} />}
        />
        <Route
          path="/user/stations/map"
          element={
            <div style={{ display: 'flex' }}>
              <div style={{ width: '30%' }}>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<AddLocationAltIcon />}
                  onClick={() => {
                    navigate('/user/stations/map/single');
                  }}
                  sx={{
                    width: '100%',
                  }}
                >
                  new station
                </Button>
                <StationList />
              </div>
              <UserStationMap />
            </div>
          }
        />
        <Route path="/user/stations/map/single" element={<AddStationMap />} />
        <Route path="/stations/list" element={<StationList />} />
      </Routes>
    </div>
  );
}

export default App;
