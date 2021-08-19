import React from 'react';
import { Redirect } from 'react-router';
import LoginComponent from '../../bus/login';
import useAuth from '../../global/hooks/useAuth';
import { Book } from '../../common/enums/book';

export const LoginPage = (props) => {
    const { user } = useAuth();
    const jsx = user ? <Redirect to={Book.ROOT} /> : <LoginComponent />
    return jsx;
};
