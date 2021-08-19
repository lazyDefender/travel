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

import { validationSchema } from '../validation/login';
import GoHomeBar from '../../../global/components/GoHomeBar';
import TextField from '../../../global/components/TextField';
import Button from '../../../global/components/Button';

const initialValues = {
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

const LoginForm = ({ 
  onSignInWithGoogle,
  onSignInWithFacebook,
  onSubmit,
  onSignup,
}) => {
  const classes = useStyles();

  const formJSX = (
    <div className={classes.root}>
      <Typography>Вхід</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({submitForm, isSubmitting, touched, errors}) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
              <Form className={classes.form}>
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
                  color="primary"
                  onClick={submitForm}
                  text="Готово"
                />
                <Button
                  color="default"
                  onClick={onSignup}
                  text="Зареєструватись"
                />
                <Button
                  color="primary"
                  onClick={onSignInWithGoogle}
                  text="Увійти через Google"
                />
                <Button
                  color="primary"
                  onClick={onSignInWithFacebook}
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
}

export default LoginForm;
