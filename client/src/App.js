import React, { useEffect, useCallback } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

import theme from './theme';
import { Routes } from './navigation';
import { history } from './navigation/history';
import { authActions } from './redux/auth.slice';
import useAuth from './global/hooks/useAuth';
import Progress from './global/components/Progress';
import { firebaseConfig } from './firebase';
import Snackbar from './global/components/Snackbar';
import useSnackbar from './global/hooks/useSnackbar';
import store from './redux/store';
import { snackbarActions } from './redux/snackbar.slice';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { isFetching } = useAuth();
  const snackbar = useSnackbar();
  
  const resetSnackbar = useCallback(() => {
    store.dispatch(snackbarActions.reset());
  }, []);

  useEffect(() => {
    (async () => {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          dispatch(authActions.getCurrentUser());
        }
        else {
          dispatch(authActions.setFetching(false));
        }
      });
    })();
  }, [dispatch]);

  const appJSX = <Routes />;
  
  return (
    <ThemeProvider theme={theme}>
        <Router 
          history={history}
        >
          <CssBaseline/>
          <Container>
            {isFetching ? <Progress /> : appJSX}
            {snackbar.message && <Snackbar 
                message={snackbar.message} 
                severity={snackbar.severity} 
                open={snackbar.open}
                onClose={resetSnackbar} 
              />
            }
          </Container>
        </Router>
    </ThemeProvider>
  );
};

export default App;
