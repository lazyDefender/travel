import React from 'react';
import { Field } from 'formik';
import { TextField as FMuiTextField } from 'formik-material-ui';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    field: {
        width: '100%',
        margin: '0',
    },
}));

export const TextField = (props) => {
    const classes = useStyles();

    return (
        <Box marginBottom={1}>
            <Field className={classes.field}
                component={FMuiTextField}
                type="text"
                {...props}
                variant="outlined"
            />
        </Box>
    );
};
