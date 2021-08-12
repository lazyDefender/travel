import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { 
  Formik, 
  Form, 
  Field 
} from 'formik'
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import {
  TextField,
} from 'formik-material-ui'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { authActions } from '../../../redux/auth.slice'
import useAuth from '../../../global/hooks/useAuth'
import { book } from '../../../navigation/book'
import { initialValues } from '../initialValues/signUp'
import { validationSchema } from '../validation/signUp'
import useFirstLoadedPage from '../../../global/hooks/useFirstLoadedPage'
import GoHomeBar from '../../../global/components/GoHomeBar'
import store from '../../../redux/store'
import { snackbarActions } from '../../../redux/snackbar.slice'
import useSnackbar from '../../../global/hooks/useSnackbar'

const signInWithGoogle = () => {
  store.dispatch(authActions.signInWithProvider('google'))
}

const signInWithFacebook = () => {
  store.dispatch(authActions.signInWithProvider('facebook'))
}

const SignUpForm = () => {
  const history = useHistory()

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

  const [open, setOpen] = React.useState(true)
  const formJSX = <div>
    <Typography>Зареєструватись</Typography>
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            store.dispatch(authActions.signUp(values))
            
            // if(['/login', '/signup'].includes(firstLoadedPage)) {
            //   history.replace('/')
            // }
            // else if(firstLoadedPage === '/profile') {
            //   history.replace('/profile')
            // }
            // else {
            //   history.goBack()
            // }
        }}
    >
    {({submitForm, isSubmitting, touched, errors}) => (
    
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="firstName"
              label="Ім'я"
              disabled={false}
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="lastName"
              label="Прізвище"
              disabled={false}
            />
          </Box>
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
              Готово
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                history.replace('/login')
              }}
            >
              Увійти
            </Button>
          </Box>
          <Box margin={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
            >
              Увійти через Google
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
   
  return <>
    {page}
  </>
}

export default SignUpForm