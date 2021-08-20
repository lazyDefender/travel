import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Grid,
    AppBar,
    Toolbar,
    makeStyles,
} from '@material-ui/core';
import { Book } from '../../common/enums/book';
import useAuth from '../../global/hooks/useAuth';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}));

export const GoHomeBar = (props) => {
    const classes = useStyles();
    const auth = useAuth();
    const barJSX =
    <AppBar
        position="fixed"
        elevation={0}
      >
        <Toolbar>  
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                
                    <Grid item>
                        <Link to={Book.ROOT}>На головну</Link>
                    </Grid>
                </Grid>
            </Toolbar>
        
    </AppBar>;
   

    const loadingJSX = 'loing auth...';
    const { isFetching } = auth;
    const authBarContent = isFetching ? loadingJSX : barJSX; 
    return <>
        <Box pt={2} pb={2}>
            {authBarContent}
            <div className={classes.offset}/>
        </Box>
    </>;
}
