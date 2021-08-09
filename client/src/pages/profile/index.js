import React from 'react'
import { Redirect } from 'react-router-dom'
import ProfileComponent from '../../bus/profile'
import useAuth from '../../global/hooks/useAuth'
import { book } from '../../navigation/book'
import useFirstLoadedPage from '../../global/hooks/useFirstLoadedPage'

const Profile = (props) => {
    const { user, isFetching } = useAuth()
    // const firstLoadedPage = useFirstLoadedPage()
    const loaderJSX = isFetching ? 'loading' : null
    const contentJSX = user && !isFetching ? <ProfileComponent/> : <Redirect to={book.login} /> 
    const jsx = loaderJSX || contentJSX
    return <>
        {jsx}
    </>
}

export default Profile
