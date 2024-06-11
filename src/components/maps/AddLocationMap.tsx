import { useEffect, useState } from 'react';

// Maps handling
import { limitTiltRange, Map } from '@vis.gl/react-google-maps';
import DeckGL from '@deck.gl/react';
import { MapViewState } from '@deck.gl/core';
import {
  DrawPointMode,
  EditableGeoJsonLayer,
  FeatureCollection,
  Position,
  ViewMode,
} from '@deck.gl-community/editable-layers';

// MUI components
import { MainCard } from '../MainCard';
import { Box, Button } from '@mui/material';

// Map types and default map location getter
import { MapLocation } from '../../model/geography';
import { getDefaultMapLocation } from '../../model/common';

// Initial state to display the whole Poland
const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 18.85762440671972,
  latitude: 52.17435627305249,
  zoom: 5,
};

const parsePositionToMapLocation = (position: Position): MapLocation => ({
  longitude: position[0],
  latitude: position[1],
});

type AddLocationMapProps = {
  handleSelectedLocation: (location: MapLocation) => void;
};

export const AddLocationMap = ({ handleSelectedLocation }: AddLocationMapProps) => {
  const [features, setFeatures] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const [isLocationDrawn, setIsLocationDrawn] = useState<boolean>(false);
  useEffect(() => {
    if (features.features.length === 1) {
      setIsLocationDrawn(true);
    } else {
      setIsLocationDrawn(false);
    }
  }, [features]);

  const drawLocationLayer = new EditableGeoJsonLayer({
    data: features,
    mode: isDrawing && !isLocationDrawn ? DrawPointMode : ViewMode,
    getLineColor: [194, 13, 0, 100],
    getFillColor: [194, 13, 0, 80],
    getLineWidth: 20,
    onEdit: ({ updatedData }) => {
      const featureCollection = updatedData as FeatureCollection;

      if (
        features.features.length === 0 &&
        featureCollection.features.length === 1 &&
        featureCollection.features[0].geometry.type === 'Point'
      ) {
        setFeatures(updatedData);

        // Parse and save point coordinates as a location
        const locationCoords = featureCollection.features[0].geometry.coordinates;
        const location = parsePositionToMapLocation(locationCoords);

        handleSelectedLocation(location);
      }
    },
    selectedFeatureIndexes: [], // IDK why this is necessary, but without this drawing fails
  });

  const toggleDrawing = () => {
    setIsDrawing((prev) => !prev);
  };

  const handleClearSelectedLocation = () => {
    setFeatures({
      type: 'FeatureCollection',
      features: [],
    });
    handleSelectedLocation(getDefaultMapLocation()); // TODO it will be better to make same required constraint or sth
    setIsDrawing(false);
  };

  return (
    <MainCard
      hasContent={false}
      sx={{ mt: 1.5 }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '500px' /* TODO fix fixed height */ }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={[drawLocationLayer]}
          onViewStateChange={limitTiltRange}
        >
          <Map />
        </DeckGL>
        <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
          {!isLocationDrawn ? (
            !isDrawing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={toggleDrawing}
              >
                Enable selecting location
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={toggleDrawing}
              >
                Disable selecting location
              </Button>
            )
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearSelectedLocation}
              disabled={!isLocationDrawn}
            >
              Clear selected location
            </Button>
          )}
        </Box>
      </Box>
    </MainCard>
  );
};
