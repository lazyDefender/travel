import React from 'react'
import {Formik, Form, Field} from 'formik'
import {
    Button,
    Box,
} from '@material-ui/core'
import {
  TextField,
} from 'formik-material-ui'
import MomentUtils from '@date-io/moment'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'

import useAuth from '../../../global/hooks/useAuth'
import { authActions } from '../../../redux/auth/actions'
import { ordersActions } from '../../../redux/orders/actions'


const UserForm = ({ 
        id,
        firstName,
        lastName,
    }) => {
    return <>
        {/* <Formik
            initialValues={{
                firstName,
                lastName,
            }}
            validate={(values) => {
                const errors = {}
                return errors
            }}
            onSubmit={(values, {setSubmitting}) => {
                store.dispatch(authActions.updateUser({
                    ...values,
                    id,
                }))
                store.dispatch(ordersActions.fetchByUser(id))
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
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    >
                    Готово
                    </Button>
                </Box>
                <Box margin={1}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        store.dispatch(authActions.deleteUser())
                    }}
                    >
                    Видалити акаунт
                    </Button>
                </Box>
            </Form>
        </MuiPickersUtilsProvider>
        )}
    </Formik> */}
    </>
}

export default UserForm