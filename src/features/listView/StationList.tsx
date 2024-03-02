import React, { useEffect, useState } from 'react';
import { List, Pagination } from '@mui/material';
import StationListItem from './StationListItem';
import { selectStations } from '../FileUpload/stationSlice';
import { useAppSelector } from '../../app/hooks';

/**
 * A list of buttons containing the name of the station along with a page selection group.
 */
export default function StationList(): React.JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const stations = useAppSelector(selectStations);

  useEffect(() => {
    setPageCount(Math.ceil(stations.length / 10));
  }, [stations]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <nav
      aria-label="station selection"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <List>
        {stations.slice((page - 1) * 10, page * 10).map((station) => (
          <StationListItem name={station.name} key={station.sid} />
        ))}
      </List>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        sx={{ alignSelf: 'center' }}
      />
    </nav>
  );
}
