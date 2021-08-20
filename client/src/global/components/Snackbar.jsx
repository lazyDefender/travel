import React, { useEffect, useState } from 'react';
import { 
    Snackbar as MuiSnackbar,
} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";

export const Snackbar = (props) => {
    const {
        severity,
        open,
        message,
        onClose,
    } = props;

    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setIsOpen(false);
        onClose();
    };

    return (
        <MuiSnackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            autoHideDuration={3000}
            open={isOpen}
            onClose={handleClose}
        >
            <Alert
                elevation={6}
                variant="filled"
                severity={severity}
            >
                {message}
            </Alert>
      </MuiSnackbar>
    );
};
