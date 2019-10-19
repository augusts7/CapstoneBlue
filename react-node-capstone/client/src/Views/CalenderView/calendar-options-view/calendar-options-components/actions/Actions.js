import React from "react";
import EventForm from "../../../calendar-forms/EventForm";
import AdvisingSlotForm from "../../../calendar-forms/advising-forms/AdvisingSlotForm";
import ActionLayout from "./ActionLayout";
import AdvisingSignUpForm from "../../../calendar-forms/advising-forms/AdvisingSignUpForm";
import ShareCalendarForm from "../../../calendar-forms/calendar-forms/ShareCalendarForm";
import AppointmentsList from "../../../events-list/AppointmentsList";


export default class Actions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "eventTypes": {
                "advisingSlots": false,
                "attendingEvents": true,
                "createdEvents": false,
                "requestedAppointments": false,
                "approvedAppointments": false
            },
            "eventFormData": {},
            "shareCalendarForm": false,
            "appointmentsList": false
        };

        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    openPopup(name, data) {

        if (name === "eventForm") {

            let mode = "";

            if (!data || !data.mode) {
                mode = "event";
            } else {
                mode = data.mode;
            }

            this.setState({"eventForm": true, "formMode": mode, "eventFormData": data});

        } else if (name === "advisingSlotForm") {

            this.setState({"advisingSlotForm": true});

        } else if (name === "advisingSignUpForm") {

            this.setState({"advisingSignUpForm": true});

        } else if (name === "shareCalendarForm") {

            this.setState({"shareCalendarForm": true});

        } else if (name === "appointmentsList") {

            this.setState({"appointmentsList": true});
        }
    }


    handlePopupClose(popupName) {

        this.setState({[popupName]: false})
    }

    handleAddEvent(mode) {
        if (mode === "advisingSlot") {
            this.props.openPopup("advisingSlotForm");
        } else {
            this.props.openPopup("eventForm", {"mode": mode});
        }
    }

    handleAction(id, data) {

        const action = "" + id;

        if (action === "addAppointment") {

            this.openPopup("eventForm", {"mode": "appointment"});

        } else if (action === "shareCalendar") {

            this.openPopup("shareCalendarForm", {});

        } else if (action === "modifyAppointment") {

            this.openPopup("appointmentsList", {});

        } else if (action === "exportCalendar") {


        } else if (action === "addAdvising") {

            this.openPopup("advisingSlotForm", {});

        } else if (action === "selectAdvising") {

            this.openPopup("advisingSignUpForm", {});

        } else if (action === "editAppointment") {
            data.mode = "editAppointment";
            this.openPopup("eventForm", data);

        } else {

        }
    }

    closeAdvisingForm = () => {
        this.handlePopupClose("advisingSlotForm");
    };

    closeAdvisingSignUpForm = () => {
        this.handlePopupClose("advisingSignUpForm");
    };

    closeShareForm = () => {
        this.handlePopupClose("shareCalendarForm");
    };

    closeEventForm = () => {
        this.handlePopupClose("eventForm");
    };

    closeAppointmentsList = () => {
        this.handlePopupClose("appointmentsList");
    };

    render() {

        return (
            <div className="calendarView_side_card">

                <AppointmentsList handleAction={this.handleAction} open={this.state.appointmentsList} onClose={this.closeAppointmentsList}/>

                <AdvisingSlotForm onClose={this.closeAdvisingForm} open={this.state.advisingSlotForm}/>

                <AdvisingSignUpForm onClose={this.closeAdvisingSignUpForm} open={this.state.advisingSignUpForm}/>

                <ShareCalendarForm showCalendarOptions={true} open={this.state.shareCalendarForm}
                                   onClose={this.closeShareForm}/>

                <EventForm eventFormData={this.state.eventFormData} formMode={this.state.formMode}
                           onClose={this.closeEventForm} open={this.state.eventForm}/>

                <ActionLayout handleAction={this.handleAction}/>

            </div>

        );
    }

}
