import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import "./notifications.css"
import NotificationsPopup from "./NotificationsPopup";
import Badge from "@material-ui/core/Badge";
import CustomIconButton from "../../../Views/CalenderView/generic-components/IconButton";

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
    const [anchor, setAnchor] = React.useState(null);
    const classes = useStyles();


    const handlePopupClose = () => {
        setShowPopup(false);
        setAnchor(null);
    };

    const handleAvatarClick = (event) => {
        setShowPopup(true);
        setAnchor(event.currentTarget);
    };

    const calendarOptions = [{name: "Cal1", value: "vcal1"}];

    return (

        <div className="mdl-layout-title">
            <NotificationsPopup anchor={anchor} onClose={handlePopupClose}/>
            <div className="secondaryItem">
                <CustomIconButton onClick={handleAvatarClick} aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="primary">
                        <i className="material-icons">notifications</i>
                    </Badge>
                </CustomIconButton>

            </div>
        </div>
    );
}
