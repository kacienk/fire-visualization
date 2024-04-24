// maps
import { PolygonLayer } from '@deck.gl/layers';

// data
import { mapConfigMockup } from '../../data/sectorsMockup';

export const getDeckGlLayers = () => {
  return [
    new PolygonLayer<
      {
        longitude: number;
        latitude: number;
      }[]
    >({
      id: 'ForestBorders',
      data: [mapConfigMockup.location],

      extruded: false,
      filled: false,
      stroked: true,
      getPolygon: (points) => points.map((point) => [point.longitude, point.latitude]),
      getLineColor: [0, 255, 0],
      getLineWidth: 30,
      lineWidthMinPixels: 1,
      pickable: true,
    }),
    new PolygonLayer({
      id: 'PolygonLayer',
      data: mapConfigMockup.sectors,

      extruded: false,
      filled: false,
      stroked: true,
      getPolygon: (sector) => sector.contours,
      getLineColor: [255, 0, 0],
      getLineWidth: 20,
      lineWidthMinPixels: 1,
      pickable: true,
    }),
  ];
};
