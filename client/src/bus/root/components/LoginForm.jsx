import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  Formik, 
  Form, 
  Field,
} from 'formik'
import {
  Button,
  Typography,
} from '@material-ui/core'
import {
  TextField,
} from 'formik-material-ui'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Box from '@material-ui/core/Box'
import { useSelector } from 'react-redux'

import { authActions } from '../../../redux/auth.slice'
import store from '../../../redux/store'
// import { history } from '../../../navigation/history'
import { book } from '../../../navigation/book'
import useAuth from '../../../global/hooks/useAuth'
import { initialValues } from '../initialValues/signIn'
import { validationSchema } from '../validation/signIn'
import useFirstLoadedPage from '../../../global/hooks/useFirstLoadedPage'
import GoHomeBar from '../../../global/components/GoHomeBar'
import { snackbarActions } from '../../../redux/snackbar.slice'
import useSnackbar from '../../../global/hooks/useSnackbar'

// const signInWithGoogle = () => {
//   store.dispatch(authActions.signInWithGoogle())
// }

const signInWithFacebook = () => {
  store.dispatch(authActions.signInWithFacebook())
}

const SignUpForm = () => {
  const history = useHistory();
  const { error } = useAuth();
  const snackbar = useSnackbar();

  useEffect(() => {
    if(!snackbar.open) {
      store.dispatch(authActions.setError(null));
    }
  }, [snackbar]);

  useEffect(() => {
    if(error) {
      store.dispatch(snackbarActions.show({
        message: error.message,
        severity: 'error',
        open: true,
      }));
    }
  }, [error]);

  const formJSX = <div>
    <Typography>Вхід</Typography>
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
            store.dispatch(authActions.signIn(values));
        }}
    >
    {({submitForm, isSubmitting, touched, errors}) => (
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
                onClick={() => {
                  history.replace('/signup')
                }}
                >
                Зареєструватись
                </Button>
            </Box>
            <Box margin={1}>
                <Button
                variant="contained"
                color="primary"
                onClick={signInWithFacebook}
                >
                Увійти через Facebook
                </Button>
                
            </Box>
        </Form>
    </MuiPickersUtilsProvider>
    )}
    </Formik>
</div>

  const page = <>
    <GoHomeBar/>
    {formJSX}
  </>

  return page;
}

export default SignUpForm