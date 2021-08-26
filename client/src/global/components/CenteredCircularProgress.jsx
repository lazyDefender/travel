import React from 'react';
import {
    Box,
    CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%)',
    },
  }));

export const CenteredCircularProgress = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <CircularProgress/>
        </Box>
    );
};
