// maps
import { PolygonLayer } from '@deck.gl/layers';

// data
import { sectorsMockup } from '../../data/sectorsMockup';

export const getDeckGlLayers = () => {
  return [
    new PolygonLayer({
      id: 'PolygonLayer',
      data: sectorsMockup,

      extruded: false,
      filled: false,
      stroked: true,
      getPolygon: (sector: { contours: number[][] }) => sector.contours,
      getLineColor: [255, 0, 0],
      getLineWidth: 20,
      lineWidthMinPixels: 1,
      pickable: true,
    }),
    new PolygonLayer({
      id: 'ForestBorders',
      data: [
        {
          contours: [
            [20.132385645406604, 49.49921247019953],
            [20.132385645406604, 49.5599264763197],
            [20.254446675807113, 49.5599264763197],
            [20.254446675807113, 49.49921247019953],
          ],
        },
      ],

      extruded: false,
      filled: false,
      stroked: true,
      getPolygon: (sector: { contours: number[][] }) => sector.contours,
      getLineColor: [0, 255, 0],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      pickable: true,
    }),
  ];
};
