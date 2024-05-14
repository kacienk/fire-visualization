import { FC } from 'react';
import { ConfigFormTextField, ConfigGridContainer, FormPartProps } from './configuration';
import { Configuration, Forest } from '../../model/configuration/configuration';
import { Typography } from '@mui/material';
import { useFormikContext } from 'formik';

export const ForestFormPart: FC = () => {
  const { values } = useFormikContext<Configuration>()

  return (<>
    <Typography variant={"body1"}>Forest {values.forestName}</Typography>
    <ConfigGridContainer>
      <ConfigFormTextField
        propertyName={"forestId"}
        readOnly={true}
      />
      <ConfigFormTextField
        propertyName={"forestName"}
      />
      <ConfigFormTextField
        propertyName={"width"}
      />
      <ConfigFormTextField
        propertyName={"height"}
      />
      <ConfigFormTextField
        propertyName={"sectorSize"}
      />
      <ConfigFormTextField
        propertyName={"imageReference"}
      />
    </ConfigGridContainer>
  </>)
}