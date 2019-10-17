import React from "react";
import MaterialButton from "@material-ui/core/Button"
import EventItem from "./EventItem"
import AppointmentItem from "./AppointmentItem"
import AdvisingItem from "./AdvisingItem";


export default function Event(props) {

    if (props.event.eventType == "appointment") {

        return (<AppointmentItem {...props} />);

    } else if (props.event.eventType == "advising") {

        return (<AdvisingItem {...props} />);

    }

    return (<EventItem {...props} />);
}

