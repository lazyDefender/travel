import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Formik, 
  Form, 
  Field,
} from 'formik';
import {
  Button,
  Typography,
} from '@material-ui/core';
import {
  TextField,
} from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';

import { validationSchema } from '../validation/login';
import GoHomeBar from '../../../global/components/GoHomeBar';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = ({ 
  onSignInWithGoogle,
  onSignInWithFacebook,
  onSubmit,
  onSignup,
}) => {
  const formJSX = (
    <div>
      <Typography>Вхід</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  disabled={false}
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  name="password"
                  label="Пароль"
                  disabled={false}
                />
              </Box>
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  Увійти
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={onSignup}
                >
                  Зареєструватись
                </Button>
              </Box>
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSignInWithGoogle}
                >
                  Увійти через Google
                </Button>
              </Box>
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSignInWithFacebook}
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
}

export default LoginForm;