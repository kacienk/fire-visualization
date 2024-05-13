import { getDefaultSector, Sector } from '../sector';
import { getDefaultSensor, Sensor } from '../sensor';
import { Camera, getDefaultCamera } from '../camera';
import { FireBrigade, getDefaultFireBrigade } from '../FireBrigade';
import { ForesterPatrol, getDefaultForesterPatrol } from '../ForesterPatrol';
import { Region } from '../geography';

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
  getBounds: (configuration: Configuration): google.maps.LatLngBoundsLiteral => {
    return {
      east: configuration.location.reduce((maxLng: number, { longitude }) => {
        if (longitude > maxLng) maxLng = longitude;
        return maxLng;
      }, -Infinity), // lng
      north: configuration.location.reduce((maxLat: number, { latitude }) => {
        if (latitude > maxLat) maxLat = latitude;
        return maxLat;
      }, -Infinity), // lat
      south: configuration.location.reduce((minLat: number, { latitude }) => {
        if (latitude < minLat) minLat = latitude;
        return minLat;
      }, Infinity), // lat
      west: configuration.location.reduce((minLng: number, { longitude }) => {
        if (longitude < minLng) minLng = longitude;
        return minLng;
      }, Infinity), // lng
    };
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
