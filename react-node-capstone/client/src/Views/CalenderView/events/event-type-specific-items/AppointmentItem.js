import React from "react";
import EventLayout from "../base-layout/EventLayout";
import { post } from "../../../../api-helper/ApiHelper";
import EventLayoutButton from "../base-layout/EventLayoutButton";
import CalendarActionsContext from "../../context/CalendarActionsContext";




export default function AppointmentItem(props) {

    const calendarActionsContext = React.useContext(CalendarActionsContext);
    const [progress, setProgress] = React.useState(false);


    const deleteAppointment = () => {
        setProgress(true);
        const data = {
            eventId: props.event.id
        };

        post("/appointments/delete", data, (res) => {

            if (res.success) {
                alert("deleted");
            } else {
                console.log(res.message);
            }
            setProgress(false);
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

    buttons.push(<EventLayoutButton icon="delete" onClick={deleteAppointment}>Delete</EventLayoutButton>);
    buttons.push(<EventLayoutButton icon="edit" onClick={editAppointment}>Edit</EventLayoutButton>);

    return (<EventLayout progress={progress} {...props} buttons={buttons} />);

}
