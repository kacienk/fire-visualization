// maps
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DeckGlOverlay } from './DeckGlOverlay';
import { getDeckGlLayers } from '../../utils/maps/getDeckGlLayers';

// maps styles overrides
/**
 * This is a workaround to disable blue border around map component
 * when it is clicked
 */
import './maps-styles-overrides.css';

// material-ui
import { Grid, Box } from '@mui/material';
import { MainCard } from '../MainCard';

export const MapWrapper = () => {
  // 49.5599264763197, 20.132385645406604
  // 49.49921247019953, 20.254446675807113
  const boundsOchotnica: google.maps.LatLngBoundsLiteral = {
    east: 20.254446675807113, // lng
    north: 49.5599264763197, // lat
    south: 49.49921247019953, // lat
    west: 20.132385645406604, // lng
  };

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{ mb: -2.25 }}
      >
        <MainCard
          hasContent={false}
          sx={{ mt: 1.5 }}
        >
          <APIProvider apiKey={window.env.GOOGLE_API_KEY}>
            <Box sx={{ height: '800px' /* TODO fix fixed height */ }}>
              <Map defaultBounds={boundsOchotnica}>
                <DeckGlOverlay layers={getDeckGlLayers()} />
              </Map>
            </Box>
          </APIProvider>
        </MainCard>
      </Grid>
    </>
  );
};
