import React, { useEffect, useState } from 'react';
import { List, Pagination } from '@mui/material';
import StationService from '../../services/stations';
import StationListItem from './StationListItem';

export interface SimpleStation {
  name: string;
  SId: number;
  x: number;
  y: number;
}

/**
 * A list of buttons containing the name of the station along with a page selection group.
 */
export default function StationList(): React.JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [stations, setStations] = useState<Array<SimpleStation>>([]);

  useEffect(() => {
    async function getPageCount() {
      const count = await StationService.getPageCount();
      setPageCount(count);
    }

    getPageCount();
  }, []);

  useEffect(() => {
    async function updateStations() {
      const newStations = await StationService.getByPage(page - 1);
      setStations(newStations);
    }

    updateStations();
  }, [page]);

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
        {stations.map((station) => (
          <StationListItem name={station.name} key={station.SId} />
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
