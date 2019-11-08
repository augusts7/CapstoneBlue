import React from "react";
import SharedCalendars from "./sub-components/calendars/shared-calendars/SharedCalendars";
import CalendarOptions from "./sub-components/calendars/users-calendars/UsersCalendars";
import Actions from "./sub-components/actions/Actions";
import GroupCalendars from "./sub-components/calendars/group-calendars/GroupCalendars";

import "./CalendarOptions.css";
import HeaderView from "./sub-components/header-view/HeaderView";
import CalendarActionsContext from "../context/CalendarActionsContext";

const commonData = {
    containerStyle: {maxHeight: 0.9 * window.innerHeight, overflowY: "scroll"},
};

export default class Filters extends React.Component {

    static contextType = CalendarActionsContext;

    constructor(props) {
        super(props);

        this.state = {
            "eventTypes": { "advisingSlots": false, "attendingEvents": true, "createdEvents": false, "requestedAppointments": false, "approvedAppointments": false },
        };
    }

    render() {


        return (
            <div className="CalendarViewOptions styleScroll" style={commonData.containerStyle}>

                <HeaderView/>

                <Actions />

                <CalendarOptions context={this.context} onChangeCalendarData={this.props.onChangeCalendarData} />

                <SharedCalendars context={this.context} onChangeCalendarData={this.props.onChangeCalendarData} />

                <GroupCalendars context={this.context} onChangeCalendarData={this.props.onChangeCalendarData} />

            </div>

        );
    }

}
