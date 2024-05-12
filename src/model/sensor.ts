const SensorTypes = ['TEMPERATURE_AND_AIR_HUMIDITY', 'WIND_SPEED', 'WIND_DIRECTION', 'LITTER_MOISTURE', 'PM2_5', 'CO2'];

type SensorType = (typeof SensorTypes)[number];

interface Sensor {
  sensorId: number;
  sensorType: SensorType;
  location: MapLocation;
  timestamp: Date;
}
