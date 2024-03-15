import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  StationPayload,
  pointStation,
  selectStations,
} from '../FileUpload/stationSlice';

export interface StationListItemProps {
  name: string;
}

/**
 * A single list button displaying the name of the station.
 *
 * @param props - {@link StationListItemProps}
 */
export default function StationListItem(
  props: StationListItemProps,
): React.JSX.Element {
  const { name } = props;
  const stations = useAppSelector(selectStations);
  const dispatch = useAppDispatch();
  const { x, y } = stations.find(
    (station) => station.name === name,
  ) as StationPayload;

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        onClick={() => {
          dispatch(pointStation({ x, y }));
        }}
      >
        <ListItemText primary={name} />
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ArrowForwardIosIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
