import React from 'react';
import {Formik, Form, Field} from 'formik';
import {
    Button,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
} from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    form: {
      width: '300px',
    },
    formElement: {
      width: '100%',
    }
  }));

const UserForm = ({
        firstName,
        lastName,
        onUpdateUser,
        onDeleteUser,
    }) => {
    const classes = useStyles();

    return <>
        <Formik
            initialValues={{
                firstName,
                lastName,
            }}
            validate={(values) => {
                const errors = {}
                return errors
            }}
            onSubmit={onUpdateUser}
        >
            {({submitForm, isSubmitting, touched, errors}) => (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Form className={classes.form}>
                        <Box margin={1}>
                            <Field
                                className={classes.formElement}
                                component={TextField}
                                type="text"
                                name="firstName"
                                label="Ім'я"
                                disabled={false}
                                variant="outlined"
                            />
                        </Box>
                        <Box margin={1}>
                            <Field
                                className={classes.formElement}
                                component={TextField}
                                type="text"
                                name="lastName"
                                label="Прізвище"
                                disabled={false}
                                variant="outlined"
                            />
                        </Box>
                        <Box margin={1}>
                            <Button
                                className={classes.formElement}
                                variant="contained"
                                color="primary"
                                onClick={submitForm}
                                disableElevation
                            >
                            Готово
                            </Button>
                        </Box>
                        <Box margin={1}>
                            <Button
                                className={classes.formElement}
                                variant="contained"
                                color="primary"
                                onClick={onDeleteUser}
                                disableElevation
                            >
                                Видалити акаунт
                            </Button>
                        </Box>
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik>
    </>;
};

export default UserForm;
