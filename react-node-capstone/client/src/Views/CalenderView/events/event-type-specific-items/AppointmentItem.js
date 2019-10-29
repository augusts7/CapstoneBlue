import React from "react";
import MaterialButton from "@material-ui/core/Button"
import EventLayout from "../base-layout/EventLayout";
import { post } from "../../../../ApiHelper/ApiHelper";
import EventLayoutButton from "../base-layout/EventLayoutButton";
import CalendarActionsContext from "../../context/CalendarActionsContext";




export default function AppointmentItem(props) {

    const calendarActionsContext = React.useContext(CalendarActionsContext);

    const acceptAppointment = () => {

        const data = {
            eventId: props.event.id
        };

        post("/appointments/attend/main", data, (res) => {

            if (res.success) {
                alert("attended");
            } else {
                console.log(res.message);
            }
        });

    };

    const deleteAppointment = () => {

        const data = {
            eventId: props.event.id
        };

        post("/appointments/delete", data, (res) => {

            if (res.success) {
                alert("deleted");
            } else {
                console.log(res.message);
            }
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


    if (props.event.created) {
        buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteAppointment}>Delete</MaterialButton></div>);
    } else {
        if (props.event.accepted) {
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteAppointment}>Delete</MaterialButton></div>);

        } else {
            buttons.push(<EventLayoutButton icon="delete" onClick={deleteAppointment}>Delete</EventLayoutButton>);
            buttons.push(<EventLayoutButton icon="done" onClick={acceptAppointment}>Accept</EventLayoutButton>);
            buttons.push(<EventLayoutButton icon="edit" onClick={editAppointment}>Edit</EventLayoutButton>);
        }

    }

    return (<EventLayout {...props} buttons={buttons} />);

}
