import React from 'react';
import { 
    Box,
    Button as MuiButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    button: {
        width: '100%',
    }
}));

function Button({
    color,
    onClick,
    text,
}) {
    const classes = useStyles();

    return (
        <Box marginBottom={1}>
            <MuiButton className={classes.button}
                variant="contained"
                color={color}
                onClick={onClick}
                disableElevation
            >
              {text}
            </MuiButton>
        </Box>
    );
};

export default Button;
