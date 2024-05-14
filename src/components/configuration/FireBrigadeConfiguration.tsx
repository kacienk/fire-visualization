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
import { FireBrigade, FireBrigadeStates, getDefaultFireBrigade } from '../../model/FireBrigade';
import { Typography } from '@mui/material';

const objectName = 'fireBrigades';

export const FireBrigadeFormPart: FC<ItemFormPartProps<FireBrigade>> = ({ idx }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <>
      <Typography variant={'body1'}>Fire brigade {values.fireBrigades[idx].state}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'fireBrigadeId'}
          idx={idx}
          type={'number'}
          readOnly={true}
        />
        <ConfigFormDropDown
          objectName={objectName}
          propertyName={'state'}
          idx={idx}
          allVariants={FireBrigadeStates}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'baseLocation.longitude'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'baseLocation.latitude'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'currentLocation.longitude'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'currentLocation.latitude'}
          idx={idx}
          type={'number'}
        />
      </ConfigGridContainer>
    </>
  );
};

export const FireBrigadesFormPart: FC = () => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={'fireBrigades'}
      ChildForm={FireBrigadeFormPart}
      defaultObj={getDefaultFireBrigade()}
      data={values.fireBrigades}
    />
  );
};
