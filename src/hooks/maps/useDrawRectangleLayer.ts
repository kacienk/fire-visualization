import { useMemo, useState } from 'react';
import { EditableGeoJsonLayer, DrawPolygonMode, FeatureCollection } from '@deck.gl-community/editable-layers';

export const useDrawRectangleLayer = () => {
  const [features, setFeatures] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [selectedFeatureIndexes] = useState([]);

  return useMemo(
    () =>
      new EditableGeoJsonLayer({
        id: 'DrawRectangle',
        data: features,
        selectedFeatureIndexes,
        mode: DrawPolygonMode,

        onEdit: (updatedData) => {
          console.debug(updatedData);
        },
        getFillColor: [0, 255, 0, 100],
        getLineColor: [0, 255, 0, 200],
        getLineWidth: 30,
        lineWidthMinPixels: 1,
      }),
    [],
  );
};
