import { ConfigArrayForm, ConfigFormTextField, ConfigGridContainer, ItemFormPartProps } from './configuration';
import { Camera, getDefaultCamera } from '../../model/camera';
import { useFormikContext } from 'formik';
import { Configuration } from '../../model/configuration/configuration';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { Booleanify } from '../../utils/Booleanify';

const objectName = 'cameras';

export const CameraFormPart: FC<ItemFormPartProps<Camera>> = ({ idx, readonly }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <>
      <Typography variant={'body1'}>Camera {values.cameras[idx].cameraId}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'cameraId'}
          idx={idx}
          readOnly={true}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'range'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.range}
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

type CamerasFormPartProps = {
  readonly: boolean | Booleanify<Camera>;
};

export const CamerasFormPart: FC<CamerasFormPartProps> = ({ readonly }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={objectName}
      ChildForm={CameraFormPart}
      defaultObj={getDefaultCamera()}
      data={values.cameras}
      readonly={readonly}
    />
  );
};
