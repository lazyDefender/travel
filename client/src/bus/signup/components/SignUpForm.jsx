import React from 'react';
import { 
  Formik, 
  Form,  
} from 'formik';
import {
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { validationSchema } from '../validation/signUp';
import GoHomeBar from '../../../global/components/GoHomeBar';
import TextField from '../../../global/components/TextField';
import Button from '../../../global/components/Button';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  form: {
    width: '300px',
  },
  formElement: {
    width: '100%',
  }

}));

const SignUpForm = ({ 
  onSignInWithGoogle,
  onSignInWithFacebook,
  onLogin,
  onSubmit,
}) => {
  const classes = useStyles();

  const formJSX = (
    <div className={classes.root}>
      <Typography>Реєстрація</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
                <TextField
                  name="email"
                  label="Email"
                />
                <TextField
                    type="password"
                    name="password"
                    label="Пароль"
                />
                <Button
                  onClick={submitForm}
                  color="primary"
                  text="Готово"
                />
                <Button
                  onClick={onLogin}
                  color="default"
                  text="Увійти"
                />
                <Button
                  onClick={onSignInWithGoogle}
                  color="primary"
                  text="Увійти через Google"
                />
                <Button
                  onClick={onSignInWithFacebook}
                  color="primary"
                  text="Увійти через Facebook"
                />  
              </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </div>
  );
  const page = <>
    <GoHomeBar/>
    {formJSX}
  </>;
   
  return page;
};

export default SignUpForm;