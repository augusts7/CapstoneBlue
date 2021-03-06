import React from "react";
import EventLayout from "../base-layout/EventLayout";
import { post } from "../../../../../../ApiHelper/ApiHelper";
import EventLayoutButton from "../base-layout/EventLayoutButton";
import CalendarActionsContext from "../../../../context/CalendarActionsContext";
import CalendarEventsListContext from "../../calendar-popup-context/CalendarEventsListContext";


export default function AppointmentItem(props) {

    const calendarActionsContext = React.useContext(CalendarActionsContext);
    const [progress, setProgress] = React.useState(false);
    const calendarPopupContext = React.useContext(CalendarEventsListContext);


    const onDeleteButtonClick = () => {
        calendarPopupContext.showDeleteDialog("Delete Appointment", "Are you sure you want to delete your appointment?", deleteAppointment);
    };

    const deleteAppointment = (callback) => {
        setProgress(true);
        const data = {
            eventId: props.event.id
        };

        post("/appointments/delete", data, (res) => {

            if (res.success) {

            } else {
                console.log(res.message);
            }
            setProgress(false);
            callback({...props.event});
        });
    };

    const editAppointment = () => {

        const data = {
            "eventId": props.event.id,
            "event": props.event 
        };
        calendarActionsContext.showEditAppointmentForm(data);
    };

    let buttons = [];

    buttons.push(<EventLayoutButton icon="delete" onClick={onDeleteButtonClick}>Delete</EventLayoutButton>);
    buttons.push(<EventLayoutButton icon="edit" onClick={editAppointment}>Edit</EventLayoutButton>);

    return (<EventLayout progress={progress} {...props} buttons={buttons} />);

}
