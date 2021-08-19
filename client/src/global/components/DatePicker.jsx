import React from 'react';
import { Field } from 'formik';
import { Box } from '@material-ui/core';
import { DatePicker as MuiDatePicker } from 'formik-material-ui-pickers';

const DatePicker = (props) => {
    return (
        <Box marginBottom={1}>
          <Field 
            component={MuiDatePicker} 
            inputVariant="outlined"
            disablePast={true} 
            {...props}
          />
        </Box>
    );
};

export default DatePicker;
