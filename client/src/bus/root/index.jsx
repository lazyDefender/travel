import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CircularProgress,
    Backdrop,
    Grid,
} from '@material-ui/core';
import firebase from 'firebase';

import AuthBar from '../../global/components/AuthBar';
import Progress from '../../global/components/Progress';
import ToursFilterForm from './components/ToursFilterForm';
import ToursList from './components/ToursList';
import ToursFilterNotFound from './components/ToursFilterNotFound';
import { toursFilterActions } from '../../redux/toursFilter.slice';
import useToursFilterFormState from './hooks/useToursFilterFormState';
import useToursFilterCities from './hooks/useToursFilterCities';
import useToursFilterTours from './hooks/useToursFilterTours';

const Root = () => {
    const dispatch = useDispatch()

    const { 
        isFetching: citiesFetching, 
        data: cities 
    } = useToursFilterCities();

    const {
        isFetching: toursFetching,
        data: tours,
    } = useToursFilterTours();

    const formState = useToursFilterFormState();

    const onToursFilterFormSubmit = async (values, { setSubmitting }) => {
        const datetime = firebase
          .firestore
          .Timestamp
          .fromDate(values.datetime.toDate())
          .toMillis();
    
        await dispatch(toursFilterActions.getTours({
          ...values,
          datetime, 
        }));
        await dispatch(toursFilterActions.setFormState({
          ...values,
          datetime,
        }));

        setSubmitting(false);
    };

    const progressJSX = (<Backdrop open={true} >
        <CircularProgress color="inherit" />
    </Backdrop>);

    const toursListJSX = tours?.length === 0 ? 
        <ToursFilterNotFound /> :
        <ToursList tours={tours} />;
    
    return citiesFetching ? <Progress /> : (
        <div>
            <AuthBar />
            <ToursFilterForm 
                cities={cities} 
                formState={formState}
                onSubmit={onToursFilterFormSubmit}
            />
            <Grid 
                container 
                alignItems="center" 
                justify="center"
            >
                {toursFetching ? progressJSX : toursListJSX}
            </Grid>
        </div>
    );
};

export default Root;
