// material-ui
import { Grid } from '@mui/material';
import { MapWrapper } from '../components/maps/MapWrapper';
import { MainCard } from '../components/MainCard';
import { ConfigurationForm } from '../components/configuration/ConfigurationForm';

export const MainPage = () => {
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
