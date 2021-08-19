import React from 'react';
import { Redirect } from 'react-router';
import SignUpComponent from '../../bus/signup';
import useAuth from '../../global/hooks/useAuth';
import { Book } from '../../common/enums/book';

export const SignUpPage = (props) => {
    const { user } = useAuth();
    const jsx = user ? <Redirect to={Book.ROOT} /> : <SignUpComponent />
    return jsx;
};
