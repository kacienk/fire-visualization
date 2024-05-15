// maps
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DeckGlOverlay } from './DeckGlOverlay';

// maps styles overrides
/**
 * This is a workaround to disable blue border around map component
 * when it is clicked
 */
import './maps-styles-overrides.css';

// material-ui
import { Grid, Box } from '@mui/material';
import { MainCard } from '../MainCard';
import { ReactNode, useState } from 'react';
import { Configuration } from '../../model/configuration/configuration';
import { useForestBorderLayer } from '../../hooks/maps/useForestBorderLayer';
import { useSectorsLayer } from '../../hooks/maps/useSectorsLayer';
import { useSelectedSectorLayer } from '../../hooks/maps/useSelectedSectorLayer';
import { useOnSectorChange } from '../../hooks/maps/useOnSectorChange';
import { useOnTooltipChange } from '../../hooks/maps/useOnTooltipChange';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxStore';

export const MapWrapper = () => {
  const mapConfiguration = useSelector((state: RootState) => state.mapConfiguration);

  const [tooltip, setTooltip] = useState<ReactNode>(null);
  const [currentSectorId, setCurrentSectorId] = useState<number | null>(null);

  const bounds = Configuration.getBounds(mapConfiguration);

  const forestBorderLayer = useForestBorderLayer(mapConfiguration);
  const sectorsLayer = useSectorsLayer(mapConfiguration);
  const selectedSectorLayer = useSelectedSectorLayer(
    mapConfiguration.sectors.find(({ sectorId }) => sectorId === currentSectorId),
  );

  useOnTooltipChange(setTooltip);
  useOnSectorChange(setCurrentSectorId);

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
                <DeckGlOverlay layers={[forestBorderLayer, sectorsLayer, selectedSectorLayer]} />
              </Map>
            </Box>
          </APIProvider>
        </MainCard>
      </Grid>
    </>
  );
};
