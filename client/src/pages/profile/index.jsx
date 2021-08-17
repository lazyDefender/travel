import React from 'react';
import { Redirect } from 'react-router-dom';
import ProfileComponent from '../../bus/profile';
import useAuth from '../../global/hooks/useAuth';
import { Book } from '../../common/enums/book';

export const ProfilePage = (props) => {
    const { user, isFetching } = useAuth();
    let jsx = null;
    if(isFetching) {
        jsx = 'loading';
    }
    else {
        jsx = user ? <ProfileComponent /> : <Redirect to={Book.LOGIN} />;
    }
    
    return jsx;
};
