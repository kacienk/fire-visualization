import { useFormikContext } from 'formik';
import { FC } from 'react';
import { Sensor, SensorTypes } from '../../model/sensor';
import { ConfigFormDropDown, ConfigGridContainer } from './configuration';

export const SensorForm: FC = () => {
  const { values } = useFormikContext<Sensor>();

  return (
    <>
      <ConfigFormDropDown
        allVariants={SensorTypes}
        objectName={'sensors'}
        propertyName={'sensorType'}
        readOnly={false}
      />
    </>
  );
};
