import React from "react";
import CalendarActionsContext from "./context/CalendarActionsContext";
import HomeCalendarViewLayout from "./components/main-component/HomeCalenderViewLayout";
import SocketContext from "../../Context/SocketContext";

export default class HomeCalenderView extends React.Component {

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
                    <HomeCalendarViewLayout colorData={this.state.colorData} colorScope={this.state.colorScope}/>
                </div>
            </CalendarActionsContext.Provider>
        );
    }

}
