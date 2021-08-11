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
import { firebaseConfig } from './firebase'

const App = () => {
  const dispatch = useDispatch()
  const { isFetching } = useAuth()
  
  useEffect(() => {
    (async () => {
      firebase.initializeApp(firebaseConfig)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const { currentUser } = firebase.auth();
      
      if(currentUser === null) {
        dispatch(authActions.setFetching(false));
      }

      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          dispatch(authActions.getCurrentUser())
        }
      });
    })();
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
