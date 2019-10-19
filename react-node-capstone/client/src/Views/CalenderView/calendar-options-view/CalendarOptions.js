import React from "react";
import SharedCalendars from "./calendar-options-components/shared-cals/SharedCalendars";
import CalendarOptions from "./calendar-options-components/cals/CalendarOptions";
import EventForm from "../calendar-forms/EventForm";
import AdvisingSlotForm from "../calendar-forms/advising-forms/AdvisingSlotForm";

import "./calendar-options-styles/optionItemStyles.css";
import Actions from "./calendar-options-components/actions/Actions";


export default class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "eventTypes": { "advisingSlots": false, "attendingEvents": true, "createdEvents": false, "requestedAppointments": false, "approvedAppointments": false },
            "formMode": "",
            "eventFormData": {}
        };

        this.handleAddEvent = this.handleAddEvent.bind(this);
    }


    openPopup(name, data) {

        if (name === "eventForm") {

            let mode = "";

            if (!data || !data.mode) {
                mode = "event";
            } else {
                mode = data.mode;
            }

            this.setState({ "eventForm": true, "formMode": mode });

        }  else if (name === "advisingSlotForm") {

            this.setState({ "advisingSlotForm": true });
        } 
    }


    handlePopupClose(popupName) {

        this.setState({ [popupName]: false })
    }

    handleAddEvent(mode) {
        if (mode === "advisingSlot") {
            this.openPopup("advisingSlotForm");
        } else {
            this.openPopup("eventForm", { "mode": mode });
        }
    }

    render() {

        return (
            <div>

                <AdvisingSlotForm onCancel={() => this.handlePopupClose("advisingSlotForm")} onClose={() => this.handlePopupClose("advisingSlotForm")} open={this.state.advisingSlotForm} />

                <EventForm eventFormData={this.state.eventFormData} formMode={this.state.formMode} onCancel={() => this.handlePopupClose("eventForm")} onClose={() => this.handlePopupClose("eventForm")} open={this.state.eventForm} />

                <div className="styleScroll">

                    <Actions />

                    <CalendarOptions onChangeCalendarData={this.props.onChangeCalendarData} />

                    <SharedCalendars onChangeCalendarData={this.props.onChangeCalendarData} />

                </div>
            </div>

        );
    }

}
