import React from "react";
import MaterialButton from "@material-ui/core/Button"
import EventLayout from "../base-layout/EventLayout"



export default function Event(props) {

    let buttons = [];

    buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={props.onAddToCalendar}>Delete</MaterialButton></div>);

    if (props.event.created) {
        buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={props.onAddToCalendar}>Modify</MaterialButton></div>);
    }

    return (<EventLayout {...props} buttons={buttons} />);

}

