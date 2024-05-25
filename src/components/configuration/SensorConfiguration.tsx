import { FC } from 'react';
import {
  ConfigArrayForm,
  ConfigFormDropDown,
  ConfigFormTextField,
  ConfigGridContainer,
  ItemFormPartProps,
} from './configuration';
import { useFormikContext } from 'formik';
import { Configuration } from '../../model/configuration/configuration';
import { getDefaultSensor, Sensor, SensorTypes } from '../../model/sensor';
import { Typography } from '@mui/material';

const objectName = 'sensors';

const SensorFormPart: FC<ItemFormPartProps<Sensor>> = ({ idx }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <>
      <Typography variant={'body1'}>Sensor {values.sensors[idx].sensorId}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'sensorId'}
          idx={idx}
          readOnly={true}
        />
        <ConfigFormDropDown
          allVariants={SensorTypes}
          objectName={'sensors'}
          propertyName={'sensorType'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'location.latitude'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'location.longitude'}
          idx={idx}
          type={'number'}
        />
      </ConfigGridContainer>
    </>
  );
};

export const SensorsFormPart: FC = () => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={objectName}
      ChildForm={SensorFormPart}
      defaultObj={getDefaultSensor()}
      data={values.sensors}
    />
  );
};
