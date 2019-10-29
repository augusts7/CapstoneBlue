import React from "react";
import "./EventLayout.css";

import Typography from '@material-ui/core/Typography';
import CustomMenu from "../../generic-components/Menu";
import CustomIconButton from "../../generic-components/IconButton";
import Icon from "@material-ui/core/Icon";
import Progress from "../../generic-components/Progress";
const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const timeOptions = {minute: '2-digit', hour: "2-digit"};

export default function EventLayout(props) {

    const [anchor, setAnchor] = React.useState(null);

    let data = props.event;

    const start = new Date(data.start);
    const end = new Date(data.end);

    const date = start.toLocaleDateString("en-US", dateOptions);
    const startTime = start.toLocaleTimeString("en-US", timeOptions);
    const endTime = end.toLocaleTimeString("en-US", timeOptions);
    const eventType = data.event_type.charAt(0).toUpperCase() + data.event_type.substring(1);

    const onMenuClick = (key) => {
        if (props.onMenuClick) {
            props.onMenuClick(key);
        }
    };

    const onMenuClose = () => {
        setAnchor(null);
    };

    const onMenuButtonClick = (event) => {
        setAnchor(event.currentTarget);
    };

    let menuOptions = [
        {"name": "Delete Appointment", "key": "delete"},
        {"name": "Share Appointment", "key": "share"},
        {"name": "Edit Appointment", "key": "edit"},
    ];

    if (props.menuOptions) {
        menuOptions = props.menuOptions;
    }

    return (
        <div className="event-layout-root">
            <Progress show={props.progress} />
            <Typography className="event-layout-header flex" color="white" gutterBottom>
                <div className="flex flex-main">
                    <div className="flex-main">{date}</div>
                    <div className="flex-sub flex"><div className="start-time">{startTime}</div><div className="end-time">{endTime}</div></div>
                </div>
                <div className="flex-sub">
                    <CustomIconButton onClick={onMenuButtonClick} onClose={onMenuClose}><Icon>more_vert</Icon></CustomIconButton>
                </div>

            </Typography>
            <CustomMenu fullWidth={true} anchor={anchor} menuOptions={menuOptions} onClick={onMenuClick} onClose={onMenuClose} />
            <div className="event-layout-contents">
                <div className="flex">
                    <Typography className="flex-main" variant="subtitle2">
                        {data.title}
                    </Typography>
                    <Typography className="flex-sub" color="textSecondary">
                        {eventType}
                    </Typography>
                </div>

                <Typography variant="body2">
                    {data.description}
                </Typography>
            </div>
            <div className="event-buttons">
                {props.buttons}
            </div>
        </div>
    );
};

