import React from 'react';
import {
  Formik, 
  Form, 
  Field
} from 'formik';
import {
  Button,
  Box
} from '@material-ui/core';
import {
  TextField,
} from 'formik-material-ui';
import {
  DatePicker,
} from 'formik-material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import Progress from '../../../global/components/Progress'

const initialDate = moment();
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
});

const ReservationForm = ({ tour, onSubmit, isFetching }) => {
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
              onClick={submitForm}
            >
              Забронювати
            </Button>
          </Box>
        </Form>
      </MuiPickersUtilsProvider>
    )}
  </Formik>

    const jsx = isFetching ? <Progress /> : formJsx;

    return jsx;
}

export default ReservationForm;
