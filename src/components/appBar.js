import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        background: '#03045e'
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-center',
        height: '100%',
        marginBottom: '8px'
    },
    icon: {
        alignSelf: 'flex-center',
        marginBottom: '8px',
        marginTop: '8px'
    }
}));

export default function ProminentAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>
                <FitnessCenterIcon className={classes.icon} />
                <Typography className={classes.title} variant="h5" noWrap>
                    Cowin Dashboard
          </Typography>
            </AppBar>
        </div>
    );
}
