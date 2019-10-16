import React from "react";
import MaterialButton from "@material-ui/core/Button"
import EventLayout from "./EventLayout";
import Button from "../../../../components/Button/Button";


const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { minute: '2-digit', hour: "2-digit" }


export default function AppointmentItem(props) {


    const addSlot = () => {
        alert("add slot");

    };

    const deleteSlot = () => {
        alert("delete slot");
    };


    let buttons = [];


    if (props.event.created) {
        buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "4px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteSlot}>Delete</MaterialButton></div>);
    } else {
        if (props.event.accepted) {
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "4px", "backgroundColor": "#455A64", "color": "white" }} onClick={deleteSlot}>Delete</MaterialButton></div>);
        } else {
            buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "4px", "backgroundColor": "#455A64", "color": "white" }} onClick={addSlot}>Add to Calendar</MaterialButton></div>);
        }

    }

    return (<EventLayout {...props} buttons={buttons} />);

}
