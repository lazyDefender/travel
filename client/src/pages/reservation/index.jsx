import React from 'react';
import { Redirect } from 'react-router-dom';
import ReservationComponent from '../../bus/reservation';
import useAuth from '../../global/hooks/useAuth';
import { Book } from '../../common/enums/book';

export const ReservationPage = (props) => {
    const { user, isFetching} = useAuth();
    const loaderJSX = isFetching ? 'loading' : null;
    const contentJSX = user && !isFetching ? <ReservationComponent/> : <Redirect to={Book.LOGIN} />;
    const jsx = loaderJSX || contentJSX;
    return jsx;
}
