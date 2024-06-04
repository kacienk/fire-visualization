import { FC } from 'react';
import {
  ConfigArrayForm,
  ConfigFormDropDown,
  ConfigFormTextField,
  ConfigGridContainer,
  ItemFormPartProps,
} from './configuration';
import { getDefaultSector, Sector, SectorTypes } from '../../model/sector';
import { useFormikContext } from 'formik';
import { Configuration } from '../../model/configuration/configuration';
import { Directions } from '../../model/geography';
import { Booleanify } from '../../utils/Booleanify';

const objectName = 'sectors';

export const SectorFormPart: FC<ItemFormPartProps<Sector>> = ({ idx, readonly }) => {
  return (
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
        readOnly={true}
        type={'number'}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'column'}
        idx={idx}
        readOnly={true}
        type={'number'}
      />
      <ConfigFormDropDown
        objectName={objectName}
        allVariants={SectorTypes}
        propertyName={'sectorType'}
        idx={idx}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.sectorType}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'initialState.temperature'}
        idx={idx}
        type={'number'}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.temperature}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'initialState.windSpeed'}
        idx={idx}
        type={'number'}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.windSpeed}
      />
      <ConfigFormDropDown
        allVariants={Directions}
        objectName={objectName}
        propertyName={'initialState.windDirection'}
        idx={idx}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.windDirection}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'initialState.airHumidity'}
        idx={idx}
        type={'number'}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.airHumidity}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'initialState.plantLitterMoisture'}
        idx={idx}
        type={'number'}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.plantLitterMoisture}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'initialState.co2Concentration'}
        idx={idx}
        type={'number'}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.co2Concentration}
      />
      <ConfigFormTextField
        objectName={objectName}
        propertyName={'initialState.pm2_5Concentration'}
        idx={idx}
        type={'number'}
        readOnly={typeof readonly === 'boolean' ? readonly : readonly.initialState.pm2_5Concentration}
      />
    </ConfigGridContainer>
  );
};

type SectorsFormPartProps = {
  readonly: boolean | Booleanify<Sector>;
};

export const SectorsFormPart: FC<SectorsFormPartProps> = ({ readonly }) => {
  const { values } = useFormikContext<Configuration>();

  return (
    <ConfigArrayForm
      name={'sectors'}
      ChildForm={SectorFormPart}
      defaultObj={getDefaultSector()}
      data={values.sectors}
      readonly={readonly}
    />
  );
};
