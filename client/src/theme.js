import { createMuiTheme } from '@material-ui/core';
import {
    cyan,
} from '@material-ui/core/colors';
import { ukUA } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[500],
        },
    },
}, ukUA);

export default theme;
