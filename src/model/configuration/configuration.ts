import { getDefaultSector, Sector } from '../sector';
import { getDefaultSensor, Sensor } from '../sensor';
import { Camera, getDefaultCamera } from '../camera';
import { FireBrigade, getDefaultFireBrigade } from '../FireBrigade';
import { ForesterPatrol, getDefaultForesterPatrol } from '../ForesterPatrol';
import { Region } from '../geography';
import { linspace } from '../../utils/linspace';
import { ProcessedSector } from '../processedSector';

export interface Forest {
  forestId: number;
  forestName: string;
  width: number;
  height: number;
  sectorSize: number;
  imageReference: string;
  location: Region;
}

export interface Configuration extends Forest {
  sectors: Sector[];
  sensors: Sensor[];
  cameras: Camera[];
  fireBrigades: FireBrigade[];
  foresterPatrols: ForesterPatrol[];
}

export const Configuration = {
  getBounds: ({ location }: Configuration): google.maps.LatLngBoundsLiteral => {
    return {
      east: location.reduce((maxLng: number, { longitude }) => {
        if (longitude > maxLng) maxLng = longitude;
        return maxLng;
      }, -Infinity), // lng
      north: location.reduce((maxLat: number, { latitude }) => {
        if (latitude > maxLat) maxLat = latitude;
        return maxLat;
      }, -Infinity), // lat
      south: location.reduce((minLat: number, { latitude }) => {
        if (latitude < minLat) minLat = latitude;
        return minLat;
      }, Infinity), // lat
      west: location.reduce((minLng: number, { longitude }) => {
        if (longitude < minLng) minLng = longitude;
        return minLng;
      }, Infinity), // lng
    };
  },
  preprocessSectors: (configuration: Configuration) => {
    const { sectors: rawSectors, width, height, sectorSize } = configuration;
    // the solution with width, height, sectorSize of the map is stupid
    const sectorRows = Math.floor(height / sectorSize);
    const sectorCols = Math.floor(width / sectorSize);

    const { east, north, south, west } = Configuration.getBounds(configuration);
    const linspaceLat = linspace(south, north, sectorRows);
    const linspaceLng = linspace(west, east, sectorCols);

    return rawSectors.map((rawSector) => {
      const rowIdx = rawSector.row - 1;
      const colIdx = rawSector.column - 1;
      return {
        ...rawSector,
        contours: [
          [linspaceLng[colIdx], linspaceLat[rowIdx]],
          [linspaceLng[colIdx], linspaceLat[rowIdx + 1]],
          [linspaceLng[colIdx + 1], linspaceLat[rowIdx + 1]],
          [linspaceLng[colIdx + 1], linspaceLat[rowIdx]],
        ],
      };
    });
  },
  sectors: {
    toString: (sector: ProcessedSector) => {
      return `Forest type: ${sector.sectorType}
        Temperature: ${sector.initialState.temperature}
        Wind speed: ${sector.initialState.windSpeed}
        Wind direction: ${sector.initialState.windDirection}
        Air humidity: ${sector.initialState.airHumidity}
        Plant litter moisture: ${sector.initialState.plantLitterMoisture}
        CO2 concentration: ${sector.initialState.co2Concentration}
        PM 2.5 concentration: ${sector.initialState.pm2_5Concentration}`;
    },
  },
};

export const getDefaultConfigution = (): Configuration => {
  return {
    forestId: 0,
    forestName: 'Wolski',
    width: 0,
    height: 0,
    sectorSize: 0,
    imageReference: '',
    location: [
      {
        latitude: 0,
        longitude: 0,
      },
      {
        latitude: 0,
        longitude: 0,
      },
      {
        latitude: 0,
        longitude: 0,
      },
      {
        latitude: 0,
        longitude: 0,
      },
    ],
    sectors: [getDefaultSector()],
    sensors: [getDefaultSensor()],
    cameras: [getDefaultCamera()],
    fireBrigades: [getDefaultFireBrigade()],
    foresterPatrols: [getDefaultForesterPatrol()],
  };
};
