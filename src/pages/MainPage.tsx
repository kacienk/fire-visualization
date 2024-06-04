// material-ui
import { Grid } from '@mui/material';

// maps
import { MapWrapper } from '../components/maps/MapWrapper';
import { MainMap } from '../components/maps/MainMap';

// configuration
import { ConfigurationForm } from '../components/configuration/ConfigurationForm';
import { SectorDetails } from '../components/configuration/SectorConfiguration';

export const MainPage = () => {
  return (
    <Grid
      container
      rowSpacing={4.5}
      columnSpacing={2.75}
    >
      <MapWrapper>
        <MainMap />
      </MapWrapper>
      <Grid
        item
        xs={12}
      >
        <SectorDetails />
      </Grid>
    </Grid>
  );
};
