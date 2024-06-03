import {
  ConfigArrayForm,
  ConfigFormDropDown,
  ConfigFormTextField,
  ConfigGridContainer,
  ItemFormPartProps,
} from './configuration';
import { FC } from 'react';
import { ForesterPatrol, ForesterPatrolStates, getDefaultForesterPatrol } from '../../model/ForesterPatrol';
import { useFormikContext } from 'formik';
import { Configuration } from '../../model/configuration/configuration';
import { Typography } from '@mui/material';
import { Booleanify } from '../../utils/Booleanify';

const objectName = 'foresterPatrols';

const ForesterPatrolFormPart: FC<ItemFormPartProps<ForesterPatrol>> = ({ idx, readonly }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <>
      <Typography variant={'body1'}>Forester Patrol {values.foresterPatrols[idx].foresterPatrolId}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'foresterPatrolId'}
          idx={idx}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormDropDown
          allVariants={ForesterPatrolStates}
          objectName={objectName}
          propertyName={'state'}
          idx={idx}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.state}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'baseLocation.longitude'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.baseLocation.longitude}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'baseLocation.latitude'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.baseLocation.latitude}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'baseLocation.longitude'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.currentLocation.longitude}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'baseLocation.latitude'}
          idx={idx}
          type={'number'}
          readOnly={typeof readonly === 'boolean' ? readonly : readonly.currentLocation.latitude}
        />
      </ConfigGridContainer>
    </>
  );
};

type ForesterPatrolsFormPartProps = {
  readonly: boolean | Booleanify<ForesterPatrol>;
};

export const ForesterPatrolsFormPart: FC<ForesterPatrolsFormPartProps> = ({ readonly }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={'foresterPatrols'}
      ChildForm={ForesterPatrolFormPart}
      defaultObj={getDefaultForesterPatrol()}
      data={values.foresterPatrols}
      readonly={readonly}
    />
  );
};
