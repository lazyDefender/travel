import React from 'react';
import { useLocation } from 'react-router-dom';

import { ReservationForm } from './components';
import { AuthBar } from '../../global/components';
import useTour from './hooks/useTour';
import useAuth from '../../global/hooks/useAuth';
import { reservationActions } from '../../redux/reservation.slice';
import { useDispatch } from 'react-redux';
import { history } from '../../navigation/history';

const Reservation = (props) => {
    const dispatch = useDispatch();

    const query = new URLSearchParams(useLocation().search);
    const tourId = query.get('tourId');
    const { data: tour, isFetching } = useTour(tourId);
    const { user } = useAuth();

    const createReservation = (values) => {
        dispatch(reservationActions.createOrder({
            ...values,
            tourId: tour.id,
            userId: user.id,
        }));
    
        history.back();
    }

    return (
        <div>
            <AuthBar />
            <ReservationForm 
                tour={tour} 
                onSubmit={createReservation}
                isFetching={isFetching}
            />
        </div>
    );
};

export default Reservation;
