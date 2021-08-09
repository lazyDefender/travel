import React, { useEffect } from 'react'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import './App.css'

import theme from './theme'
import { Routes } from './navigation'
import { history } from './navigation/history'
import { authActions } from './redux/auth.slice'
import useAuth from './global/hooks/useAuth'
import Progress from './global/components/Progress'

const App = () => {
  const dispatch = useDispatch()
  const { isFetching } = useAuth()
  
  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const bearerToken = `Bearer ${token}`
        dispatch(authActions.getCurrentUser(bearerToken))
      }
      
    });
  }, [dispatch])

  const appJSX = <Routes />
  
  return (
    <ThemeProvider theme={theme}>
        <Router 
          history={history}
        >
          <CssBaseline/>
          <Container>
            {isFetching ? <Progress /> : appJSX}
          </Container>
        </Router>
    </ThemeProvider>
  )
}

export default App
