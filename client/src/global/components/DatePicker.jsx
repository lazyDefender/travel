import React from 'react';
import { Field } from 'formik';
import { Box } from '@material-ui/core';
import { DatePicker as MuiDatePicker } from 'formik-material-ui-pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  datePicker: {
      width: '100%',
  }
}));

export const DatePicker = (props) => {
  const classes = useStyles();

    return (
        <Box marginBottom={1}>
          <Field
            className={classes.datePicker} 
            component={MuiDatePicker} 
            inputVariant="outlined"
            disablePast={true} 
            {...props}
          />
        </Box>
    );
};
