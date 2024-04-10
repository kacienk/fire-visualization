import { FC } from 'react';
import { Parameter, parameters } from './parameter';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

export const ParametersForm: FC = () => {
  return (<>
    <Grid container spacing={2}>
      {parameters.map(parameter => (
        <Grid item xs={4}>
          {parameterFormEntryFactory(parameter)}
        </Grid>
      ))}
    </Grid>
    <Box sx={{display: "flex", flexDirection: "row-reverse", mt: 2}}>
      <Button variant="contained">Save</Button>
    </Box>
  </>)
}

const parameterFormEntryFactory = (parameter: Parameter) => {
  switch (parameter.type) {
    case 'text':
      return <TextField label={parameter.name} variant="outlined" value={parameter.value}/>
    case 'boolean':
      return <FormControlLabel control={<Checkbox />} label={parameter.name} value={parameter.value}/>
    case 'number':
      return <TextField label={parameter.name} variant="outlined" value={parameter.value} type="number"/>
  }
}