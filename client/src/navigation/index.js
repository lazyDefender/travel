import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Book } from './book';
import {
    RootPage,
    SignUpPage,
    LoginPage,
    HotelPage,
    ReservationPage,
    ProfilePage,
} from '../pages';

export const Routes = () => {
    return <>
        <Switch>
            <Route exact path={Book.ROOT}>
                <RootPage />
            </Route>
            <Route path={Book.SIGNUP}>
                <SignUpPage />
            </Route>
            <Route path={Book.LOGIN}>
                <LoginPage />
            </Route>
            <Route path={Book.HOTELS_$ID}>
                <HotelPage />
            </Route>
            <Route path={Book.RESERVATION}>
                <ReservationPage />
            </Route>
            <Route path={Book.PROFILE}>
                <ProfilePage />
            </Route>
        </Switch>
    </>
};
