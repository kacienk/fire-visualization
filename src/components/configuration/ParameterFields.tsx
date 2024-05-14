import { FC } from 'react';
import { isEnumParameter, Parameter, parameters } from '../../model/configuration/parameter';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

interface ParameterFieldsProps {
  readOnly: boolean;
}

export const ParameterFields: FC<ParameterFieldsProps> = ({ readOnly }) => {
  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {parameters.map((parameter) => (
          <Grid
            item
            xs={4}
          >
            {parameterFormEntryFactory(parameter, readOnly)}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const buildParametersForm = (readOnly: boolean) => {
  const formFields = Object.entries(parameters).map(([key, parameter]) => {
    switch (parameter.type) {
      case 'text':
        return (
          <TextField
            label={parameter.name}
            variant="outlined"
            value={parameter.value}
            disabled={readOnly}
          />
        );
      case 'number':
        return (
          <TextField
            label={parameter.name}
            variant="outlined"
            value={parameter.value}
            disabled={readOnly}
          />
        );
      case 'enum':
        return <div>enum</div>;
      case 'array':
        return <div>array</div>;
    }
  });
};

const parameterFormEntryFactory = (parameter: Parameter<any>, readOnly: boolean) => {
  switch (typeof parameter.value) {
    case 'string':
      if (isEnumParameter(parameter)) {
        parameter;
      }

      return (
        <TextField
          label={parameter.name}
          variant="outlined"
          value={parameter.value}
          disabled={readOnly}
        />
      );
    case 'number':
      return (
        <TextField
          label={parameter.name}
          variant="outlined"
          type="number"
          value={parameter.value}
          disabled={readOnly}
        />
      );
  }
};

function getParameterFormField<T>(parameter: Parameter<T>, readOnly: boolean) {
  switch (typeof parameter.value) {
    case 'string':
      return (
        <TextField
          label={parameter.name}
          variant="outlined"
          value={parameter.value}
          disabled={readOnly}
        />
      );
  }
  return (
    <TextField
      label={parameter.name}
      variant="outlined"
      value={parameter.value}
      disabled={readOnly}
    />
  );
}
