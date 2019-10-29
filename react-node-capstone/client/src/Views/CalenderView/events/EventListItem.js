import React from "react";
import EventItem from "./event-type-specific-items/EventItem"
import AppointmentItem from "./event-type-specific-items/AppointmentItem"
import AdvisingItem from "./event-type-specific-items/AdvisingItem";


export default function Event(props) {

    const eventType = "" + props.event.event_type;

    if (eventType === "appointment") {

        return (<AppointmentItem {...props} />);

    } else if (eventType === "advising") {

        return (<AdvisingItem {...props} />);

    }

    return (<EventItem {...props} />);
}

