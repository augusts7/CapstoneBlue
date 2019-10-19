

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import "./DrawerHeader.css";
import NotificationsPopup from "./NotificationsPopup";

const useStyles = makeStyles({
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
});

export default function DrawerHeader() {

    const [showPopup, setShowPopup] = React.useState(false);

    const classes = useStyles();


    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleAvatarClick = () => {
        setShowPopup(true);
    };

    return (
        <div className="mdl-layout-title calendar-view-drawer-header">
            <NotificationsPopup open={showPopup} onClose={handlePopupClose} />
            <div className="mainItem">

            </div>
            <div className="secondaryItem">
                <Avatar onClick={handleAvatarClick} className={classes.orangeAvatar}><i className="material-icons">notifications</i></Avatar>
            </div>
        </div>
    );
}
