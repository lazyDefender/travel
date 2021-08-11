import React from 'react';
import { Redirect } from 'react-router';
import LoginComponent from '../../bus/root/components/LoginForm';
import useAuth from '../../global/hooks/useAuth';
import { book } from '../../navigation/book';

const Login = (props) => {
    const { user } = useAuth();
    const jsx = user ? <Redirect to={book.root} /> : <LoginComponent />
    return jsx;
};

export default Login;
