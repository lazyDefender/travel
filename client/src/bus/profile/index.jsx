import React, { useState } from 'react';
import {
    CircularProgress,
    Tabs,
    Tab,
} from '@material-ui/core';

import useOrdersByUser from './hooks/useOrdersByUser';
import UserForm from './components/UserForm';
import useAuth from '../../global/hooks/useAuth';
import OrdersList from './components/OrdersList';
import AuthBar from '../../global/components/AuthBar';
import store from '../../redux/store';
import { authActions } from '../../redux/auth.slice';

const Profile = (props) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e, newValue) => {
        setTabIndex(newValue);
    };

    const updateUser = (data) => {
        const updatedUser = {
            id: user.id,
            ...data,
        };
        store.dispatch(authActions.updateUser(updatedUser));
    }

    const { user } = useAuth();
    const { data: orders, isFetching } = useOrdersByUser(user.id);
    const ordersJSX = isFetching ? <CircularProgress/> : <OrdersList orders={orders}/>;

    const tabsJSX = <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
    >
        <Tab value={0} label="Редагувати профіль"/>
        <Tab value={1} label="Мої замовлення"/>
    </Tabs>;

    let tabContentJSX = null;

    switch(tabIndex) {
        case 0:
            tabContentJSX = <UserForm 
                {...user}
                onUpdateUser={updateUser}
            />;
            break;
        case 1:
            tabContentJSX = <>
                {ordersJSX}
            </>;
            break;
        default:
            tabContentJSX = null;
    }
    const page = <>
        <AuthBar/>
        {tabsJSX}
        {tabContentJSX}
    </>;
                
    return page;
}

export default Profile;
