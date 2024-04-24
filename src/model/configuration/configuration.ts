import { Sector } from '../sector';

interface Configuration {
  forestId: number;
  forestName: string;
  width: number;
  height: number;
  sectorSize: number;
  imageReference: string;
  location: LocationRect;
  sectors: Sector[];
  sensors: Sensor[];
  cameras: Camera[];
  fireBrigades: FireBrigade[];
  foresterPatrols: ForesterPatrol[];
}

export const getDefaultConfigution = (): Configuration => {
  return {
    forestId: 0,
    forestName: '',
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
    sectors: [],
    sensors: [],
    cameras: [],
    fireBrigades: [],
    foresterPatrols: [],
  };
};
