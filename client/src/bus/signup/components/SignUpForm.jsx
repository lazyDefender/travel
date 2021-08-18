import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { 
  Formik, 
  Form, 
  Field, 
} from 'formik';
import {
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
} from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { validationSchema } from '../validation/signUp';
import GoHomeBar from '../../../global/components/GoHomeBar';

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
      <Typography>Зареєструватись</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({submitForm, isSubmitting, touched, errors}) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
              <Form className={classes.form}>
                <Box margin={1}>
                  <Field className={classes.formElement}
                    component={TextField}
                    type="text"
                    name="firstName"
                    label="Ім'я"
                    disabled={false}
                    variant="outlined"
                  />
                </Box>
                <Box margin={1}>
                  <Field className={classes.formElement}
                    component={TextField}
                    type="text"
                    name="lastName"
                    label="Прізвище"
                    disabled={false}
                    variant="outlined"
                  />
                </Box>
                <Box margin={1}>
                  <Field className={classes.formElement}
                    component={TextField}
                    name="email"
                    label="Email"
                    disabled={false}
                    variant="outlined"
                  />
                </Box>
                <Box margin={1}>
                  <Field className={classes.formElement}
                    component={TextField}
                    type="password"
                    name="password"
                    label="Пароль"
                    disabled={false}
                    variant="outlined"
                  />
                </Box>
                <Box margin={1}>
                  <Button className={classes.formElement}
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    disableElevation
                  >
                    Готово
                  </Button>
                  
                </Box>
                <Box margin={1}>
                  <Button className={classes.formElement}
                    variant="contained"
                    color="default"
                    onClick={onLogin}
                    disableElevation
                  >
                    Увійти
                  </Button>
                </Box>
                <Box margin={1}>
                  <Button className={classes.formElement}
                    variant="contained"
                    color="primary"
                    onClick={onSignInWithGoogle}
                    disableElevation
                  >
                    Увійти через Google
                  </Button>
                </Box>
                <Box margin={1}>
                  <Button className={classes.formElement}
                    variant="contained"
                    color="primary"
                    onClick={onSignInWithFacebook}
                    disableElevation
                  >
                    Увійти через Facebook
                  </Button>
                </Box>    
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