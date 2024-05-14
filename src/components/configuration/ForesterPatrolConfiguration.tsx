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

const objectName = "foresterPatrols"

const ForesterPatrolFormPart: FC<ItemFormPartProps<ForesterPatrol>>  = ({idx})=> {
  const { values } = useFormikContext<Configuration>()

  return (<>
    <Typography variant={"body1"}>Forester Patrol {values.foresterPatrols[idx].foresterPatrolId}</Typography>
    <ConfigGridContainer>
      <ConfigFormTextField
        objectName={objectName}
        propertyName={"foresterPatrolId"}
        idx={idx}
        readOnly={true}
        type={"number"}
      />
      <ConfigFormDropDown
        allVariants={ForesterPatrolStates}
        objectName={objectName}
        propertyName={"state"}
        idx={idx}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={"baseLocation.longitude"}
        idx={idx}
        type={"number"}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={"baseLocation.latitude"}
        idx={idx}
        type={"number"}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={"baseLocation.longitude"}
        idx={idx}
        type={"number"}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={"baseLocation.latitude"}
        idx={idx}
        type={"number"}
      />
    </ConfigGridContainer>
  </>)
}

export const ForesterPatrolsFormPart: FC = () => {
  const { values } = useFormikContext<Configuration>()

  return (
    <ConfigArrayForm
      name={"foresterPatrols"}
      ChildForm={ForesterPatrolFormPart}
      defaultObj={getDefaultForesterPatrol()}
      data={values.foresterPatrols}
    />
  )
}