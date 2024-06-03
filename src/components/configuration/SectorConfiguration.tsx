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
import { Button, Stack } from '@mui/material';
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

type SectorFormProps = {
  readonly: boolean | Booleanify<Omit<Sector, 'sectorId' | 'row' | 'column'>>;
};

export const SectorForm: FC<SectorFormProps> = (props) => {
  const { configuration: mapConfiguration, currentSectorId } = useSelector(
    (state: RootState) => state.mapConfiguration,
  );
  const { values, setFieldValue } = useFormikContext<Configuration>();

  const [idx, setIdx] = useState<number | undefined>(undefined);
  useEffect(() => {
    setIdx(currentSectorId !== null ? currentSectorId - 1 : undefined);
  }, [mapConfiguration, currentSectorId]);

  if (currentSectorId === null || idx === undefined) return null;

  return (
    <>
      <Typography variant={'body1'}>Sector {values.sectors[idx].sectorId}</Typography>
      <ConfigGridContainer>
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'sectorId'}
          readOnly={true}
          type={'number'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'row'}
          readOnly={true}
          type={'number'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'column'}
          readOnly={true}
          type={'number'}
          idx={idx}
        />
        <ConfigFormDropDown
          objectName={objectName}
          allVariants={SectorTypes}
          propertyName={'sectorType'}
          readOnly={typeof props.readonly === 'boolean' ? props.readonly : props.readonly.sectorType}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.temperature'}
          readOnly={typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.temperature}
          type={'number'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.windSpeed'}
          readOnly={typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.windSpeed}
          type={'number'}
          idx={idx}
        />
        <ConfigFormDropDown
          allVariants={Directions}
          objectName={objectName}
          propertyName={'initialState.windDirection'}
          readOnly={typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.windDirection}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.airHumidity'}
          readOnly={typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.airHumidity}
          type={'number'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.plantLitterMoisture'}
          readOnly={
            typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.plantLitterMoisture
          }
          type={'number'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.co2Concentration'}
          readOnly={typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.co2Concentration}
          type={'number'}
          idx={idx}
        />
        <ConfigFormTextField
          objectName={objectName}
          propertyName={'initialState.pm2_5Concentration'}
          readOnly={
            typeof props.readonly === 'boolean' ? props.readonly : props.readonly.initialState.pm2_5Concentration
          }
          type={'number'}
          idx={idx}
        />
      </ConfigGridContainer>
    </>
  );
};

export const SectorDetails = () => {
  const { configuration: mapConfiguration } = useSelector((state: RootState) => state.mapConfiguration);

  return (
    <Formik
      initialValues={mapConfiguration}
      onSubmit={(values) => {
        const content = JSON.stringify(values);
        console.log(content); // save
      }}
      enableReinitialize={true}
    >
      <Form>
        <Stack spacing={2}>
          <SectorForm readonly={true} />
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
