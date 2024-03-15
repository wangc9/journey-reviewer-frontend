import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StationServices, { StationCountTuple } from '../../services/stations';

export interface StationItemProps {
  id: string;
}

export interface StationItemState {
  name: string;
  address: string;
  startCount: number;
  endCount: number;
  avgStart: number;
  avgEnd: number;
  departList: Array<StationCountTuple<string, number>>;
  destList: Array<StationCountTuple<string, number>>;
}

export default function StationItem(
  props: StationItemProps,
): React.JSX.Element {
  const { id } = props;

  const [station, setStation] = useState<StationItemState | null>(null);

  useEffect(() => {
    async function getStation() {
      const stationDetail = await StationServices.getById(id);
      setStation(stationDetail);
    }

    getStation();
  }, []);

  return (
    <Card>
      <CardHeader
        title={station?.name}
        subheader={station?.address}
        sx={{ paddingY: 1 }}
      />
      <CardContent sx={{ paddingY: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%',
              paddingRight: 4,
            }}
          >
            <Typography variant="body2" color="CaptionText" fontWeight={700}>
              Departure:
            </Typography>
            <Typography variant="body2" color="InfoText" fontWeight={400}>
              {station?.startCount}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%',
            }}
          >
            <Typography variant="body2" color="CaptionText" fontWeight={700}>
              Arrival:
            </Typography>
            <Typography variant="body2" color="InfoText" fontWeight={400}>
              {station?.endCount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%',
              paddingRight: 4,
            }}
          >
            <Typography variant="body2" color="CaptionText" fontWeight={700}>
              Avg. departure distance (m):
            </Typography>
            <Typography variant="body2" color="InfoText" fontWeight={400}>
              {station?.avgStart.toFixed(1)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%',
            }}
          >
            <Typography variant="body2" color="CaptionText" fontWeight={700}>
              Avg. arrival distance (m):
            </Typography>
            <Typography variant="body2" color="InfoText" fontWeight={400}>
              {station?.avgEnd.toFixed(1)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              paddingRight: 4,
            }}
          >
            <Typography variant="body2" color="CaptionText" fontWeight={700}>
              Popular departure stations:
            </Typography>
            <ul>
              {station?.departList.map((stationTuple) => (
                <li key={stationTuple[0]}>
                  <Typography variant="body2" color="InfoText" fontWeight={400}>
                    {stationTuple[0]}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <Typography variant="body2" color="CaptionText" fontWeight={700}>
              Popular destination stations:
            </Typography>
            <ul>
              {station?.destList.map((stationTuple) => (
                <li key={stationTuple[0]}>
                  <Typography variant="body2" color="InfoText" fontWeight={400}>
                    {stationTuple[0]}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
