import React from 'react'
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

const styles = {
  dialog: {
    backgroundColor: "transparent"
  }
};

const SignUpForm = () => {
  const history = useHistory()
  const [open, setOpen] = React.useState(true)
  const auth = useAuth()
  const firstLoadedPage = useFirstLoadedPage()
  const formJSX = <div>
    <Typography>Зареєструватись</Typography>
    {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            store.dispatch(authActions.createUserWithEmailAndPassword(values))
            
            if(['/login', '/signup'].includes(firstLoadedPage)) {
              history.replace('/')
            }
            else if(firstLoadedPage === '/profile') {
              history.replace('/profile')
            }
            else {
              history.goBack()
            }
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
        </Form>
    </MuiPickersUtilsProvider>
    )}
  </Formik> */}
</div>
  const redirectTo = firstLoadedPage === '/signup' ? book.root : firstLoadedPage
  const page = <>
    <GoHomeBar/>
    {formJSX}
  </>
  const content = auth.data ? <Redirect to={redirectTo}/> : page 
  return <>
    {content}
  </>
}

export default SignUpForm