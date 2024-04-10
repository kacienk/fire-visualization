import { FC } from 'react';
import { Parameter, parameters } from './parameter';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

interface ParameterFieldsProps {
  readOnly: boolean
}

export const ParameterFields: FC<ParameterFieldsProps> = ({readOnly}) => {
  return (<>
    <Grid container spacing={2}>
      {parameters.map(parameter => (
        <Grid item xs={4}>
          {parameterFormEntryFactory(parameter, readOnly)}
        </Grid>
      ))}
    </Grid>
   </>
  )
}

const parameterFormEntryFactory = (parameter: Parameter, readOnly: boolean) => {
  switch (parameter.type) {
    case 'text':
      return <TextField label={parameter.name} variant="outlined" value={parameter.value} disabled={readOnly}/>
    case 'boolean':
      return <FormControlLabel control={<Checkbox />} label={parameter.name} value={parameter.value} disabled={readOnly}/>
    case 'number':
      return <TextField label={parameter.name} variant="outlined" value={parameter.value} type="number" disabled={readOnly}/>
  }
}
