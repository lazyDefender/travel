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
import { makeStyles } from '@material-ui/styles';
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

import '../../../moment-locales/uk';

moment.locale('uk');

const initialDate = moment();
initialDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
});

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  form: {
    width: '300px',
  },
  formElement: {
    width: '100%',
  }
}));

const ReservationForm = ({ tour, onSubmit, isFetching }) => {
  const classes = useStyles();

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

  const formJsx = <div className={classes.root}>
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={onSubmit}
  >
    {({submitForm, isSubmitting, touched, errors}) => (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Form className={classes.form}>
          <Box margin={1}>
            <Field
              className={classes.formElement}
              component={TextField}
              type="text"
              name="toCity"
              label="Місто"
              margin="normal"
              value={tour?.toCity?.name || ''}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              variant="outlined"
            >  
            </Field>
          </Box>
          <Box margin={1}>
            <Field
              className={classes.formElement}
              component={TextField}
              type="text"
              name="hotel"
              label="Готель"
              margin="normal"
              value={tour?.hotel?.name || ''}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              variant="outlined"
            >  
            </Field>
          </Box>
          <Box margin={1}>
              <Field 
                className={classes.formElement}
                component={DatePicker} 
                disablePast
                name="datetime" 
                label="Початок туру"
                inputVariant="outlined"
              />
          </Box>
          <Box margin={1}>
            <Field
              className={classes.formElement}
              component={TextField}
              type="text"
              name="duration"
              label="Тривалість туру"
              margin="normal"
              value={`${tour?.duration || ''}`}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              variant="outlined"
            >
            </Field>
          </Box>
          <Box margin={1}>
            <Field
              className={classes.formElement}
              component={TextField}
              name="adultsCount"
              type="number"
              label="К-сть дорослих"
              inputProps={{
                  min: 1,
                  max: tour?.hotel?.maxAdultsCount || 6
              }}
              variant="outlined"
            />
          </Box>
          <Box margin={1}>
            <Field
              className={classes.formElement}
              component={TextField}
              name="kidsCount"
              type="number"
              label="К-сть дітей"
              inputProps={{
                  min: 0,
                  max: tour?.hotel?.maxKidsCount || 6
              }}
              variant="outlined"
            />
          </Box>
          <Box margin={1}>
            <Button
              className={classes.formElement}
              variant="contained"
              color="primary"
              onClick={submitForm}
              disableElevation
            >
              Забронювати
            </Button>
          </Box>
        </Form>
      </MuiPickersUtilsProvider>
    )}
  </Formik>
  </div>;

    const jsx = isFetching ? <Progress /> : formJsx;

    return jsx;
}

export default ReservationForm;
