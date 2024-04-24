export const SectorTypes = ['DECIDUOUS', 'MIXED', 'CONIFEROUS', 'FIELD', 'FALLOW', 'WATER', 'UNTRACKED'] as const;

type SectorType = (typeof SectorTypes)[number];

export interface Sector {
  sectorId: number;
  row: number;
  column: number;
  sectorType: SectorType;
  initialState: SectorState;
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
