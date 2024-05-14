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
import { Configuration } from '../../model/configuration/configuration';
import { useForestBorderLayer } from '../../hooks/maps/useForestBorderLayer';
import { useSectorsLayer } from '../../hooks/maps/useSectorsLayer';

export const MapWrapper = () => {
  const bounds = Configuration.getBounds(mapConfigMockup);

  const forestBorderLayer = useForestBorderLayer(mapConfigMockup);
  const sectorsLayer = useSectorsLayer(mapConfigMockup);

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
                <DeckGlOverlay layers={[forestBorderLayer, sectorsLayer]} />
              </Map>
            </Box>
          </APIProvider>
        </MainCard>
      </Grid>
    </>
  );
};
