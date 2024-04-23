// material-ui
import { Grid } from '@mui/material';
import { MapWrapper } from '../components/maps/MapWrapper';
import { MainCard } from '../components/MainCard';
import { ParametersForm } from '../components/parameters/ParametersForm';

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
          <ParametersForm />
        </MainCard>
      </Grid>
    </Grid>
  );
};
