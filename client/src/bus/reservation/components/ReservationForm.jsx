import React from 'react';
import {
  Formik, 
  Form,
} from 'formik';
import { makeStyles } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import {
  Progress,
  Button,
  TextField,
  DatePicker,
} from '../../../global/components';

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
          <TextField
            name="toCity"
            label="Місто"
            margin="normal"
            value={tour?.toCity?.name || ''}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
          <TextField
            type="text"
            name="hotel"
            label="Готель"
            margin="normal"
            value={tour?.hotel?.name || ''}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
          <DatePicker
            disablePast
            name="datetime" 
            label="Початок туру"
          />
          <TextField
            name="duration"
            label="Тривалість туру"
            margin="normal"
            value={`${tour?.duration || ''}`}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
          <TextField
            type="number"
            name="adultsCount"
            label="К-сть дорослих"
            margin="normal"
            value={`${tour?.duration || ''}`}
            inputProps={{
              min: 1,
              max: tour?.hotel?.maxAdultsCount || 6
            }}
          />
          <TextField
            type="number"
            name="kidsCount"
            label="К-сть дітей"
            margin="normal"
            value={`${tour?.duration || ''}`}
            inputProps={{
              min: 0,
              max: tour?.hotel?.maxKidsCount || 6
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
            text="Забронювати"
          />
        </Form>
      </MuiPickersUtilsProvider>
    )}
  </Formik>
  </div>;

    const jsx = isFetching ? <Progress /> : formJsx;

    return jsx;
}

export default ReservationForm;
