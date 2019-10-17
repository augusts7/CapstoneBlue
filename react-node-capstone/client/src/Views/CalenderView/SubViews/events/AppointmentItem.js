import React from "react";
import MaterialButton from "@material-ui/core/Button"
import EventLayout from "./EventLayout";
import { post } from "../../../../ApiHelper/ApiHelper";




export default function AppointmentItem(props) {

    const acceptAppointment = () => {

        const data = {
            eventId: props.event.id
        };

        post("/events/delete/main", data, (res) => {

            if (res.success) {
                alert("deleted");
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
                alert("accept");
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

        props.openPopup("editAppointment", data);

    };

    let buttons = [];


    if (props.event.created) {
        buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteAppointment}>Delete</MaterialButton></div>);
    } else {
        if (props.event.accepted) {
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteAppointment}>Delete</MaterialButton></div>);

        } else {
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteAppointment}>Delete</MaterialButton></div>);
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={acceptAppointment}>Accept</MaterialButton></div>);
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={editAppointment}>Edit</MaterialButton></div>);

        }

    }

    return (<EventLayout {...props} buttons={buttons} />);

}
