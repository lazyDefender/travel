import React, { useState } from 'react'
import {
    CircularProgress,
    Typography,
    Tabs,
    Tab,
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import useOrdersByUser from './hooks/useOrdersByUser'
import UserForm from './components/UserForm'
import useAuth from '../../global/hooks/useAuth'
import { Redirect } from 'react-router-dom'
import { book } from '../../navigation/book'
import OrdersList from './components/OrdersList'
import AuthBar from '../../global/components/AuthBar'



const Profile = (props) => {
    const [value, setValue] = useState(0)
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    // const { isFetching } = useSelector(state => state.orders || {})
    const { user } = useAuth()
    // const orders = useOrdersByUser(id)
    // const ordersJSX = isFetching ? <CircularProgress/> : <OrdersList orders={orders}/>
    const tabsJSX = <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
    >
        <Tab value={0} label="Редагувати профіль"/>
        <Tab value={1} label="Мої замовлення"/>
    </Tabs>
    let tabContentJSX = null

    switch(value) {
        case 0:
            tabContentJSX = <UserForm {...user}/>
            break
        case 1:
            tabContentJSX = <>
                {/* {ordersJSX} */}
            </>
            break
        default:
            tabContentJSX = null
    }
    const page = <>
                    <AuthBar/>
                    {tabsJSX}
                    {tabContentJSX}
                </>
                
    return page
}

export default Profile