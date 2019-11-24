import React from "react";
import EventForm from "./components/forms/event-forms/EventForm";
import AdvisingSlotForm from "./components/forms/advising-forms/AdvisingSlotForm";
import AdvisingSignUpForm from "./components/forms/advising-forms/AdvisingSignUpForm";
import ShareCalendarForm from "./components/forms/calendar-forms/ShareCalendarForm";
import CalendarActionsContext from "./context/CalendarActionsContext";
import CalendarViewLayout from "./components/main-component/CalenderViewLayout";
import AddNewCalendarForm from "./components/forms/calendar-forms/AddNewCalendarForm";
import ColorDialog from "../GenericViews/colors/ColorDialog";
import SocketContext from "../../Context/SocketContext";

export default class CalenderView extends React.Component {

    static contextType = SocketContext;

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
            colorDialog: false,
            colorData: {},
            colorScope: {}
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

    closeColorDialog = () => {
        this.closePopup("colorDialog");
    };

    closeEventForm = () => {
        this.setState({"eventForm": false, "formMode": "", "eventFormData": {}});
    };


    calendarActionsContext = () => {

        const socket = this.context.socket;

        console.log(socket);

        return {

            "showShareCalendarForm": (sharedCalendarId) => {
                this.setState({"shareCalendarForm": true, "sharedCalendarId": sharedCalendarId});
            },
            "showAddCalendarForm": () => {
                this.setState({"addCalendarForm": true});
            },
            "showAddEventForm": () => {
                this.setState({"eventForm": true, "formMode": "event"});
            },
            "showAddAppointmentForm": () => {
                this.setState({"eventForm": true, "formMode": "appointment"});
            },
            "getSocket": () => {
                return socket;
            },
            "showEditAppointmentForm": (eventData) => {
                this.setState({"eventForm": true, "formMode": "editAppointment", "eventFormData": eventData});
            },
            "showColorDialog": (colorScope) => {
                this.setState({"colorDialog": true, "colorScope": colorScope});
            },
            "showAdvisingSlotForm": () => {
                this.setState({"advisingSlotForm": true});
            },
            "showAdvisingSignUpForm": () => {
                this.setState({"advisingSignUpForm": true});
            },
        }
    };

    handleSubmit = (dialogName, data) => {
        if (dialogName === "colorDialog") {
            this.setState({colorData: data});
        }
    };

    render() {

        return (
            <CalendarActionsContext.Provider value={this.calendarActionsContext()}>
                <div>

                    <ColorDialog onSubmit={(data) => this.handleSubmit("colorDialog", data)}
                                 onClose={this.closeColorDialog} open={this.state.colorDialog}/>

                    <AdvisingSlotForm onClose={this.closeAdvisingForm} open={this.state.advisingSlotForm}/>

                    <AdvisingSignUpForm onClose={this.closeAdvisingSignUpForm} open={this.state.advisingSignUpForm}/>

                    <ShareCalendarForm sharedCalendarId={this.state.sharedCalendarId}
                                       open={this.state.shareCalendarForm}
                                       onClose={this.closeShareForm}/>

                    <AddNewCalendarForm open={this.state.addCalendarForm} onClose={this.closeAddCalendarForm}/>

                    <EventForm eventFormData={this.state.eventFormData} formMode={this.state.formMode}
                               onClose={this.closeEventForm} open={this.state.eventForm}/>

                    <CalendarViewLayout colorData={this.state.colorData} colorScope={this.state.colorScope}/>
                </div>

            </CalendarActionsContext.Provider>

        );
    }

}
