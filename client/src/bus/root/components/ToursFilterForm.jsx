import React from 'react';
import { useDispatch } from 'react-redux';
import {Formik, Form, Field} from 'formik';
import {
  Button,
  MenuItem,
  Grid,
  Box,
} from '@material-ui/core';
import {
  TextField,
} from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DatePicker from '../../../global/components/DatePicker';
import '../../../moment-locales/uk';

moment.locale('uk');

const initialDate = moment()
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
});

const ToursFilterForm = ({ 
  cities,
  formState,
  onSubmit,
}) => {
  const initialValues = {
    toCity: formState?.toCity || cities[0]?.id,
    datetime: formState?.datetime || initialDate,
    duration: formState?.duration || 8,
    adultsCount: formState?.adultsCount || 1,
    kidsCount: formState?.kidsCount || 1,
  };

  const validate = (values) => {
    const errors = {};
    console.log(values)
    if(!values.toCity) errors.toCity = 'Виберіть місто';
    return errors;
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({submitForm, isSubmitting, touched, errors}) => {
          return (
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
                    <DatePicker
                      name="datetime" 
                      label="Початок туру"
                      cancelLabel="Скасувати" 
                    />
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
          )
        }}
      </Formik>
    </Box>
  );
};

export default ToursFilterForm;
