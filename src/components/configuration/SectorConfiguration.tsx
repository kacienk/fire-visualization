import { FC } from 'react';
import {
  ConfigArrayForm,
  ConfigFormDropDown,
  ConfigFormTextField,
  ConfigGridContainer,
  ItemFormPartProps,
} from './configuration';
import { getDefaultSector, Sector, SectorTypes } from '../../model/sector';
import { Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { Configuration } from '../../model/configuration/configuration';
import { Directions } from '../../model/geography';

const objectName = 'sectors';

const SectorFormPart: FC<ItemFormPartProps<Sector>> = (props) => {
  const { idx } = props;
  const { values } = useFormikContext<Configuration>();
  return (
    <>
      <Typography variant={'body1'}>Sector {values.sectors[idx].initialState.temperature}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'sectorId'}
          idx={idx}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'row'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'column'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormDropDown
          objectName={objectName}
          allVariants={SectorTypes}
          propertyName={'sectorType'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.temperature'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.windSpeed'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormDropDown
          allVariants={Directions}
          objectName={objectName}
          propertyName={'initialState.windDirection'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.airHumidity'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.plantLitterMoisture'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.co2Concentration'}
          idx={idx}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.pm2_5Concentration'}
          idx={idx}
          type={'number'}
        />
      </ConfigGridContainer>
    </>
  );
};

export const SectorsFormPart: FC = () => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={'sectors'}
      ChildForm={SectorFormPart}
      defaultObj={getDefaultSector()}
      data={values.sectors}
    />
  );
};
