import React from 'react';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import {
    TextField,
    Button,
} from '../../../global/components';

const useStyles = makeStyles(theme => ({
    form: {
      width: '300px',
    },
    formElement: {
      width: '100%',
    }
  }));

export const UserForm = ({
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
                        <TextField
                            name="firstName"
                            label="Ім'я"
                        />
                        <TextField
                            name="lastName"
                            label="Прізвище"
                        />
                        <Button
                            color="primary"
                            onClick={submitForm}
                            text="Готово"
                        />
                        <Button
                            color="primary"
                            onClick={onDeleteUser}
                            text="Видалити акаунт"
                        />
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik>
    </>;
};
