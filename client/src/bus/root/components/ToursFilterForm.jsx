import React from 'react';
import { Formik, Form } from 'formik';
import {
  MenuItem,
  Grid,
  Box,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import {
  DatePicker,
  TextField,
  Button,
} from '../../../global/components';

import '../../../moment-locales/uk';

moment.locale('uk');

const initialDate = moment()
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
});

export const ToursFilterForm = ({ 
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
                    <TextField
                      name="toCity"
                      label="Куди"
                      select
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {cities?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  
                  <Grid item>
                    <DatePicker
                      name="datetime" 
                      label="Початок туру"
                      cancelLabel="Скасувати" 
                    />
                  </Grid>
                  
                  <Grid item>
                    <TextField
                      name="duration"
                      label="Ночей"
                      select
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem value={8}>
                        8
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item>
                    <TextField
                      name="adultsCount"
                      type="number"
                      label="К-сть дорослих"
                      inputProps={{
                        min: 1,
                        max: 6,
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                        name="kidsCount"
                        type="number"
                        label="К-сть дітей"
                        inputProps={{
                          min: 0,
                          max: 6,
                        }}
                    />
                  </Grid>

                  <Grid item>
                    <Button
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                        text="Знайти"
                    />
                  </Grid>

                </Grid>
              </Form>
            </MuiPickersUtilsProvider>
          )
        }}
      </Formik>
    </Box>
  );
};
