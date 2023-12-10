import React, { useState, Dispatch, SetStateAction } from 'react';
import { MapContainer, useMapEvent, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useField } from '../../app/hooks';
import { IStation } from '../listView/stationSlice';
import stationServices from '../../services/stations';
import { selectCredential } from '../login/userSlice';

/**
 * Type for position data.
 */
interface PositionData {
  lat: number;
  lng: number;
}

enum Kaupunki {
  helsinki = 'Helsinki',
  espoo = 'Espoo',
}

/**
 * Type guard for Kaupunki in {@link IStation}.
 * @param param - String to be checked.
 *
 * @returns True if `param` is either `Helsinki` or `Espoo`.
 */
const isKaupunki = (param: string): param is Kaupunki =>
  Object.values(Kaupunki)
    .map((v) => v.toString())
    .includes(param);

enum Stad {
  helsingfors = 'Helsingfors',
  esbo = 'Esbo',
}

/**
 * Type guard for Stad in {@link IStation}.
 * @param param - String to be checked.
 *
 * @returns True if `param` is either `Helsingfors` or `Esbo`.
 */
const isStad = (param: string): param is Stad =>
  Object.values(Stad)
    .map((v) => v.toString())
    .includes(param);

/**
 * Props type for {@link MapFunction}
 */
export interface MapFunctionProps {
  /** The `set` function for `currentPosition` state. */
  setCurrentPosition: Dispatch<SetStateAction<PositionData | null>>;

  /** The `set` function for `showPromote` state. */
  setShowPromote: Dispatch<SetStateAction<boolean>>;
}

/**
 * A function used by `react-leaflet` to handle click. When clicked,
 * record the position of the clicked point and change `showPromote`
 * state to `true` for visualising {@link MapDialog}.
 * @param props - Props for the function. Implemented at {@link MapFunctionProps}.
 */
export function MapFunction(props: MapFunctionProps): null {
  const { setCurrentPosition, setShowPromote } = props;
  useMapEvent('click', (e: LeafletMouseEvent) => {
    const newPosition: PositionData = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };
    setCurrentPosition(newPosition);
    setShowPromote(true);
  });

  return null;
}

/**
 * Props type for {@link MapDialog}
 */
export interface MapDialogProps {
  /** A state to determine whether to show this dialog. */
  showPromote: boolean;

  /** The `set` function for `showPromote`. */
  setShowPromote: Dispatch<SetStateAction<boolean>>;

  /** The location data of the clicked point. */
  position: PositionData | null;
}

/**
 * Renders a dialog with a form for adding information of a new station when
 * the map is clicked.
 *
 * @param props - Prop for the component. Implemented at {@link MapDialogProps}.
 */
export function MapDialog(props: MapDialogProps): JSX.Element {
  const { showPromote, setShowPromote, position } = props;
  const name = useField('text');
  const namn = useField('text');
  const nimi = useField('text');
  const osoite = useField('text');
  const adress = useField('text');
  const kaupunki = useField('text');
  const stad = useField('text');
  const capacity = useField('number');
  const token = useAppSelector(selectCredential);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!token) {
      setNotification('Not signed in');
      return null;
    }
    if (!position) {
      setNotification('Invalid position');
      return null;
    }
    if (!isKaupunki(kaupunki.value)) {
      setNotification('Kaupungin tulee olla joko Helsinki tai Espoo');
      return null;
    }
    if (!isStad(stad.value)) {
      setNotification('Staden måste vara antingen Helsingfors eller Esbo');
      return null;
    }
    const newStation: Omit<IStation, 'SId'> = {
      x: position.lat,
      y: position.lng,
      Name: name.value,
      Nimi: nimi.value,
      Namn: namn.value,
      Osoite: osoite.value,
      Adress: adress.value,
      Kaupunki: kaupunki.value,
      Stad: stad.value,
      Capacity: parseInt(capacity.value, 10),
    };
    const userId = await token.user.getIdToken();
    const response = await stationServices.createSingleStation(
      newStation,
      userId,
    );
    if (response.status !== 201) {
      setNotification(response.data);
      return null;
    }
    navigate('/user/stations/map');

    return <p>Redricting...</p>;
  };

  return (
    <Dialog open={showPromote} onClose={() => setShowPromote(false)}>
      {notification && <Alert severity="error">{notification}</Alert>}
      <DialogTitle>Enter new station information</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" component="div">
          latitude: {position?.lat} longitude: {position?.lng}
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="new-station-name"
          label="name"
          aria-label="name of new station"
          fullWidth
          value={name.value}
          onChange={name.onChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="new-station-nimi"
          label="nimi"
          aria-label="uuden pyöräaseman nimi"
          fullWidth
          value={nimi.value}
          onChange={nimi.onChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="new-station-namn"
          label="namn"
          aria-label="namnet på den nya cykelstationen"
          fullWidth
          value={namn.value}
          onChange={namn.onChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="new-station-osoite"
          label="osoite"
          aria-label="uuden pyöräaseman osoite"
          fullWidth
          value={osoite.value}
          onChange={osoite.onChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="new-station-adress"
          label="adress"
          aria-label="adress till den nya cykelstationen"
          fullWidth
          value={adress.value}
          onChange={adress.onChange}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
            <FormLabel id="kaupunki-radio-form-label">Kaupunki</FormLabel>
            <RadioGroup
              aria-label="kaupungin nimi"
              defaultValue="Helsinki"
              name="kaupunki-buttons-group"
              value={kaupunki.value}
              onChange={kaupunki.onChange}
            >
              <FormControlLabel
                value="Helsinki"
                control={<Radio />}
                label="Helsinki"
              />
              <FormControlLabel
                value="Espoo"
                control={<Radio />}
                label="Espoo"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="stad-radio-form-label">Stad</FormLabel>
            <RadioGroup
              aria-label="namnet på staden"
              defaultValue="Helsingfors"
              name="stad-buttons-group"
              value={stad.value}
              onChange={stad.onChange}
              sx={{ display: 'flex' }}
            >
              <FormControlLabel
                value="Helsingfors"
                control={<Radio />}
                label="Helsingfors"
              />
              <FormControlLabel value="Esbo" control={<Radio />} label="Esbo" />
            </RadioGroup>
          </FormControl>
        </Box>
        <TextField
          autoFocus
          margin="dense"
          id="new-station-capacity"
          label="capacity"
          aria-label="capacity of the new station"
          fullWidth
          value={capacity.value}
          onChange={capacity.onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setShowPromote(false);
            setNotification(null);
          }}
        >
          cancel
        </Button>
        <Button onClick={handleCreate}>create</Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * Renders a map which can be clicked to add new stations.
 */
export default function AddStationMap(): JSX.Element {
  const [currentPosition, setCurrentPosition] = useState<PositionData | null>(
    null,
  );
  const [showPromote, setShowPromote] = useState<boolean>(false);

  return (
    <div>
      <MapContainer
        center={[60.171003, 24.941497]}
        zoom={13}
        style={{ height: '500px', width: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFunction
          setCurrentPosition={setCurrentPosition}
          setShowPromote={setShowPromote}
        />
      </MapContainer>
      <MapDialog
        setShowPromote={setShowPromote}
        showPromote={showPromote}
        position={currentPosition}
      />
    </div>
  );
}
