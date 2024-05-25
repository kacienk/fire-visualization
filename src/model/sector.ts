import { Direction } from './geography';

export const SectorTypes = ['DECIDUOUS', 'MIXED', 'CONIFEROUS', 'FIELD', 'FALLOW', 'WATER', 'UNTRACKED'] as const;

type SectorType = (typeof SectorTypes)[number];

export interface Sector {
  sectorId: number;
  row: number;
  column: number;
  sectorType: SectorType;
  initialState: SectorState;
  contours: [number, number][];
}

interface SectorState {
  temperature: number;
  windSpeed: number;
  windDirection: Direction;
  airHumidity: number;
  plantLitterMoisture: number;
  co2Concentration: number;
  pm2_5Concentration: number;
}

export const getDefaultSector = (): Sector => {
  return {
    sectorId: 0,
    row: 0,
    column: 0,
    sectorType: 'DECIDUOUS',
    initialState: {
      temperature: 0,
      windSpeed: 0,
      windDirection: 'NE',
      airHumidity: 0,
      plantLitterMoisture: 0,
      co2Concentration: 0,
      pm2_5Concentration: 0,
    },
    contours: [],
  };
};
