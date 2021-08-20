import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authActions } from '../../redux/auth.slice';
import { AuthProviders } from '../../common/enums/authProviders';
import { Book } from '../../common/enums/book';
import { LoginForm } from './components';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signInWithGoogle = useCallback(() => {
        dispatch(authActions.signInWithProvider(AuthProviders.GOOGLE));
    }, [dispatch]);
      
    const signInWithFacebook = useCallback(() => {
        dispatch(authActions.signInWithProvider(AuthProviders.FACEBOOK));
    }, [dispatch]);
    
    const onSignup = useCallback(() => {
        history.replace(Book.SIGNUP);
    }, [history]);
    
    const onSubmit = (values, { setSubmitting }) => {
        dispatch(authActions.signIn(values));
    };

    return <LoginForm
        onSignInWithGoogle={signInWithGoogle}
        onSignInWithFacebook={signInWithFacebook}
        onSignup={onSignup}
        onSubmit={onSubmit}
    />;
};

export default Login;
