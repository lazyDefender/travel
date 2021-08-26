import React, { useState } from 'react';
import {
    Tabs,
    Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import useOrdersByUser from './hooks/useOrdersByUser';
import useAuth from '../../global/hooks/useAuth';
import { 
    OrdersList,
    UserForm,
} from './components';
import { AuthBar } from '../../global/components';
import store from '../../redux/store';
import { authActions } from '../../redux/auth.slice';
import { CenteredCircularProgress } from '../../global/components';

const useStyles = makeStyles(theme => ({
    tabs: {
        marginBottom: '30px',
    }
}));

const Profile = (props) => {
    const classes = useStyles();

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

    const ordersJSX = isFetching ? 
        <CenteredCircularProgress /> : 
        <OrdersList orders={orders}/>;

    const tabsJSX = <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
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
