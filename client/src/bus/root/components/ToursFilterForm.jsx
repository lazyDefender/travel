import React from 'react'
import {Formik, Form, Field} from 'formik'
import {
  Button,
  LinearProgress,
  MenuItem,
  Grid,
  Box,
} from '@material-ui/core'
import {
  TextField,
} from 'formik-material-ui'
import {
  DatePicker,
} from 'formik-material-ui-pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment';
import firebase from 'firebase'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import useCities from '../hooks/useCities' 
import { store } from '../../../init/store'
import { toursFilterActions } from '../../../redux/toursFilter/actions'
import useToursFilterFormState from '../hooks/useToursFilterFormState'
import '../../../moment-locales/uk';

moment.locale('uk');

const initialDate = moment()
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
})

const ToursFilterForm = () => {

  const citiesRes = useCities()
  const formState = useToursFilterFormState()
  const citiesData = citiesRes?.data || []
  const cities = [ ...citiesData]

  

  return (
    <Box 
      // bgcolor="primary.main"
    >
      <Formik
        initialValues={{
          toCity: formState?.toCity || cities[0],
          datetime: formState?.datetime || initialDate,
          duration: formState?.duration || 8,
          adultsCount: formState?.adultsCount || 1,
          kidsCount: formState?.kidsCount || 1,
        }}
        validate={(values) => {
          console.log(values)
          const errors = {}
          if(!values.toCity) errors.toCity = 'Виберіть місто'
          return errors
        }}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true)

          const datetime = firebase
            .firestore
            .Timestamp
            .fromDate(values.datetime.toDate())
            .toMillis()

          store.dispatch(toursFilterActions.fetchAsync({
            ...values,
            datetime, 
          }))
          store.dispatch(toursFilterActions.setFormState({
            ...values,
            datetime,
          }))

          setSubmitting(false)
        }}
      >
        {({submitForm, isSubmitting, touched, errors}) => (
          <MuiPickersUtilsProvider locale="uk" utils={MomentUtils}>
            <Form>
              <Grid 
                container 
                direction="row" 
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="toCity"
                      label="Куди"
                      select
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {cities?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </Grid>
                
                <Grid item>
                  <Box margin={1}>
                    <Field 
                      component={DatePicker} 
                      inputVariant="outlined"
                      disablePast={true} 
                      name="datetime" 
                      label="Початок туру"
                      cancelLabel="Скасувати" 
                    />
                  </Box>
                </Grid>
                
                <Grid item>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="duration"
                      label="Ночей"
                      select
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem value={8}>
                          8
                        </MenuItem>
                    </Field>
                  </Box>
                </Grid>
                <Grid item>
                  <Box margin={1}>
                    <Field
                    component={TextField}
                    variant="outlined"
                      name="adultsCount"
                      type="number"
                      label="К-сть дорослих"
                      inputProps={{
                        min: 1,
                        max: 6,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="kidsCount"
                      type="number"
                      label="К-сть дітей"
                      inputProps={{
                        min: 0,
                        max: 6,
                      }}
                    />
                  </Box>
                </Grid>
                
                <Box margin={1}>
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Знайти
                  </Button>
                </Box>
              </Grid>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Box>
  )
}


export default ToursFilterForm
