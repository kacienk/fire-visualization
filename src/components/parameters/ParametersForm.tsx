import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { ParameterFields } from './ParameterFields';
import { parameters } from './parameter';

export const ParametersForm: FC = () => {
  return (<>
    <ParameterFields readOnly={false} parameters={parameters}/>
    <Box sx={{display: "flex", flexDirection: "row-reverse", mt: 2}}>
      <Button variant="contained">Save</Button>
    </Box>
  </>)
}
