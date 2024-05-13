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
import { mapConfigMockup } from '../../data/sectorsMockup';
import { ReactNode, useEffect, useState } from 'react';
import { eventEmitter } from '../../utils/eventEmitter';

export const MapWrapper = () => {
  const bounds: google.maps.LatLngBoundsLiteral = {
    east: mapConfigMockup.location.reduce((maxLng: number, { longitude }) => {
      if (longitude > maxLng) maxLng = longitude;
      return maxLng;
    }, -Infinity), // lng
    north: mapConfigMockup.location.reduce((maxLat: number, { latitude }) => {
      if (latitude > maxLat) maxLat = latitude;
      return maxLat;
    }, -Infinity), // lat
    south: mapConfigMockup.location.reduce((minLat: number, { latitude }) => {
      if (latitude < minLat) minLat = latitude;
      return minLat;
    }, Infinity), // lat
    west: mapConfigMockup.location.reduce((minLng: number, { longitude }) => {
      if (longitude < minLng) minLng = longitude;
      return minLng;
    }, Infinity), // lng
  };

  const [tooltip, setTooltip] = useState<ReactNode>(null);
  useEffect(() => {
    const onTooltipChange = (tooltip: ReactNode) => setTooltip(tooltip);

    eventEmitter.addListener('onTooltipChange', onTooltipChange);

    return () => {
      eventEmitter.removeListener('onTooltipChange', onTooltipChange);
    };
  }, []);

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
              <Map
                defaultBounds={bounds}
                onDragstart={() => {
                  // hide tooltip when dragging the map
                  if (tooltip !== null) setTooltip(null);
                }}
              >
                {tooltip}
                <DeckGlOverlay layers={getDeckGlLayers()} />
              </Map>
            </Box>
          </APIProvider>
        </MainCard>
      </Grid>
    </>
  );
};
