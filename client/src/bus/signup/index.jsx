import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authActions } from '../../redux/auth.slice';
import { AuthProviders } from '../../common/enums/authProviders';
import { Book } from '../../common/enums/book';
import { SignUpForm } from './components';

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signInWithGoogle = useCallback(() => {
        dispatch(authActions.signInWithProvider(AuthProviders.GOOGLE));
    }, [dispatch]);
      
    const signInWithFacebook = useCallback(() => {
        dispatch(authActions.signInWithProvider(AuthProviders.FACEBOOK));
    }, [dispatch]);
    
    const onLogin = useCallback(() => {
        history.replace(Book.LOGIN);
    }, [history]);
    
    const onSubmit = (values, { setSubmitting }) => {
        dispatch(authActions.signUp(values));
    };

    return <SignUpForm
        onSignInWithGoogle={signInWithGoogle}
        onSignInWithFacebook={signInWithFacebook}
        onLogin={onLogin}
        onSubmit={onSubmit}
    />;
};

export default SignUp;
