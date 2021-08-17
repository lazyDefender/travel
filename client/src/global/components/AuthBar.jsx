import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Box,
    Grid,
    AppBar,
    Toolbar,
    makeStyles,
} from '@material-ui/core';
import { Book } from '../../common/enums/book';
import useAuth from '../../global/hooks/useAuth';
import { authActions } from '../../redux/auth.slice';
import store from '../../redux/store';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}));

const AuthBar = (props) => {
    const classes = useStyles();
    const { user } = useAuth();

    const signOut = useCallback(() => {
        store.dispatch(authActions.signOut());
    }, []);

    const defaultBar =
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
                    <Link to={Book.ROOT}>Travel App</Link>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                    >
                        <Link to={Book.SIGNUP}>Зареєструватись</Link>
                    </Button> 
                    <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                    >
                        <Link to={Book.LOGIN}>Увійти</Link>
                    </Button>
                </Grid>
            </Grid>
        </Toolbar>    
    </AppBar>;
    const signedInBar = <>
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
                        <Link to={Book.ROOT}>Travel App</Link>
                        
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            disableElevation
                            color="primary"
                        >
                            <Link to={Book.PROFILE}>Мій профіль</Link>
                        </Button>
            
                        <Button 
                            onClick={signOut}
                            variant="contained"
                            disableElevation
                            color="primary"
                        >Вийти</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        
      </AppBar>
        
    </>

    const authBarJSX = user ? signedInBar : defaultBar;
    return <>
        <Box pt={2} pb={2}>
            {authBarJSX}
            <div className={classes.offset}/>
        </Box>
    </>;
};

export default AuthBar;