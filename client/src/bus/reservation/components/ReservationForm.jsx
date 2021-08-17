import React from 'react'
import {Formik, Form, Field} from 'formik'
import {
  Button,
  Box
} from '@material-ui/core'
import {
  TextField,
} from 'formik-material-ui'
import {
  DatePicker,
} from 'formik-material-ui-pickers'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'

import useTour from '../hooks/useTour'
import useAuth from '../../../global/hooks/useAuth'
import { reservationActions } from '../../../redux/reservation.slice'
import { snackbarActions } from '../../../redux/snackbar.slice'
import { useDispatch } from 'react-redux'
import { history } from '../../../navigation/history'
import Progress from '../../../global/components/Progress'

const initialDate = moment()
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
})

const ReservationForm = ({tourId}) => {
  const dispatch = useDispatch()
    const { data: tour, isFetching } = useTour(tourId)
    const { user: { id } } = useAuth()

    const initialValues = {
      toCity: '',
      datetime: initialDate,
      duration: '',
      adultsCount: 1,
      kidsCount: 1,
    };

    const validate = (values) => {
      const errors = {}
      return errors
    };

    const onSubmit = (values, { setSubmitting }) => {
      dispatch(reservationActions.createOrder({
        ...values,
        tourId,
        userId: id,
      }));

      history.back();
    };

    const formJsx = <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={onSubmit}
  >
    {({submitForm, isSubmitting, touched, errors}) => (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="toCity"
              label="Місто"
              variant="standard"
              margin="normal"
              value={tour?.toCity?.name || ''}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            >  
            </Field>
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="hotel"
              label="Готель"
              variant="standard"
              margin="normal"
              value={tour?.hotel?.name || ''}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            >  
            </Field>
          </Box>
          <Box margin={1}>
              <Field 
                component={DatePicker} 
                disablePast
                name="datetime" 
                label="Початок туру"
              />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="duration"
              label="Тривалість туру"
              variant="standard"
              margin="normal"
              value={`${tour?.duration || ''}`}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            >
            </Field>
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              name="adultsCount"
              type="number"
              label="Adults"
              inputProps={{
                  min: 1,
                  max: tour?.hotel?.maxAdultsCount || 6
              }}
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              name="kidsCount"
              type="number"
              label="Kids"
              inputProps={{
                  min: 0,
                  max: tour?.hotel?.maxKidsCount || 6
              }}
            />
          </Box>
          <Box margin={1}>
            <Button
              variant="contained"
              color="primary"
              // disabled={isSubmitting}
              onClick={submitForm}
            >
              Забронювати
            </Button>
          </Box>
        </Form>
      </MuiPickersUtilsProvider>
    )}
  </Formik>

    const jsx = isFetching ? <Progress /> : formJsx

    return jsx
}

export default ReservationForm

