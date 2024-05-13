// material-ui
import { Grid } from '@mui/material';
import { MapWrapper } from '../components/maps/MapWrapper';
import { MainCard } from '../components/MainCard';
import { ConfigurationForm } from '../components/configuration/ConfigurationForm';
import { useState, useEffect } from 'react';
import { eventEmitter } from '../utils/eventEmitter';

export const MainPage = () => {
  const [currentSector, setCurrentSector] = useState<number | null>(null);
  useEffect(() => {
    const onSectorChange = (sectorId: number | null) => setCurrentSector(sectorId);

    eventEmitter.addListener('onSectorChange', onSectorChange);

    return () => {
      eventEmitter.removeListener('onSectorChange', onSectorChange);
    };
  }, []);

  useEffect(() => console.debug(currentSector), [currentSector]);

  return (
    <Grid
      container
      rowSpacing={4.5}
      columnSpacing={2.75}
    >
      <MapWrapper />
      <Grid
        item
        xs={12}
      >
        <MainCard sx={{ mt: 2 }}>
          <ConfigurationForm />
        </MainCard>
      </Grid>
    </Grid>
  );
};
