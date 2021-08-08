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

import { store } from '../../../init/store'
import useTour from '../hooks/useTour'
import { reservationActions } from '../../../redux/reservation/actions'
import { useSelector } from 'react-redux'
import { history } from '../../../navigation/history'

const disableBookedDays = (date) => {
    const bookedDays = store.getState().reservation.data?.bookedDays || []
    
    const jsDate = date.toDate() 
    jsDate.setHours(0)
    jsDate.setMinutes(0)
    jsDate.setSeconds(0)
    jsDate.setMilliseconds(0)
    console.log('jsDate',jsDate)
    
    const jsBookedDays = bookedDays.map(d => d.toDate())
    return jsBookedDays.includes(jsDate)
}

const initialDate = moment()
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
})

const ReservationForm = ({tourId}) => {
    const tour = useTour(tourId)
    const { id } = useSelector(state => state.auth.data || {})

    return (
        <>
          <Formik
      initialValues={{
        toCity: '',
        datetime: initialDate,
        duration: '',
        adultsCount: 1,
        kidsCount: 1,
      }}
      validate={(values) => {
        const errors = {}
        return errors
      }}
      onSubmit={(values, {setSubmitting}) => {
        store.dispatch(reservationActions.saveOrderAsync({
          ...values,
          tourId,
          userId: id,
        }))
        history.back()
      }}
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
                value={tour?.toCity.name || ''}
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
                value={tour?.hotel.name || ''}
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
                  shouldDisableDate={disableBookedDays}
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
                    max: tour?.hotel.maxAdultsCount || 6
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
                    max: tour?.hotel.maxKidsCount || 6
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
                Submit
              </Button>
            </Box>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
    </>
      )
}

export default ReservationForm

