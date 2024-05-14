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
