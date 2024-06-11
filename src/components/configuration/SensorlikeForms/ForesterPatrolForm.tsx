import { useFormikContext } from 'formik';
import { FC } from 'react';
import { Sensor, SensorTypes } from '../../../model/sensor';
import { ConfigFormDropDown, ConfigGridContainer } from '../configuration';
import { FireBrigade } from '../../../model/FireBrigade';
import { ForesterPatrol } from '../../../model/ForesterPatrol';

export const ForesterPatrolForm: FC = () => {
  const { values } = useFormikContext<ForesterPatrol>();

  return <></>;
};
