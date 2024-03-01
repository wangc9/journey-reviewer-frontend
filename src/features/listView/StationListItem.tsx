import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
