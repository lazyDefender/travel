import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Box,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    makeStyles,
    Container,
} from '@material-ui/core'
import { book } from '../../navigation/book'
import useAuth from '../../global/hooks/useAuth'
import { authActions } from '../../redux/auth/actions'

const signOut = () => {
    // store.dispatch(authActions.signOut())
}

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const GoHomeBar = (props) => {
    const classes = useStyles()
    const auth = useAuth()
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
                        <Link to="/">На головну</Link>
                    </Grid>
                </Grid>
            </Toolbar>
        
      </AppBar>
   

    const loadingJSX = 'loing auth...'
    const { data, isFetching } = auth
    const authBarContent = isFetching ? loadingJSX : barJSX 
    return <>
    {/* <Container> */}
        <Box pt={2} pb={2}>
            {authBarContent}
            <div className={classes.offset}/>
        </Box>
    {/* </Container> */}
    </>
}

export default GoHomeBar