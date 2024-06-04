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
import { Booleanify } from '../../utils/Booleanify';

const objectName = 'sensors';

const SensorFormPart: FC<ItemFormPartProps<Sensor>> = ({ idx, readonly }) => {
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
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.sensorType}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'location.longitude'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.location.longitude}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'location.latitude'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.location.latitude}
        />
      </ConfigGridContainer>
    </>
  );
};

type SensorsFormPartProps = {
  readonly: boolean | Booleanify<Sensor>;
};

export const SensorsFormPart: FC<SensorsFormPartProps> = ({ readonly }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={objectName}
      ChildForm={SensorFormPart}
      defaultObj={getDefaultSensor()}
      data={values.sensors}
      readonly={readonly}
    />
  );
};
