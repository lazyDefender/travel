import React from 'react'
import { Redirect } from 'react-router-dom'
import ProfileComponent from '../../bus/profile'
import useAuth from '../../global/hooks/useAuth'
import { book } from '../../navigation/book'
import useFirstLoadedPage from '../../global/hooks/useFirstLoadedPage'

const Profile = (props) => {
    const { user, isFetching } = useAuth()
    // const firstLoadedPage = useFirstLoadedPage()
    let jsx = null;
    if(isFetching) {
        jsx = 'loading';
    }
    else {
        jsx = user ? <ProfileComponent /> : <Redirect to={book.login} /> ;
    }
    
    return <>
        {jsx}
    </>
}

export default Profile
