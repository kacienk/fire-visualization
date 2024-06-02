// maps
import { Map, useMap } from '@vis.gl/react-google-maps';
import { DeckGlOverlay } from './DeckGlOverlay';

// maps styles overrides
/**
 * This is a workaround to disable blue border around map component
 * when it is clicked
 */
import './maps-styles-overrides.css';

// material-ui
import { Grid, Box, Typography } from '@mui/material';
import { MainCard } from '../MainCard';
import { ReactNode, useEffect, useState } from 'react';
import { Configuration } from '../../model/configuration/configuration';
import { useForestBorderLayer } from '../../hooks/maps/useForestBorderLayer';
import { useSectorsLayer } from '../../hooks/maps/useSectorsLayer';
import { useSelectedSectorLayer } from '../../hooks/maps/useSelectedSectorLayer';
import { useOnSectorChange } from '../../hooks/maps/useOnSectorChange';
import { useOnTooltipChange } from '../../hooks/maps/useOnTooltipChange';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxStore';

export const MainMap = () => {
  const map = useMap('main-map');
  const mapConfiguration = useSelector((state: RootState) => state.mapConfiguration.configuration);

  const [tooltip, setTooltip] = useState<ReactNode>(null);
  const [currentSectorId, setCurrentSectorId] = useState<number | null>(null);

  const [bounds, setBounds] = useState(Configuration.getBounds(mapConfiguration));
  useEffect(() => {
    setBounds(Configuration.getBounds(mapConfiguration));
  }, [mapConfiguration]);
  useEffect(() => {
    if (!map) return;
    map.fitBounds(bounds);
  }, [bounds, map]);

  const forestBorderLayer = useForestBorderLayer(mapConfiguration);
  const sectorsLayer = useSectorsLayer(mapConfiguration);
  const selectedSectorLayer = useSelectedSectorLayer(
    mapConfiguration.sectors.find(({ sectorId }) => sectorId === currentSectorId),
  );

  useOnTooltipChange(setTooltip);
  useOnSectorChange(setCurrentSectorId);

  if (Object.values(bounds).every((bound) => bound === 0))
    return (
      <Grid
        item
        xs={12}
        sx={{ mb: -2.25 }}
      >
        <MainCard
          hasContent={false}
          sx={{ mt: 1.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'secondary.light',
              height: '800px' /* TODO fix fixed height */,
            }}
          >
            <Typography variant="h2">No configuration selected!</Typography>
            <Typography variant="h4">Please select a configuration to see the map</Typography>
          </Box>
        </MainCard>
      </Grid>
    );

  return (
    <Grid
      item
      xs={12}
      sx={{ mb: -2.25 }}
    >
      <MainCard
        hasContent={false}
        sx={{ mt: 1.5 }}
      >
        <Box sx={{ height: '800px' /* TODO fix fixed height */ }}>
          <Map
            id="main-map"
            // defaultBounds={bounds}
            onDragstart={() => {
              // hide tooltip when dragging the map
              if (tooltip !== null) setTooltip(null);
            }}
          >
            {tooltip}
            <DeckGlOverlay layers={[forestBorderLayer, sectorsLayer, selectedSectorLayer]} />
          </Map>
        </Box>
      </MainCard>
    </Grid>
  );
};
