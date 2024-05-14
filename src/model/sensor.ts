import { MapLocation } from './geography';

export const SensorTypes = [
  'TEMPERATURE_AND_AIR_HUMIDITY',
  'WIND_SPEED',
  'WIND_DIRECTION',
  'LITTER_MOISTURE',
  'PM2_5',
  'CO2',
];

export type SensorType = (typeof SensorTypes)[number];

export interface Sensor {
  sensorId: number;
  sensorType: SensorType;
  location: MapLocation;
  timestamp: Date;
}

export const getDefaultSensor = (): Sensor => {
  return {
    sensorId: 0,
    sensorType: 'CO2',
    location: {
      latitude: 0,
      longitude: 0,
    },
    timestamp: new Date(Date.now()),
  };
};
