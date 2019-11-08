import React from 'react';
import "../notifications.css"
import EventLayoutButton from "../../../../Views/CalenderView/events/base-layout/EventLayoutButton";
import {post} from "../../../../api-helper/ApiHelper";
import EventLayout from "../../../../Views/CalenderView/events/base-layout/EventLayout";

export default function NotificationsPopupItem(props) {

    const [progress, setProgress] = React.useState(false);

    if (props.event == null) {
        return (<div />);
    }

    const onMenuClick = (key) => {
        handleAction(key);
    };

    const handleAction = (key) => {
        key = "" + key;
        if (key === "delete") {
            handleDeleteAppointmentRequest();
        } else if (key === "accept") {
            handleAcceptAppointment();
        }
    };

    const handleAcceptAppointment = () => {
        setProgress(true);
        post("/appointments/attend/", {"eventId": props.event.eventID}, (res) => {
            setProgress(false);
            props.onRemoveItem(props.event.eventID);
        });
    };

    const handleDeleteAppointmentRequest = () => {
        setProgress(true);
        post("/appointments/delete/", {"eventId": props.event.eventID}, (res) => {
            setProgress(false);
            props.onRemoveItem(props.event.eventID);
        });
    };

    const menuOptions = [
        {"name": "Accept Invite", "key": "accept"},
        {"name": "Delete Invite", "key": "delete"},
    ];

    const buttons = [];

    buttons.push(<EventLayoutButton onClick={handleAcceptAppointment} icon="done">Accept Invite</EventLayoutButton>);
    buttons.push(<EventLayoutButton onClick={handleDeleteAppointmentRequest} icon="delete">Delete</EventLayoutButton>);
    return (
        <EventLayout progress={progress} buttons={buttons} menuOptions={menuOptions} onMenuClick={onMenuClick} event={props.event}/>
    );
}
