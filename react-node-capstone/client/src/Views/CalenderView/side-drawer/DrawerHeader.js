import React from 'react'
import "./DrawerHeader.css"
import Fab from "@material-ui/core/Fab"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Icon from "@material-ui/core/Icon";


const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}));

export default function DrawerHeader() {

    const classes = useStyles();

    return (
        <div className="mdl-layout-title calendar-view-drawer-header">
            <Fab
                variant="extended"
                size="medium"
                aria-label="add"
                color="primary"
                className={classes.margin}>
                <Icon className={classes.icon}>navigation</Icon>
                Create Event
            </Fab>
        </div>
    );
}
