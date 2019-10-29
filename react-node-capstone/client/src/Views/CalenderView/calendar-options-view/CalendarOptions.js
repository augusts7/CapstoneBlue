import React from "react";
import SharedCalendars from "./calendar-options-components/shared-cals/SharedCalendars";
import CalendarOptions from "./calendar-options-components/cals/CalendarOptions";

import "./calendar-options-styles/optionItemStyles.css";
import Actions from "./calendar-options-components/actions/Actions";


export default class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "eventTypes": { "advisingSlots": false, "attendingEvents": true, "createdEvents": false, "requestedAppointments": false, "approvedAppointments": false },
        };


    }



    render() {

        return (
            <div className="styleScroll">

                <Actions />

                <CalendarOptions onChangeCalendarData={this.props.onChangeCalendarData} />

                <SharedCalendars onChangeCalendarData={this.props.onChangeCalendarData} />

            </div>

        );
    }

}
