import { FC, useEffect, useState } from 'react';
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

import { Form, Formik } from 'formik';
import { getDefaultConfigution } from '../../model/configuration/configuration';
import { Button, Stack } from '@mui/material';
import { mapConfigMockup } from '../../data/sectorsMockup';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxStore';

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

// type SectorFormProps = {
//   readonly: boolean | Record<keyof Sector, boolean>
// }

export const SectorForm: FC = () => {
  const { configuration: mapConfiguration, currentSectorId } = useSelector(
    (state: RootState) => state.mapConfiguration,
  );
  const { values, setFieldValue } = useFormikContext<Configuration>();

  const [currentSector, setCurrentSector] = useState<Sector | null>(null);
  useEffect(() => {
    console.debug(values);
    setCurrentSector(mapConfiguration.sectors.find((sector) => sector.sectorId === currentSectorId) ?? null);
  }, [mapConfiguration, currentSectorId]);

  if (currentSectorId === null) return null;

  return (
    <>
      <Typography variant={'body1'}>Sector {values.sectors[currentSectorId - 1].sectorId}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'sectorId'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'row'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'column'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormDropDown
          objectName={objectName}
          allVariants={SectorTypes}
          propertyName={'sectorType'}
          readOnly={true}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.temperature'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.windSpeed'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormDropDown
          allVariants={Directions}
          objectName={objectName}
          propertyName={'initialState.windDirection'}
          readOnly={true}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.airHumidity'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.plantLitterMoisture'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.co2Concentration'}
          readOnly={true}
          type={'number'}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.pm2_5Concentration'}
          readOnly={true}
          type={'number'}
        />
      </ConfigGridContainer>
    </>
  );
};

export const SectorDetails = () => {
  return (
    <Formik
      initialValues={mapConfigMockup}
      onSubmit={(values) => {
        const content = JSON.stringify(values);
        console.log(content); // save
      }}
    >
      <Form>
        <Stack spacing={2}>
          <SectorForm />
          {/* <Divider>Sensors</Divider>
          <SensorsFormPart />
          <Divider>Cameras</Divider>
          <CamerasFormPart />
          <Divider>Fire Brigades</Divider>
          <FireBrigadesFormPart />
          <Divider>Forester Patrols</Divider>
          <ForesterPatrolsFormPart /> */}
          <Button
            color={'primary'}
            variant={'contained'}
            type={'submit'}
          >
            Save
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};
