import React from "react";
import EventForm from "./calendar-forms/EventForm";
import AdvisingSlotForm from "./calendar-forms/advising-forms/AdvisingSlotForm";
import AdvisingSignUpForm from "./calendar-forms/advising-forms/AdvisingSignUpForm";
import ShareCalendarForm from "./calendar-forms/calendar-forms/ShareCalendarForm";
import CalendarActionsContext from "./context/CalendarActionsContext";
import CalendarViewLayout from "./CalenderViewLayout";
import AddNewCalendarForm from "./calendar-forms/calendar-forms/AddNewCalendarForm";

export default class CalenderView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventFormData: {},
            shareCalendarForm: false,
            addCalendarForm: false,
            formMode: "",
            eventForm: false,
            advisingSignUpForm: false,
            advisingSlotForm: false,
            sharedCalendarId: -1,
        };

    }


    closePopup = (popupName) => {
        this.setState({[popupName]: false})
    };

    closeAddCalendarForm = () => {
        this.closePopup("addCalendarForm");
    };

    closeAdvisingForm = () => {
        this.closePopup("advisingSlotForm");
    };

    closeAdvisingSignUpForm = () => {
        this.closePopup("advisingSignUpForm");
    };

    closeShareForm = () => {
        this.closePopup("shareCalendarForm");
    };

    closeEventForm = () => {
        this.setState({"eventForm": false, "formMode": "", "eventFormData": {}});
    };


    calendarActionsContext = {

        "showShareCalendarForm": (sharedCalendarId) => {
            this.setState({"shareCalendarForm": true, "sharedCalendarId": sharedCalendarId});
        },
        "showAddCalendarForm": () => {
            this.setState({"addCalendarForm": true});
        },
        "showAddEventForm": () => {
            this.setState({"eventForm": true});
        },
        "showAddAppointmentForm": () => {
            this.setState({"eventForm": true, "formMode": "appointment"});
        },
        "showEditAppointmentForm": (eventData) => {
            this.setState({"eventForm": true, "formMode": "editAppointment", "eventFormData": eventData});
        },
        "showAdvisingSlotForm": () => {
            this.setState({"advisingSlotForm": true});
        },
        "showAdvisingSignUpForm": () => {
            this.setState({"advisingSignUpForm": true});
        },
    };

    render() {

        return (
            <CalendarActionsContext.Provider value={this.calendarActionsContext}>
                <div>

                    <AdvisingSlotForm onClose={this.closeAdvisingForm} open={this.state.advisingSlotForm}/>

                    <AdvisingSignUpForm onClose={this.closeAdvisingSignUpForm} open={this.state.advisingSignUpForm}/>

                    <ShareCalendarForm sharedCalendarId={this.state.sharedCalendarId} open={this.state.shareCalendarForm}
                                       onClose={this.closeShareForm}/>

                    <AddNewCalendarForm open={this.state.addCalendarForm} onClose={this.closeAddCalendarForm}/>

                    <EventForm eventFormData={this.state.eventFormData} formMode={this.state.formMode}
                               onClose={this.closeEventForm} open={this.state.eventForm}/>

                    <CalendarViewLayout />
                </div>

            </CalendarActionsContext.Provider>

        );
    }

}
