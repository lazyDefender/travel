import React from 'react';
import { Redirect } from 'react-router';
import SignUpComponent from '../../bus/root/components/SignUpForm';
import useAuth from '../../global/hooks/useAuth';
import { Book } from '../../navigation/book';

export const SignUpPage = (props) => {
    const { user } = useAuth();
    const jsx = user ? <Redirect to={Book.ROOT} /> : <SignUpComponent />
    return jsx;
};
