import { FC } from 'react';
import { Camera } from '../../../model/camera';
import { useFormikContext } from 'formik';
import { ConfigFormTextField } from '../configuration';

export const CameraFormPart: FC = () => {
  const { values: _ } = useFormikContext<Camera>();

  return (
    <>
      <ConfigFormTextField
        objectName={'camera'}
        propertyName={'range'}
        type={'number'}
      />
    </>
  );
};
